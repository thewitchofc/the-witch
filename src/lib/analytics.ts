/** הסכמה לעוגיות/אנליטיקה, נשמר ב־localStorage */
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

/** תור dataLayer + gtag + config — בלי רשת, כדי ש־trackPageView יעבוד מיד אחרי הסכמה */
let snippetReady = false

/** טעינת gtag/js החיצוני בלבד */
let scriptInjected = false

let deferArmActive = false

type IdleHandle = ReturnType<typeof requestIdleCallback>

/** מאתחל את gtag וה־config (ללא סקריפט חיצוני); idempotent */
export function ensureGtagSnippet() {
  const id = measurementId()
  if (!id || typeof window === 'undefined' || snippetReady) return

  window.dataLayer = window.dataLayer ?? []
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', id, {
    anonymize_ip: true,
    send_page_view: false,
  })
  snippetReady = true
}

/** מוסיף את סקריפט googletagmanager.com/gtag/js (רשת + parse) */
export function loadGtagJs() {
  const id = measurementId()
  if (!id || typeof window === 'undefined' || scriptInjected) return
  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    scriptInjected = true
    return
  }

  ensureGtagSnippet()

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(script)
  scriptInjected = true
}

/**
 * דוחה את טעינת gtag/js עד אינטראקציה ראשונה (pointerdown / scroll / keydown)
 * או עד requestIdleCallback (timeout 5s; בלי rIC — setTimeout ~2.8s).
 * לפני כן קורא ל־ensureGtagSnippet() כדי שאירועים יישמרו בתור עד שהספרייה נטענת.
 */
export function scheduleInjectGoogleAnalytics() {
  if (typeof window === 'undefined') return
  if (!measurementId()) return

  ensureGtagSnippet()

  if (scriptInjected) return
  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    scriptInjected = true
    return
  }
  if (deferArmActive) return
  deferArmActive = true

  const captureOpts: AddEventListenerOptions = { capture: true, passive: true }

  let idleId: IdleHandle | undefined
  let timeoutFallbackId: ReturnType<typeof setTimeout> | undefined

  const cancelIdleAndTimeout = () => {
    if (idleId !== undefined && typeof cancelIdleCallback === 'function') {
      cancelIdleCallback(idleId)
      idleId = undefined
    }
    if (timeoutFallbackId !== undefined) {
      window.clearTimeout(timeoutFallbackId)
      timeoutFallbackId = undefined
    }
  }

  const removeInteractListeners = () => {
    window.removeEventListener('pointerdown', onInteract, captureOpts)
    window.removeEventListener('scroll', onInteract, captureOpts)
    window.removeEventListener('keydown', onInteract, captureOpts)
  }

  const fire = () => {
    removeInteractListeners()
    cancelIdleAndTimeout()
    deferArmActive = false
    loadGtagJs()
  }

  function onInteract() {
    fire()
  }

  window.addEventListener('pointerdown', onInteract, captureOpts)
  window.addEventListener('scroll', onInteract, captureOpts)
  window.addEventListener('keydown', onInteract, captureOpts)

  if (typeof window.requestIdleCallback === 'function') {
    idleId = window.requestIdleCallback(() => fire(), { timeout: 5000 })
  } else {
    timeoutFallbackId = window.setTimeout(() => fire(), 2800)
  }
}

/** טוען snippet + סקריפט חיצוני מיד (ללא דחייה) */
export function injectGoogleAnalytics() {
  ensureGtagSnippet()
  loadGtagJs()
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
