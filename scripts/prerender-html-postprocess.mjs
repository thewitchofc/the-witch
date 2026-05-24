const SITE_ORIGIN = 'https://thewitch.co.il'

/** @param {string} routePath */
export function canonicalForRoute(routePath) {
  if (routePath === '/' || routePath === '') return `${SITE_ORIGIN}/`
  const p = routePath.startsWith('/') ? routePath : `/${routePath}`
  return `${SITE_ORIGIN}${p}`
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

  const injection = [
    `<title>${route.title}</title>`,
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:url" content="${canonical}">`,
  ].join('\n    ')

  return out.replace('</head>', `    ${injection}\n  </head>`)
}
