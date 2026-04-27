import { lazy, Suspense, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useHeavyEffectsReady } from '../context/HeavyEffectsReadyContext'
import { isHomePath } from '../lib/cosmicFieldAllowlist'
import { scrollIsolationDebug } from '../lib/scrollIsolationDebug'

const CosmicFieldLazy = lazy(() =>
  import('./CosmicField.impl').then((m) => ({ default: m.CosmicFieldImpl })),
)

/** רקע סטטי לפני heavy effects — ללא blur כבד וללא motion */
const staticMountBg = [
  'radial-gradient(ellipse 88% 68% at 50% 0%, rgba(180, 120, 255, 0.22) 0%, transparent 56%)',
  'radial-gradient(ellipse 72% 58% at 26% 46%, rgba(236, 72, 153, 0.14) 0%, transparent 52%)',
  'radial-gradient(ellipse 68% 52% at 74% 50%, rgba(34, 211, 238, 0.16) 0%, transparent 52%)',
].join(', ')

function CosmicFieldMountPlaceholder() {
  return (
    <div className="pointer-events-none absolute inset-0 isolate overflow-hidden" aria-hidden>
      <div className="pointer-events-none absolute inset-0 bg-[#020617]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.92]"
        style={{ background: staticMountBg }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_-20%,rgba(30,27,75,0.5),transparent_60%)]" />
    </div>
  )
}

/** לאחר window זה: טעינת ה־chunk; או מיד באינטראקציה ראשונה */
const DEFER_CHUNK_MS = 1600
/** אחרי ההשהיה, ניסיון לרוץ ב־idle (לא חובה — נופלים ל־setImmediate/sync) */
const IDLE_FALLBACK_MS = 500

const INTERACTION_UNLOCK_EVENTS = ['scroll', 'pointerdown', 'keydown', 'touchstart'] as const

/**
 * אחרי HeavyEffectsReady: אין `import()` של ה־impl עד ~DEFER_CHUNK_MS, או עד אינטראקציה ראשונה.
 */
function useDeferredCosmicChunk(ready: boolean) {
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    if (!ready) {
      return
    }

    let done = false
    const run = () => {
      if (done) return
      done = true
      setUnlocked(true)
    }

    let deferTimer: ReturnType<typeof setTimeout> | undefined
    let idleId: number | undefined

    const onInteraction = () => {
      if (deferTimer !== undefined) {
        clearTimeout(deferTimer)
        deferTimer = undefined
      }
      if (typeof idleId === 'number' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId)
        idleId = undefined
      }
      run()
    }

    for (const ev of INTERACTION_UNLOCK_EVENTS) {
      window.addEventListener(ev, onInteraction, { passive: true, capture: true })
    }

    deferTimer = window.setTimeout(() => {
      deferTimer = undefined
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(
          () => {
            idleId = undefined
            run()
          },
          { timeout: IDLE_FALLBACK_MS },
        )
      } else {
        run()
      }
    }, DEFER_CHUNK_MS)

    return () => {
      for (const ev of INTERACTION_UNLOCK_EVENTS) {
        window.removeEventListener(ev, onInteraction, { capture: true })
      }
      if (deferTimer !== undefined) {
        clearTimeout(deferTimer)
      }
      if (typeof idleId === 'number' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId)
      }
    }
  }, [ready])

  return unlocked
}

/**
 * רקע קוסמי: Placeholder → אחרי HeavyEffectsReady, דחיית טעינת ה־chunk (idle/אינטראקציה)
 * → רק אז `CosmicFieldImpl`.
 */
export function CosmicField() {
  const { pathname } = useLocation()
  const ready = useHeavyEffectsReady()
  const isHome = isHomePath(pathname)
  const chunkUnlocked = useDeferredCosmicChunk(ready)

  if (!scrollIsolationDebug.enableCosmicField) {
    return null
  }
  if (!isHome) {
    return null
  }

  if (!ready) {
    return <CosmicFieldMountPlaceholder />
  }

  if (!chunkUnlocked) {
    return <CosmicFieldMountPlaceholder />
  }

  return (
    <Suspense fallback={null}>
      <CosmicFieldLazy />
    </Suspense>
  )
}
