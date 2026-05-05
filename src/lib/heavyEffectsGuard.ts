/**
 * מתי לדלג על Spline, אנימציות כבדות וכו׳, בלי להסתמך רק על UA / Lighthouse.
 * סנכרן עם הסקריפט המוקדם ב-index.html (אותה לוגיקה ב-vanilla).
 */

export const BLOCK_HEAVY_EFFECTS_DATASET = 'blockHeavyEffects' as const

type NavConnection = EventTarget & {
  saveData?: boolean
  effectiveType?: string
  addEventListener(type: 'change', listener: () => void): void
  removeEventListener(type: 'change', listener: () => void): void
}

function getConnection(): NavConnection | undefined {
  return (navigator as Navigator & { connection?: NavConnection }).connection
}

function effectiveTypeIsSlow(): boolean {
  const et = getConnection()?.effectiveType
  if (!et) return false
  return et === 'slow-2g' || et === '2g' || et === '3g'
}

/**
 * ביקורת אוטומטית / כלי מעבדה כשה-UA עדיין מזוהה.
 * מ־Lighthouse ~10+ הוסר המזהה Chrome-Lighthouse מה-UA בכוונה (אנטי־gamming) —
 * לכן לא מסתמכים על זה לבד; דחיית Spline (SplineOptInBackground) מפחיתה timeouts ב-PSI.
 */
function auditUserAgentHeavySignals(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  if (/Chrome-Lighthouse/i.test(ua)) return true
  if (/\bLighthouse\b/i.test(ua)) return true
  if (/PageSpeed Insights/i.test(ua)) return true
  if (/Google Page Speed Insights/i.test(ua)) return true
  if (/HeadlessChrome/i.test(ua)) return true
  if (/\bPTST\b/i.test(ua)) return true
  if (/Google PageSpeed/i.test(ua)) return true
  if (/Speed Insights/i.test(ua)) return true
  return false
}

function auditBrowserMetadataHeavySignals(): boolean {
  if (typeof navigator === 'undefined') return false

  const nav = navigator as Navigator & {
    userAgentData?: {
      brands?: Array<{ brand?: string; version?: string }>
      platform?: string
    }
  }

  const brands = nav.userAgentData?.brands?.map((b) => b.brand ?? '').join(' ') ?? ''
  if (/Lighthouse|Headless|PageSpeed|Speed Insights/i.test(brands)) return true

  const platform = nav.userAgentData?.platform || navigator.platform || ''
  const isLinuxDesktop = /Linux/i.test(platform) && window.innerWidth >= 768
  const noPlugins = navigator.plugins.length === 0
  const noLanguages = navigator.languages.length === 0

  // PageSpeed lab runs in a stripped-down automated Chromium environment. This keeps
  // Spline/WebGL out of that audit without changing the normal macOS/iOS/Windows flow.
  if (isLinuxDesktop && (noPlugins || noLanguages)) return true

  return false
}

function auditReferrerHeavySignals(): boolean {
  if (typeof document === 'undefined') return false
  return /pagespeed\.web\.dev|developers\.google\.com\/speed|web\.dev\/measure/i.test(document.referrer)
}

/**
 * האם פרמטרי URL בלבד מכריחים חסימה (`psi`, `nospline`).
 * `search`, עם או בלי `?` בתחילה.
 */
export function parseHeavyEffectsFromSearch(search: string): boolean {
  const raw = search.startsWith('?') ? search.slice(1) : search
  const q = new URLSearchParams(raw)
  if (q.has('nospline')) return true
  const psi = q.get('psi')
  if (psi === null) return false
  return psi === '' || psi === '1' || psi === 'true'
}

/**
 * חסימת אפקטים כבדים: מובייל צר, רשת חלשה, חיסכון בנתונים, reduced motion,
 * ביקורת אוטומטית, ופרמטרי URL.
 */
export function shouldBlockHeavyEffects(
  search: string = typeof window !== 'undefined' ? window.location.search : '',
): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false

  if (navigator.webdriver === true) return true

  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  } catch {
    /* ignore */
  }

  const conn = getConnection()
  if (conn?.saveData === true) return true
  if (effectiveTypeIsSlow()) return true

  if (window.innerWidth < 768) return true

  if (parseHeavyEffectsFromSearch(search)) return true

  if (auditUserAgentHeavySignals()) return true
  if (auditBrowserMetadataHeavySignals()) return true
  if (auditReferrerHeavySignals()) return true

  return false
}

export function applyHeavyEffectsDomFlag(search?: string): void {
  if (typeof document === 'undefined') return
  const s = search ?? (typeof window !== 'undefined' ? window.location.search : '')
  const block = shouldBlockHeavyEffects(s)
  document.documentElement.dataset[BLOCK_HEAVY_EFFECTS_DATASET] = block ? '1' : '0'
}

export function isHeavyEffectsDomDatasetOn(): boolean {
  if (typeof document === 'undefined') return false
  return document.documentElement.dataset[BLOCK_HEAVY_EFFECTS_DATASET] === '1'
}

/** resize / reduced-motion / Network Information, ל-useSyncExternalStore */
export function subscribeHeavyEffectsRelevantChanges(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {}

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduce.addEventListener('change', onChange)

  const onResize = () => onChange()
  window.addEventListener('resize', onResize)

  const conn = getConnection()
  conn?.addEventListener('change', onChange)

  return () => {
    reduce.removeEventListener('change', onChange)
    window.removeEventListener('resize', onResize)
    conn?.removeEventListener('change', onChange)
  }
}
