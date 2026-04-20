/** הסכמה לעוגיות/אנליטיקה — נשמר ב־localStorage */
const STORAGE_KEY = 'the-witch-analytics-consent'

export type AnalyticsConsentStored = 'granted' | 'denied'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function readConsent(): AnalyticsConsentStored | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'granted' || v === 'denied') return v
  } catch {
    /* ignore */
  }
  return null
}

export function writeConsent(value: AnalyticsConsentStored) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* ignore */
  }
}

function measurementId(): string | undefined {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID
  return typeof id === 'string' && /^G-[A-Z0-9]+$/i.test(id.trim()) ? id.trim() : undefined
}

let injected = false

/** טוען את סקריפט GA4 רק אחרי הסכמה — קריאה חוזרת בטוחה */
export function injectGoogleAnalytics() {
  const id = measurementId()
  if (!id || typeof window === 'undefined' || injected) return
  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    injected = true
    return
  }

  window.dataLayer = window.dataLayer ?? []
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  window.gtag = gtag

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(script)

  gtag('js', new Date())
  gtag('config', id, {
    anonymize_ip: true,
    send_page_view: false,
  })
  injected = true
}

export function trackPageView() {
  if (readConsent() !== 'granted') return
  const id = measurementId()
  if (!id || !window.gtag) return
  window.gtag('event', 'page_view', {
    page_location: window.location.href,
    page_title: document.title,
    page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
  })
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (readConsent() !== 'granted') return
  window.gtag?.('event', name, params)
}
