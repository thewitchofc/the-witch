const SITE_ORIGIN = 'https://thewitch.co.il'

/** @param {string} routePath */
export function canonicalForRoute(routePath) {
  if (routePath === '/' || routePath === '') return `${SITE_ORIGIN}/`
  const p = routePath.startsWith('/') ? routePath : `/${routePath}`
  return `${SITE_ORIGIN}${p}`
}

const APP_STYLESHEET_RE =
  /<link[^>]*rel=["']stylesheet["'][^>]*href=["']\/assets\/index-[^"']+\.css["'][^>]*>\s*/i
const APP_MODULE_SCRIPT_RE =
  /<script type="module" crossorigin="" src="\/assets\/index-[^"']+\.js"><\/script>\s*/i
const Heebo_FONT_STYLESHEET =
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;600;700&display=optional">'

/** Playwright/onload משאירים rel=stylesheet+as=style — מנקים לקישור יציב */
function fixFontStylesheetLink(html) {
  return html.replace(
    /<link[^>]*href=["']https:\/\/fonts\.googleapis\.com\/css2\?family=Heebo[^"']*["'][^>]*>\s*/gi,
    `${Heebo_FONT_STYLESHEET}\n    `,
  )
}

/** CSS לפני module script — Safari/iOS לפעמים לא מיישמים עיצוב כשהסדר הפוך */
function prioritizeAppStylesheet(html) {
  const cssMatch = html.match(APP_STYLESHEET_RE)
  if (!cssMatch) return html

  const cssTag = cssMatch[0]
    .replace(/\s*crossorigin(?:=["'][^"']*["'])?/gi, '')
    .replace(/\s+/g, ' ')
    .trim()

  const scriptMatch = html.match(APP_MODULE_SCRIPT_RE)
  const scriptTag = scriptMatch ? scriptMatch[0].trim() : ''

  let out = html.replace(APP_STYLESHEET_RE, '')
  if (scriptTag) out = out.replace(APP_MODULE_SCRIPT_RE, '')

  const bundle = scriptTag ? `${cssTag}\n    ${scriptTag}\n    ` : `${cssTag}\n    `
  const anchor = '</style>'
  if (out.includes(anchor)) {
    return out.replace(anchor, `${anchor}\n    ${bundle}`)
  }
  return out.replace('</head>', `    ${bundle}  </head>`)
}

/**
 * Dedupe head SEO tags so prerendered HTML has one canonical + og:url + title per route.
 * @param {string} html
 * @param {{ path: string, title: string }} route
 */
export function postprocessPrerenderHtml(html, route) {
  const canonical = canonicalForRoute(route.path)

  let out = html.replace(/<title[^>]*>[\s\S]*?<\/title>\s*/gi, '')
  out = out.replace(/<link[^>]*rel=["']canonical["'][^>]*>\s*/gi, '')
  out = out.replace(/<meta[^>]*property=["']og:url["'][^>]*>\s*/gi, '')

  out = fixFontStylesheetLink(out)
  out = prioritizeAppStylesheet(out)

  const injection = [
    `<title>${route.title}</title>`,
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:url" content="${canonical}">`,
  ].join('\n    ')

  return out.replace('</head>', `    ${injection}\n  </head>`)
}
