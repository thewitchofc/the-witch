import { type ReactNode, useEffect, useState, useSyncExternalStore } from 'react'
import { useHeavyEffectsBlocked } from '../hooks/useHeavyEffectsBlocked'
import { useIsMobileViewport } from '../hooks/useIsMobileViewport'
import { shouldBlockHeavyEffects } from '../lib/heavyEffectsGuard'

const easeOutCubic = 'cubic-bezier(0.22, 1, 0.36, 1)'

/** מינימום קצר יותר, הרגשת ״אתר כבד״ בכניסה */
const minMs = 480
const minMsReduced = 180
/** מובייל: פחות זמן מעל התוכן + פחות אנימציות = פחות TBT */
const minMsMobile = 280

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )
}

type SplashPhase = 'on' | 'exit' | 'off'

/**
 * מסך טעינה קצר בכניסה לאתר, רקע קוסמי, לוגו, ואנימציית יציאה רכה.
 * בלי framer-motion — מעברי opacity/אנימציה ב־CSS בלבד כדי שלא ייטען motion ב־entry bundle.
 */
export function BootSplash({ children }: { children: ReactNode }) {
  const reduceMotion = usePrefersReducedMotion()
  const isMobile = useIsMobileViewport()
  const blocked = useHeavyEffectsBlocked()
  const [phase, setPhase] = useState<SplashPhase>(() =>
    typeof window !== 'undefined' && shouldBlockHeavyEffects(window.location.search) ? 'off' : 'on',
  )

  const simpleSplash = reduceMotion || isMobile || blocked

  useEffect(() => {
    if (!blocked) return
    const id = window.setTimeout(() => setPhase('off'), 0)
    return () => window.clearTimeout(id)
  }, [blocked])

  useEffect(() => {
    if (phase !== 'on') return
    let ms = reduceMotion ? minMsReduced : minMs
    if (isMobile && !reduceMotion) ms = minMsMobile
    const id = window.setTimeout(() => setPhase('exit'), ms)
    return () => window.clearTimeout(id)
  }, [phase, reduceMotion, isMobile])

  const exitMs = simpleSplash ? 200 : 550

  return (
    <>
      {children}
      {phase !== 'off' ? (
        <div
          role="progressbar"
          aria-busy={phase === 'on' || phase === 'exit'}
          aria-valuetext="טוען את האתר"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white"
          style={{
            opacity: phase === 'exit' ? 0 : 1,
            transitionProperty: 'opacity',
            transitionDuration: `${exitMs}ms`,
            transitionTimingFunction: easeOutCubic,
            pointerEvents: phase === 'exit' ? 'none' : 'auto',
          }}
          onTransitionEnd={(e) => {
            if (e.target !== e.currentTarget) return
            if (e.propertyName === 'opacity' && phase === 'exit') setPhase('off')
          }}
        >
          <div className="relative z-10 flex flex-col items-center gap-8 px-6">
            <div
              className="relative"
              style={{
                animation: simpleSplash
                  ? 'witch-boot-logo-simple 0.18s ease-out forwards'
                  : `witch-boot-logo-in 0.65s ${easeOutCubic} forwards`,
              }}
            >
              <img
                src="/logo.svg"
                alt="The Witch, לוגו"
                width={1690}
                height={890}
                decoding="async"
                fetchPriority="high"
                className="relative z-[1] h-[min(22vh,140px)] w-auto object-contain object-center brightness-0 invert drop-shadow-[0_0_20px_rgba(255,255,255,0.45)] sm:h-[min(24vh,160px)]"
              />
            </div>

            <div
              className="flex flex-col items-center gap-3 opacity-0"
              style={{
                animation: simpleSplash
                  ? 'witch-boot-fade-in 0.25s ease-out 0.05s forwards'
                  : `witch-boot-fade-in 0.45s ease-out ${reduceMotion ? 0.05 : 0.25}s forwards`,
              }}
            >
              <p
                className="font-sans text-sm tracking-wide text-slate-400"
                style={{ textShadow: '0 0 20px rgba(2,6,23,0.8)' }}
              >
                טוענים את החוויה…
              </p>
              <div className="h-1 w-44 rounded-full bg-white/15 sm:w-52" aria-hidden />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
