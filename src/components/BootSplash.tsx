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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] text-white"
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
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden
          >
            <div
              className="absolute -top-1/2 left-1/2 h-[120%] w-[min(140%,100%)] -translate-x-1/2 blur-[100px]"
              style={{
                background: [
                  'radial-gradient(ellipse 88% 68% at 50% 0%, rgba(180, 120, 255, 0.28) 0%, transparent 56%)',
                  'radial-gradient(ellipse 72% 58% at 26% 46%, rgba(236, 72, 153, 0.18) 0%, transparent 52%)',
                  'radial-gradient(ellipse 68% 52% at 74% 50%, rgba(34, 211, 238, 0.22) 0%, transparent 52%)',
                ].join(', '),
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.32]"
              style={{
                backgroundImage:
                  'radial-gradient(1.5px 1.5px at 20% 30%, rgba(255,255,255,0.45), transparent), radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 40% 80%, rgba(196,181,253,0.35), transparent)',
                backgroundSize: '100% 100%',
              }}
              aria-hidden
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 px-6">
            <div
              className="relative"
              style={{
                animation: simpleSplash
                  ? 'witch-boot-logo-simple 0.18s ease-out forwards'
                  : `witch-boot-logo-in 0.65s ${easeOutCubic} forwards`,
              }}
            >
              <div
                className="absolute inset-[-14px] rounded-[2rem] opacity-80 blur-xl"
                style={{
                  background:
                    'conic-gradient(from 210deg, rgba(34,211,238,0.35), rgba(167,139,250,0.45), rgba(236,72,153,0.3), rgba(34,211,238,0.35))',
                }}
                aria-hidden
              />
              <img
                src="/logo.svg"
                alt="The Witch, לוגו"
                width={1690}
                height={890}
                decoding="async"
                fetchPriority="high"
                className="relative z-[1] h-[min(22vh,140px)] w-auto object-contain object-center drop-shadow-[0_0_24px_rgba(168,85,247,0.35)] sm:h-[min(24vh,160px)]"
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
