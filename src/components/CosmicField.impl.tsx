import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffectsStage } from '../context/HeavyEffectsReadyContext'
import { isHomePath } from '../lib/cosmicFieldAllowlist'
import { useHeavyEffectsBlocked } from '../hooks/useHeavyEffectsBlocked'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const auroraBackground = [
  'radial-gradient(ellipse 88% 68% at 50% 0%, rgba(180, 120, 255, 0.26) 0%, transparent 56%)',
  'radial-gradient(ellipse 72% 58% at 26% 46%, rgba(236, 72, 153, 0.17) 0%, transparent 52%)',
  'radial-gradient(ellipse 68% 52% at 74% 50%, rgba(34, 211, 238, 0.2) 0%, transparent 52%)',
].join(', ')

const COSMIC_IO: IntersectionObserverInit = {
  root: null,
  rootMargin: '64px 0px',
  threshold: 0.02,
}

/** ≤10 אנימציות framer במקביל (חלקיקים + אורורה בשלב 3) */
const PARTICLE_COUNT = 8

/** 0..1 דטרמיניסטי לפי מפתח, טהור לרינדור */
function unitRand(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

function StaticCosmicBackdrop({ mediumBlur }: { mediumBlur: boolean }) {
  return (
    <div
      className="pointer-events-none absolute -top-1/2 inset-x-0 h-[120%] w-full overflow-hidden"
      aria-hidden
    >
      <div
        className={
          mediumBlur
            ? 'pointer-events-none absolute inset-0 opacity-[0.7] blur-[36px]'
            : 'pointer-events-none absolute inset-0 opacity-[0.82]'
        }
        style={{ background: auroraBackground }}
      />
    </div>
  )
}

/** דף הבית: אורורה — שלב 1 ללא blur כבד; שלב 2+ blur בינוני; שלב 3 אנימציית opacity מוגבלת ב-repeat */
function HomeAurora({ stage, reduceMotion }: { stage: number; reduceMotion: boolean }) {
  if (reduceMotion) {
    return (
      <div
        className="pointer-events-none absolute -top-1/2 inset-x-0 h-[120%] w-full overflow-hidden"
        aria-hidden
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.68] blur-[36px]"
          style={{ background: auroraBackground }}
        />
      </div>
    )
  }

  if (stage < 3) {
    const blurClass = stage >= 2 ? 'blur-[36px]' : ''
    return (
      <div
        className="pointer-events-none absolute -top-1/2 inset-x-0 h-[120%] w-full overflow-hidden"
        aria-hidden
      >
        <div
          className={`pointer-events-none absolute inset-0 opacity-[0.68] ${blurClass}`}
          style={{ background: auroraBackground }}
        />
      </div>
    )
  }

  return (
    <div
      className="pointer-events-none absolute -top-1/2 inset-x-0 h-[120%] w-full overflow-hidden"
      aria-hidden
    >
      <div
        className="cosmic-aurora-breathe pointer-events-none absolute inset-0 blur-[56px] will-change-[opacity] motion-reduce:animate-none"
        style={{ background: auroraBackground }}
      />
    </div>
  )
}

