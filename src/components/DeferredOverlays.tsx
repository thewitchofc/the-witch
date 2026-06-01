import { lazy, Suspense, useEffect, useState } from 'react'

const CookieBanner = lazy(() =>
  import('./CookieBanner').then((m) => ({ default: m.CookieBanner })),
)
const AccessibilityWidget = lazy(() =>
  import('./AccessibilityWidget').then((m) => ({ default: m.AccessibilityWidget })),
)
const WhatsAppWidget = lazy(() =>
  import('./WhatsAppWidget').then((m) => ({ default: m.WhatsAppWidget })),
)

const DEFER_MS = 1800

/** דוחים באנר עוגיות וווידג'טים צפים — משפר FCP/LCP/CLS במובייל וב-PSI */
export function DeferredOverlays() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let cancelled = false
    let idleId = 0
    let timerId = 0

    const reveal = () => {
      if (!cancelled) setShow(true)
    }

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(reveal, { timeout: DEFER_MS }) as unknown as number
    } else {
      timerId = window.setTimeout(reveal, DEFER_MS)
    }

    return () => {
      cancelled = true
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      window.clearTimeout(timerId)
    }
  }, [])

  if (!show) return null

  return (
    <Suspense fallback={null}>
      <CookieBanner />
      <AccessibilityWidget />
      <WhatsAppWidget />
    </Suspense>
  )
}
