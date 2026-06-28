/**
 * Prerender SPA routes to static HTML after `vite build`.
 * Helps crawlers index inner pages with real titles, meta tags, and body content.
 */
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import net from 'node:net'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { PRERENDER_ROUTES } from './prerender-routes.mjs'
import {
  assertSingleSeoTags,
  canonicalForRoute,
  postprocessPrerenderHtml,
} from './prerender-html-postprocess.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const dist = path.join(root, 'dist')

function ensureDist() {
  if (!existsSync(dist)) {
    throw new Error('dist/ missing — run vite build first')
  }
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.unref()
    server.on('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      const port = typeof address === 'object' && address ? address.port : 0
      server.close((err) => (err ? reject(err) : resolve(port)))
    })
  })
}

async function ensureChromium() {
  try {
    const exe = chromium.executablePath()
    if (existsSync(exe)) return
  } catch {
    /* install below */
  }
  console.log('prerender: installing Chromium for Playwright…')
  await new Promise((resolve, reject) => {
    const proc = spawn('npx', ['playwright', 'install', 'chromium'], {
      cwd: root,
      stdio: 'inherit',
    })
    proc.on('exit', (code) => (code === 0 ? resolve() : reject(new Error('playwright install failed'))))
  })
}

function startPreview(port) {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      process.platform === 'win32' ? 'npx.cmd' : 'npx',
      ['vite', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
      {
        cwd: root,
        stdio: ['ignore', 'pipe', 'pipe'],
        env: { ...process.env, NODE_ENV: 'production' },
      },
    )

    let settled = false
    const onReady = (chunk) => {
      const text = String(chunk)
      if (text.includes(String(port)) || text.includes('Local:')) {
        if (!settled) {
          settled = true
          resolve(proc)
        }
      }
    }

    proc.stdout?.on('data', onReady)
    proc.stderr?.on('data', onReady)
    proc.on('error', reject)
    proc.on('exit', (code) => {
      if (!settled) reject(new Error(`vite preview exited with code ${code}`))
    })

    setTimeout(() => {
      if (!settled) {
        settled = true
        resolve(proc)
      }
    }, 10000)
  })
}

function stopPreview(proc) {
  if (!proc || proc.killed) return
  proc.stdout?.destroy()
  proc.stderr?.destroy()
  proc.kill('SIGTERM')
}

async function stopPreviewAsync(proc) {
  if (!proc || proc.killed) return
  stopPreview(proc)
  await new Promise((resolve) => setTimeout(resolve, 750))
  if (!proc.killed) {
    proc.kill('SIGKILL')
  }
}

function outFileForRoute(routePath) {
  if (routePath === '/') return path.join(dist, 'index.html')
  const clean = routePath.replace(/^\//, '').replace(/\/$/, '')
  return path.join(dist, clean, 'index.html')
}

function canonicalMatches(routePath, href) {
  return href === canonicalForRoute(routePath)
}

async function assertPreviewSite(baseUrl) {
  const res = await fetch(`${baseUrl}/`)
  if (!res.ok) throw new Error(`preview server returned ${res.status}`)
  const html = await res.text()
  if (!html.includes('id="root"') && !html.includes('/assets/index-')) {
    throw new Error('preview server is not serving The Witch build')
  }
}

async function waitForRoute(page, route) {
  const timeout = route.path === '/' ? 60000 : 45000

  await page.waitForFunction(
    ({ expectedTitle }) => {
      if (!document.title.includes(expectedTitle)) return false
      const main = document.querySelector('main#main-content')
      if (!main) return false
      if (main.querySelector('[aria-busy="true"]')) return false
      const text = (main.textContent || '').replace(/\s+/g, ' ').trim()
      return text.length >= 80
    },
    { expectedTitle: route.titleIncludes },
    { timeout },
  )
}

async function prerenderRoute(page, baseUrl, route) {
  const url = route.path === '/' ? `${baseUrl}/` : `${baseUrl}${route.path}`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 })
  await waitForRoute(page, route)

  let html = await page.content()
  if (!html.includes('The Witch') && !html.includes('thewitch.co.il')) {
    throw new Error('rendered HTML does not look like The Witch')
  }

  html = postprocessPrerenderHtml(html, route)
  assertSingleSeoTags(html)
  if (!canonicalMatches(route.path, html.match(/rel="canonical" href="([^"]+)"/)?.[1])) {
    throw new Error('canonical URL mismatch after postprocess')
  }

  const outFile = outFileForRoute(route.path)
  await mkdir(path.dirname(outFile), { recursive: true })
  await writeFile(outFile, html, 'utf8')
  console.log(`prerender OK: ${route.path} → ${path.relative(root, outFile)}`)
}

async function main() {
  ensureDist()
  await ensureChromium()

  const port = await getFreePort()
  const baseUrl = `http://127.0.0.1:${port}`
  const preview = await startPreview(port)

  try {
    await assertPreviewSite(baseUrl)
  } catch (err) {
    await stopPreviewAsync(preview)
    throw err
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    locale: 'he-IL',
  })

  await context.addInitScript(() => {
    try {
      localStorage.setItem('the-witch-analytics-consent', 'denied')
    } catch {
      /* ignore */
    }
  })

  let failed = 0

  try {
    for (const route of PRERENDER_ROUTES) {
      const page = await context.newPage()
      try {
        await prerenderRoute(page, baseUrl, route)
      } catch (err) {
        failed += 1
        console.error(`prerender FAIL: ${route.path}`, err instanceof Error ? err.message : err)
      } finally {
        await page.close()
      }
    }
  } finally {
    await context.close().catch(() => {})
    await browser.close().catch(() => {})
    await stopPreviewAsync(preview)
  }

  if (failed > 0) {
    throw new Error(`prerender failed for ${failed} route(s)`)
  }

  console.log(`prerender done: ${PRERENDER_ROUTES.length} routes`)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
