import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useHeavyEffectsBlocked } from '../hooks/useHeavyEffectsBlocked'

const auroraBackground = [
  'radial-gradient(ellipse 88% 68% at 50% 0%, rgba(180, 120, 255, 0.26) 0%, transparent 56%)',
  'radial-gradient(ellipse 72% 58% at 26% 46%, rgba(236, 72, 153, 0.17) 0%, transparent 52%)',
  'radial-gradient(ellipse 68% 52% at 74% 50%, rgba(34, 211, 238, 0.2) 0%, transparent 52%)',
].join(', ')

/** 0..1 דטרמיניסטי לפי מפתח — טהור לרינדור */
function unitRand(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

/** מובייל: בלי Framer על הרקע — פחות עומס על ה-main thread (TBT) */
function StaticCosmicBackdrop() {
  return (
    <div
      className="pointer-events-none absolute -top-1/2 left-1/2 h-[120%] w-[min(140%,100vw)] -translate-x-1/2 opacity-[0.7] blur-[72px]"
      aria-hidden
      style={{ background: auroraBackground }}
    />
  )
}

function CosmicBackdrop() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="pointer-events-none absolute -top-1/2 left-1/2 h-[120%] w-[min(140%,100vw)] -translate-x-1/2 blur-[100px]"
      aria-hidden
      style={{ background: auroraBackground }}
      animate={reduceMotion ? { opacity: 0.68 } : { opacity: [0.62, 0.76, 0.64, 0.72, 0.62] }}
      transition={{
        duration: reduceMotion ? 0 : 22,
        repeat: reduceMotion ? 0 : Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

function Particles() {
  const reduceMotion = useReducedMotion()

  /** פחות אלמנטים מונפשים = פחות עומס על ה־GPU (במיוחד יחד עם blur ברקע) */
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => {
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

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white/95"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: '0 0 14px rgba(196, 181, 253, 0.22), 0 0 28px rgba(34, 211, 238, 0.08)',
          }}
          animate={
            reduceMotion
              ? { y: 0, x: 0, opacity: p.opacity * 0.75, scale: 1 }
              : {
                  y: [0, p.yMid, p.yPeak, p.ySettle, 0],
                  x: [0, p.xMid, p.xDrift * 0.72, p.xLate, 0],
                  opacity: [
                    p.opacity * 0.4,
                    p.opacity * 0.82,
                    p.opacity,
                    p.opacity * 0.68,
                    p.opacity * 0.4,
                  ],
                  scale: [1, 1.02, p.scalePeak, 1.018, 1],
                }
          }
          transition={{
            duration: reduceMotion ? 0 : p.duration,
            repeat: reduceMotion ? 0 : Infinity,
            ease: 'easeInOut',
            delay: p.delay,
            ...(reduceMotion ? {} : { times: p.times }),
          }}
        />
      ))}
    </div>
  )
}

/** Same cosmic stack as Hero: base radial + aurora + particles (כשלא חוסמים אפקטים כבדים) */
export function CosmicField() {
  const blocked = useHeavyEffectsBlocked()
  const lightweight = blocked

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* Gradients/blur may extend past the box (-top on aurora); keep overflow visible so they are not clipped */}
      <div className="absolute inset-0 overflow-visible">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_-20%,rgba(30,27,75,0.55),transparent_60%)]" />
        {lightweight ? <StaticCosmicBackdrop /> : <CosmicBackdrop />}
      </div>
      {!lightweight ? (
        <div className="absolute inset-0 overflow-hidden">
          <Particles />
        </div>
      ) : null}
    </div>
  )
}