function Particles({ effectsStage }: { effectsStage: number }) {
  const reduceMotion = usePrefersReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [particlesInView, setParticlesInView] = useState(true)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        setParticlesInView(entries.some((e) => e.isIntersecting))
      },
      { root: null, rootMargin: '80px', threshold: 0 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const r = (k: number) => unitRand(i * 7919 + k)
        const xDrift = (r(1) - 0.5) * 22
        const xMid = (r(2) - 0.5) * 16
        const xLate = (r(3) - 0.5) * 11
        const yPeak = -(9 + r(4) * 18)
        const yMid = yPeak * (0.32 + r(5) * 0.38)
        const ySettle = yPeak * (0.22 + r(6) * 0.22)
        const raw = [0.11 + r(7) * 0.15, 0.36 + r(8) * 0.2, 0.58 + r(9) * 0.18].sort((a, b) => a - b)
        const times = [0, raw[0], raw[1], raw[2], 1] as number[]
        return {
          id: i,
          left: `${r(10) * 100}%`,
          top: `${r(11) * 100}%`,
          size: 1 + r(12) * 2.4,
          duration: 9 + r(13) * 16,
          delay: r(14) * 6,
          opacity: 0.14 + r(15) * 0.38,
          xDrift,
          xMid,
          xLate,
          yPeak,
          yMid,
          ySettle,
          scalePeak: 1.025 + r(16) * 0.07,
          times,
        }
      }),
    [],
  )

  const motionHeavy = effectsStage >= 3 && !reduceMotion
  const allowWillChange = motionHeavy

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => {
        const paused = !particlesInView || reduceMotion
        const o0 = motionHeavy ? p.opacity * 0.4 : p.opacity * 0.55
        const o2 = motionHeavy ? p.opacity * 0.68 : p.opacity * 0.55
        const baseClass = allowWillChange
          ? 'absolute rounded-full bg-white/95 will-change-[transform,opacity] motion-reduce:animate-none'
          : 'absolute rounded-full bg-white/95 motion-reduce:animate-none'
        const animClass = paused
          ? ''
          : motionHeavy
            ? 'cosmic-particle-anim'
            : 'cosmic-particle-anim--light'
        const animStyle: CSSProperties | undefined = paused
          ? undefined
          : motionHeavy
            ? {
                ['--p-o0' as string]: o0,
                ['--p-o1' as string]: p.opacity,
                ['--p-o2' as string]: o2,
                ['--p-tx1' as string]: `${p.xMid}px`,
                ['--p-ty1' as string]: `${p.yMid}px`,
                ['--p-tx2' as string]: `${p.xLate}px`,
                ['--p-ty2' as string]: `${p.ySettle}px`,
                ['--p-s1' as string]: p.scalePeak,
                ['--p-dur' as string]: `${p.duration}s`,
                ['--p-delay' as string]: `${p.delay}s`,
              }
            : {
                ['--p-o0' as string]: p.opacity * 0.55,
                ['--p-o1' as string]: p.opacity * 0.9,
                ['--p-o2' as string]: p.opacity * 0.55,
                ['--p-tx1' as string]: `${p.xMid * 0.45}px`,
                ['--p-ty1' as string]: `${p.yPeak * 0.48}px`,
                ['--p-tx2' as string]: '0px',
                ['--p-ty2' as string]: '0px',
                ['--p-s1' as string]: 1.012,
                ['--p-dur' as string]: `${p.duration * 0.55}s`,
                ['--p-delay' as string]: `${p.delay}s`,
              }
        return (
          <span
            key={p.id}
            className={[baseClass, animClass].filter(Boolean).join(' ')}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              boxShadow: '0 0 14px rgba(196, 181, 253, 0.22), 0 0 28px rgba(34, 211, 238, 0.08)',
              opacity: paused ? p.opacity * 0.75 : undefined,
              ...animStyle,
            }}
          />
        )
      })}
    </div>
  )
}

/**
 * דף הבית: אורורה (CSS) בשלבים + חלקיקים מ־שלב 2; אנימציית scroll בפרלקס.
 * `shouldBlockHeavyEffects` / `prefers-reduced-motion`: רקע סטטי בלבד.
 */
export function CosmicFieldImpl() {
  const { pathname } = useLocation()
  const blocked = useHeavyEffectsBlocked()
  const reduceMotion = usePrefersReducedMotion()
  const effectsStage = useEffectsStage()
  const rootRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  const home = isHomePath(pathname)
  const mayMotion = !blocked && !reduceMotion

  useEffect(() => {
    if (!mayMotion) {
      const id = window.setTimeout(() => setInView(false), 0)
      return () => window.clearTimeout(id)
    }

    /* איפוס לפני subscribe ל־IntersectionObserver כשהנתיב / שער motion משתנים */
    // eslint-disable-next-line react-hooks/set-state-in-effect -- סינכרון מכוון לפני ה־observer
    setInView(false)

    const el = rootRef.current
    if (!el) return

    const obs = new IntersectionObserver((entries) => {
      setInView(entries.some((e) => e.isIntersecting))
    }, COSMIC_IO)

    obs.observe(el)
    return () => obs.disconnect()
  }, [mayMotion, pathname])

  const active = mayMotion && inView
  const fullHome = home && active
  const particlesOnly = !home && active
  const staticBlurMedium = effectsStage >= 2 && mayMotion

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 isolate overflow-hidden"
      aria-hidden
    >
      <div className="cosmic-scroll-parallax pointer-events-none absolute inset-x-0 top-[-7%] h-[114%] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_-20%,rgba(30,27,75,0.55),transparent_60%)]" />
          {(!active || !fullHome) && <StaticCosmicBackdrop mediumBlur={staticBlurMedium} />}
          {particlesOnly && effectsStage >= 2 ? (
            <div className="pointer-events-none absolute inset-0 z-[1]">
              <div className="absolute inset-0 overflow-hidden">
                <Particles effectsStage={effectsStage} />
              </div>
            </div>
          ) : null}
          {fullHome ? (
            <>
              <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
                <HomeAurora stage={effectsStage} reduceMotion={!!reduceMotion} />
              </div>
              {effectsStage >= 2 ? (
                <div className="pointer-events-none absolute inset-0 z-[1]">
                  <div className="absolute inset-0 overflow-hidden">
                    <Particles effectsStage={effectsStage} />
                  </div>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
