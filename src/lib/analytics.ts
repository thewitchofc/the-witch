/**
 * הסכמה לעוגיות/אנליטיקה (localStorage).
 * granted — בלי באנר, טוען Meta Pixel + GA
 * denied — בלי באנר, בלי פיקסל
 * null — טרם נבחר, מציגים באנר בכל כניסה
 */
export const ANALYTICS_CONSENT_STORAGE_KEY = 'the-witch-analytics-consent'

export type AnalyticsConsentStored = 'granted' | 'denied'

export const ANALYTICS_CONSENT_GRANTED_EVENT = 'the-witch-consent-granted'

type Fbq = {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  push: Fbq
  loaded: boolean
  version: string
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: Fbq
    _fbq?: Fbq
    __theWitchMetaPixelInstalled?: boolean
  }
}

export function readConsent(): AnalyticsConsentStored | null {
  try {
    const v = localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY)
    if (v === 'granted' || v === 'denied') return v
  } catch {
    /* ignore */
  }
  return null
}

export function hasConsentChoice(): boolean {
  return readConsent() !== null
}

export function isConsentGranted(): boolean {
  return readConsent() === 'granted'
}

export function isConsentDenied(): boolean {
  return readConsent() === 'denied'
}

export function shouldShowCookieBanner(): boolean {
  return !hasConsentChoice()
}

export function writeConsent(value: AnalyticsConsentStored) {
  try {
    localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, value)
  } catch {
    /* ignore */
  }
  if (value === 'granted' && typeof window !== 'undefined') {
    window.dispatchEvent(new Event(ANALYTICS_CONSENT_GRANTED_EVENT))
  }
}

/** טוען Meta Pixel ו־GA רק אם נשמר אישור בעבר או זה עתה */
export function loadAnalyticsIfConsented() {
  if (!isConsentGranted()) return
  scheduleInjectGoogleAnalytics()
}

/** שמירת בחירה + טעינת אנליטיקה רק באישור */
export function applyConsentChoice(value: AnalyticsConsentStored) {
  writeConsent(value)
  if (value === 'granted') loadAnalyticsIfConsented()
}

function measurementId(): string | undefined {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID
  return typeof id === 'string' && /^G-[A-Z0-9]+$/i.test(id.trim()) ? id.trim() : undefined
}

const META_PIXEL_DEFAULT_ID = '1510591837380183'

function metaPixelId(): string | undefined {
  const raw = import.meta.env.VITE_META_PIXEL_ID ?? META_PIXEL_DEFAULT_ID
  return typeof raw === 'string' && /^\d{8,20}$/.test(raw.trim()) ? raw.trim() : undefined
}

function isMetaPixelInstalled(): boolean {
  if (typeof window === 'undefined') return false
  return Boolean(
    window.__theWitchMetaPixelInstalled ||
      window.fbq ||
      document.querySelector('script[src*="connect.facebook.net"]'),
  )
}

/** תור dataLayer + gtag + config — בלי רשת, כדי ש־trackPageView יעבוד מיד אחרי הסכמה */
let snippetReady = false

/** טעינת gtag/js החיצוני בלבד */
let scriptInjected = false

/** Meta Pixel — תור fbq + init בלי רשת */
let fbqSnippetReady = false

/** טעינת fbevents.js החיצוני בלבד */
let fbqScriptInjected = false

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

/** מאתחל את fbq וה־init (ללא סקריפט חיצוני); idempotent */
export function ensureFbqSnippet() {
  const id = metaPixelId()
  if (!id || typeof window === 'undefined' || fbqSnippetReady) return

  if (isMetaPixelInstalled()) {
    fbqSnippetReady = true
    return
  }

  if (window.fbq) {
    fbqSnippetReady = true
    return
  }

  const n = function (...args: unknown[]) {
    if (n.callMethod) {
      n.callMethod(...args)
    } else {
      n.queue.push(args)
    }
  } as Fbq

  if (!window._fbq) window._fbq = n
  window.fbq = n
  n.push = n
  n.loaded = true
  n.version = '2.0'
  n.queue = []

  n('init', id)
  fbqSnippetReady = true
}

/** מוסיף את סקריפט connect.facebook.net/en_US/fbevents.js */
export function loadFbqJs() {
  const id = metaPixelId()
  if (!id || typeof window === 'undefined' || fbqScriptInjected) return
  if (isMetaPixelInstalled()) {
    fbqScriptInjected = true
    return
  }

  ensureFbqSnippet()

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)
  fbqScriptInjected = true
}

/**
 * דוחה את טעינת gtag/js עד אינטראקציה ראשונה (pointerdown / scroll / keydown)
 * או עד requestIdleCallback (timeout 5s; בלי rIC — setTimeout ~2.8s).
 * לפני כן קורא ל־ensureGtagSnippet() כדי שאירועים יישמרו בתור עד שהספרייה נטענת.
 */
export function scheduleInjectGoogleAnalytics() {
  if (typeof window === 'undefined') return
  const hasGa = Boolean(measurementId())
  const hasMeta = Boolean(metaPixelId())
  if (!hasGa && !hasMeta) return

  if (hasGa) ensureGtagSnippet()
  if (hasMeta) ensureFbqSnippet()

  const gaLoaded =
    !hasGa ||
    scriptInjected ||
    Boolean(document.querySelector('script[src*="googletagmanager.com/gtag/js"]'))
  const metaLoaded =
    !hasMeta ||
    fbqScriptInjected ||
    Boolean(document.querySelector('script[src*="connect.facebook.net"]'))
  if (gaLoaded && metaLoaded) {
    if (hasGa && document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
      scriptInjected = true
    }
    if (hasMeta && document.querySelector('script[src*="connect.facebook.net"]')) {
      fbqScriptInjected = true
    }
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
    if (hasGa) loadGtagJs()
    if (hasMeta) loadFbqJs()
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
  if (measurementId()) {
    ensureGtagSnippet()
    loadGtagJs()
  }
  if (metaPixelId()) {
    ensureFbqSnippet()
    loadFbqJs()
  }
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

export function trackMetaPageView() {
  if (readConsent() !== 'granted') return
  if (!metaPixelId() || !window.fbq) return
  window.fbq('track', 'PageView')
}

/** אירוע מותאם ל־Meta Pixel (למשל Lead, Contact) */
export function trackMetaEvent(eventName: string, params?: Record<string, unknown>) {
  if (readConsent() !== 'granted') return
  if (!metaPixelId() || !window.fbq) return
  if (params && Object.keys(params).length > 0) {
    window.fbq('track', eventName, params)
    return
  }
  window.fbq('track', eventName)
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (readConsent() !== 'granted') return
  window.gtag?.('event', name, params)
}
