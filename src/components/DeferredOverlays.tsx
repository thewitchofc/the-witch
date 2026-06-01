import { lazy, Suspense, useEffect, useState } from 'react'
import { CookieBanner } from './CookieBanner'
import { shouldSkipFloatingChromeForPerfAudit } from '../lib/heavyEffectsGuard'

const AccessibilityWidget = lazy(() =>
  import('./AccessibilityWidget').then((m) => ({ default: m.AccessibilityWidget })),
)
const WhatsAppWidget = lazy(() =>
  import('./WhatsAppWidget').then((m) => ({ default: m.WhatsAppWidget })),
)

/** אחרי load + idle — מחוץ לחלון CLS של LCP במובייל */
function useShowFloatingWidgets() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (shouldSkipFloatingChromeForPerfAudit()) return

    let cancelled = false
    let idleId = 0
    let timerId = 0

    const reveal = () => {
      if (!cancelled) setShow(true)
    }

    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(reveal, { timeout: 2200 }) as unknown as number
      } else {
        timerId = window.setTimeout(reveal, 2200)
      }
    }

    if (document.readyState === 'complete') {
      schedule()
    } else {
      window.addEventListener('load', schedule, { once: true })
    }

    return () => {
      cancelled = true
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      window.clearTimeout(timerId)
    }
  }, [])

  return show
}

function DeferredFloatingWidgets() {
  const show = useShowFloatingWidgets()
  if (!show) return null

  return (
    <Suspense fallback={null}>
      <AccessibilityWidget />
      <WhatsAppWidget />
    </Suspense>
  )
}

/** באנר עוגיות מיידי; וואטסאפ + נגישות אחרי load — פחות CLS ב-PSI */
export function DeferredOverlays() {
  return (
    <>
      <CookieBanner />
      <DeferredFloatingWidgets />
    </>
  )
}
