import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { useHeavyEffectsReady } from '../context/HeavyEffectsReadyContext'
import { useHeavyEffectsBlocked } from '../hooks/useHeavyEffectsBlocked'
import { isHomePath } from '../lib/cosmicFieldAllowlist'
import { scrollIsolationDebug } from '../lib/scrollIsolationDebug'

const CosmicFieldLazy = lazy(() =>
  import('./CosmicField.impl').then((m) => ({ default: m.CosmicFieldImpl })),
)

/** רקע סטטי לפני heavy effects — ורוד + תכלת (ומעט סגול עליון) */
const staticMountBg = [
  'radial-gradient(ellipse 88% 68% at 50% 0%, rgba(167, 139, 250, 0.2) 0%, transparent 56%)',
  'radial-gradient(ellipse 78% 62% at 22% 48%, rgba(236, 72, 153, 0.26) 0%, transparent 54%)',
  'radial-gradient(ellipse 74% 58% at 78% 44%, rgba(34, 211, 238, 0.26) 0%, transparent 54%)',
  'radial-gradient(ellipse 92% 48% at 50% 100%, rgba(6, 182, 212, 0.14) 0%, transparent 52%)',
].join(', ')

function CosmicFieldMountPlaceholder() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 isolate overflow-hidden" aria-hidden>
      <div className="pointer-events-none absolute inset-0 bg-[#020617]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.92]"
        style={{ background: staticMountBg }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_-20%,rgba(30,27,75,0.5),transparent_60%)]" />
    </div>
  )
}

/**
 * רקע קוסמי: Placeholder → אחרי HeavyEffectsReady — טעינת ה־impl (אורורה + חלקיקים) בלי עיכוב נוסף.
 */
export function CosmicField() {
  const { pathname } = useLocation()
  const ready = useHeavyEffectsReady()
  const blocked = useHeavyEffectsBlocked()
  const isHome = isHomePath(pathname)

  if (!scrollIsolationDebug.enableCosmicField) {
    return null
  }
  if (!isHome) {
    return null
  }

  if (blocked || !ready) {
    return <CosmicFieldMountPlaceholder />
  }

  return (
    <div className="pointer-events-none absolute inset-0 isolate" aria-hidden>
      <CosmicFieldMountPlaceholder />
      <Suspense fallback={null}>
        <div className="cosmic-field-impl-fade pointer-events-none absolute inset-0 z-[1]">
          <CosmicFieldLazy />
        </div>
      </Suspense>
    </div>
  )
}
