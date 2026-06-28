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

const SEO_TAG_PATTERNS = {
  title: /<title[^>]*>[\s\S]*?<\/title>\s*/gi,
  description: /<meta[^>]*name=["']description["'][^>]*>\s*/gi,
  robots: /<meta[^>]*name=["']robots["'][^>]*>\s*/gi,
  canonical: /<link[^>]*rel=["']canonical["'][^>]*>\s*/gi,
  og: /<meta[^>]*property=["']og:[^"']+["'][^>]*>\s*/gi,
  twitter: /<meta[^>]*name=["']twitter:[^"']+["'][^>]*>\s*/gi,
}

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

/** @param {string} html @param {RegExp} pattern */
function lastTagMatch(html, pattern) {
  const re = new RegExp(pattern.source, pattern.flags)
  const matches = [...html.matchAll(re)]
  return matches.length ? matches[matches.length - 1][0].trim() : ''
}

/** @param {string} tag */
function ogPropertyKey(tag) {
  const match = tag.match(/property=["']([^"']+)["']/i)
  return match ? match[1].toLowerCase() : tag.replace(/\s+/g, ' ').trim()
}

/** @param {string} tag */
function twitterNameKey(tag) {
  const match = tag.match(/name=["'](twitter:[^"']+)["']/i)
  return match ? match[1].toLowerCase() : tag.replace(/\s+/g, ' ').trim()
}

/** @param {string[]} tags @param {(tag: string) => string} keyForTag */
function dedupeMetaTagsByKey(tags, keyForTag) {
  const byKey = new Map()
  for (const tag of tags) {
    byKey.set(keyForTag(tag), tag.replace(/\s+/g, ' ').trim())
  }
  return [...byKey.values()]
}

/** @param {string} html */
function extractSeoTags(html) {
  const ogTags = [...html.matchAll(new RegExp(SEO_TAG_PATTERNS.og.source, SEO_TAG_PATTERNS.og.flags))].map((m) =>
    m[0].trim(),
  )
  const twitterTags = [...html.matchAll(new RegExp(SEO_TAG_PATTERNS.twitter.source, SEO_TAG_PATTERNS.twitter.flags))].map(
    (m) => m[0].trim(),
  )

  return {
    title: lastTagMatch(html, SEO_TAG_PATTERNS.title),
    description: lastTagMatch(html, SEO_TAG_PATTERNS.description),
    robots: lastTagMatch(html, SEO_TAG_PATTERNS.robots),
    canonical: lastTagMatch(html, SEO_TAG_PATTERNS.canonical),
    og: dedupeMetaTagsByKey(ogTags, ogPropertyKey),
    twitter: dedupeMetaTagsByKey(twitterTags, twitterNameKey),
  }
}

/** @param {string} html */
function stripSeoTags(html) {
  let out = html
  for (const pattern of Object.values(SEO_TAG_PATTERNS)) {
    out = out.replace(new RegExp(pattern.source, pattern.flags), '')
  }
  return out
}

/**
 * Dedupe head SEO tags — title/description/canonical/OG/Twitter יחידים לכל route.
 * @param {string} html
 * @param {{ path: string, title: string }} route
 */
export function postprocessPrerenderHtml(html, route) {
  const canonical = canonicalForRoute(route.path)
  const seo = extractSeoTags(html)

  let out = stripSeoTags(html)
  out = fixFontStylesheetLink(out)
  out = prioritizeAppStylesheet(out)

  const ogTags = seo.og.filter((tag) => !/property=["']og:url["']/i.test(tag))
  const twitterTags = seo.twitter

  const injection = [
    `<title>${route.title}</title>`,
    seo.description,
    seo.robots,
    `<link rel="canonical" href="${canonical}">`,
    ...ogTags,
    `<meta property="og:url" content="${canonical}">`,
    ...twitterTags,
  ]
    .filter(Boolean)
    .join('\n    ')

  return out.replace('</head>', `    ${injection}\n  </head>`)
}

/** @param {string} html */
export function assertSingleSeoTags(html) {
  const counts = {
    title: (html.match(/<title[^>]*>/gi) || []).length,
    description: (html.match(/name=["']description["']/gi) || []).length,
    canonical: (html.match(/rel=["']canonical["']/gi) || []).length,
    ogTitle: (html.match(/property=["']og:title["']/gi) || []).length,
    ogDescription: (html.match(/property=["']og:description["']/gi) || []).length,
    ogImage: (html.match(/property=["']og:image["']/gi) || []).length,
    ogUrl: (html.match(/property=["']og:url["']/gi) || []).length,
    twitterCard: (html.match(/name=["']twitter:card["']/gi) || []).length,
    twitterTitle: (html.match(/name=["']twitter:title["']/gi) || []).length,
    twitterDescription: (html.match(/name=["']twitter:description["']/gi) || []).length,
    twitterImage: (html.match(/name=["']twitter:image["']/gi) || []).length,
  }

  for (const [key, count] of Object.entries(counts)) {
    if (count !== 1) {
      throw new Error(`SEO dedupe failed: expected 1 ${key}, found ${count}`)
    }
  }
}
