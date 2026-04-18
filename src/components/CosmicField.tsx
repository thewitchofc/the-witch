import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

function CosmicBackdrop() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="pointer-events-none absolute -top-1/2 left-1/2 h-[120%] w-[min(140%,100vw)] -translate-x-1/2 blur-[100px]"
      aria-hidden
      style={{
        background: [
          'radial-gradient(ellipse 88% 68% at 50% 0%, rgba(180, 120, 255, 0.26) 0%, transparent 56%)',
          'radial-gradient(ellipse 72% 58% at 26% 46%, rgba(236, 72, 153, 0.17) 0%, transparent 52%)',
          'radial-gradient(ellipse 68% 52% at 74% 50%, rgba(34, 211, 238, 0.2) 0%, transparent 52%)',
        ].join(', '),
      }}
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

  const particles = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => {
        const xDrift = (Math.random() - 0.5) * 22
        const xMid = (Math.random() - 0.5) * 16
        const xLate = (Math.random() - 0.5) * 11
        const yPeak = -(9 + Math.random() * 18)
        const yMid = yPeak * (0.32 + Math.random() * 0.38)
        const ySettle = yPeak * (0.22 + Math.random() * 0.22)
        const raw = [0.11 + Math.random() * 0.15, 0.36 + Math.random() * 0.2, 0.58 + Math.random() * 0.18].sort(
          (a, b) => a - b,
        )
        const times = [0, raw[0], raw[1], raw[2], 1] as number[]
        return {
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: 1 + Math.random() * 2.4,
          duration: 9 + Math.random() * 16,
          delay: Math.random() * 6,
          opacity: 0.14 + Math.random() * 0.38,
          xDrift,
          xMid,
          xLate,
          yPeak,
          yMid,
          ySettle,
          scalePeak: 1.025 + Math.random() * 0.07,
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

/** Same cosmic stack as Hero: base radial + aurora + particles */
export function CosmicField() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* Gradients/blur may extend past the box (-top on aurora); keep overflow visible so they are not clipped */}
      <div className="absolute inset-0 overflow-visible">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_-20%,rgba(30,27,75,0.55),transparent_60%)]" />
        <CosmicBackdrop />
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <Particles />
      </div>
    </div>
  )
}
