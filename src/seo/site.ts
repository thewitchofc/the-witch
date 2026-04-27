/** מקור האתר החי, SEO, OG, sitemap */
export const SITE_ORIGIN = 'https://thewitch.co.il'

/** תמונת OG אחידה 1200×630, טקסט: «בניית אתרים שמביאים לקוחות» */
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-default.webp`

/** כתובת קנונית ו־og:url, ללא # (נקייה לשיתוף ולמנועי חיפוש) */
export function siteCanonicalUrl(pathname: string): string {
  const p = pathname.startsWith('/') ? pathname : `/${pathname}`
  if (p === '/' || p === '') return `${SITE_ORIGIN}/`
  return `${SITE_ORIGIN}${p}`
}

/** מבטיח ש־og:image הוא תמיד URL מלא */
export function absoluteOgImage(url: string): string {
  const t = url.trim()
  if (t.startsWith('https://') || t.startsWith('http://')) return t
  const path = t.startsWith('/') ? t : `/${t}`
  return `${SITE_ORIGIN}${path}`
}
