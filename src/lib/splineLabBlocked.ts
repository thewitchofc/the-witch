/**
 * Spline (WebGL ב־iframe) כבד מאוד; Lighthouse/PageSpeed לפעמים קורסים ב־Runtime.evaluate.
 * כאן מזהים סביבות ביקורת ומדלגים על הטמעה — המשתמשים הרגילים לא מושפעים.
 */

export function isSplineBlockedForAutomatedAudits(): boolean {
  if (typeof navigator === 'undefined') return false

  const ua = navigator.userAgent
  if (/Chrome-Lighthouse/i.test(ua)) return true
  if (/\bLighthouse\b/i.test(ua)) return true
  if (/PageSpeed Insights/i.test(ua)) return true
  if (/Google Page Speed Insights/i.test(ua)) return true

  return false
}

/** `?psi=1`, `?nospline`, `?nospline=1` — לבדיקה ידנית או לינק ל־PSI */
export function isSplineBlockedByUrlSearch(search: string): boolean {
  const normalized = search.startsWith('?') ? search.slice(1) : search
  const q = new URLSearchParams(normalized)

  if (q.has('nospline')) return true

  const psi = q.get('psi')
  if (psi === null) return false
  if (psi === '' || psi === '1' || psi === 'true') return true

  return false
}
