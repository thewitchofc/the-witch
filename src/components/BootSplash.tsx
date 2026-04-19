import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { type ReactNode, useEffect, useState } from 'react'

const easeOutCubic = [0.22, 1, 0.36, 1] as const

const minMs = 820
const minMsReduced = 280

/**
 * מסך טעינה קצר בכניסה לאתר — רקע קוסמי, לוגו, ואנימציית יציאה רכה.
 * עוטף את כל האפליקציה; אחרי זמן מינימלי נעלם עם fade.
 */
export function BootSplash({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const ms = reduceMotion ? minMsReduced : minMs
    const id = window.setTimeout(() => setVisible(false), ms)
    return () => window.clearTimeout(id)
  }, [reduceMotion])

  return (
    <>
      {children}
      <AnimatePresence>
        {visible ? (
          <motion.div
            key="boot-splash"
            role="progressbar"
            aria-busy="true"
            aria-valuetext="טוען את האתר"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] text-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: easeOutCubic }}
          >
            {/* אורות רקע — דומה ל־CosmicField */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              aria-hidden
            >
              <div
                className="absolute -top-1/2 left-1/2 h-[120%] w-[min(140%,100vw)] -translate-x-1/2 blur-[100px]"
                style={{
                  background: [
                    'radial-gradient(ellipse 88% 68% at 50% 0%, rgba(180, 120, 255, 0.28) 0%, transparent 56%)',
                    'radial-gradient(ellipse 72% 58% at 26% 46%, rgba(236, 72, 153, 0.18) 0%, transparent 52%)',
                    'radial-gradient(ellipse 68% 52% at 74% 50%, rgba(34, 211, 238, 0.22) 0%, transparent 52%)',
                  ].join(', '),
                }}
              />
              {!reduceMotion ? (
                <motion.div
                  className="absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      'radial-gradient(1.5px 1.5px at 20% 30%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,0.35), transparent), radial-gradient(1px 1px at 40% 80%, rgba(196,181,253,0.4), transparent)',
                    backgroundSize: '100% 100%',
                  }}
                  animate={{ opacity: [0.28, 0.42, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              ) : null}
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8 px-6">
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: reduceMotion ? 0.15 : 0.65, ease: easeOutCubic }}
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
                  alt=""
                  width={1690}
                  height={890}
                  decoding="async"
                  fetchPriority="high"
                  className="relative z-[1] h-[min(22vh,140px)] w-auto object-contain object-center drop-shadow-[0_0_24px_rgba(168,85,247,0.35)] sm:h-[min(24vh,160px)]"
                />
              </motion.div>

              <motion.div
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.25, duration: 0.45 }}
              >
                <p
                  className="font-sans text-sm tracking-wide text-slate-400"
                  style={{ textShadow: '0 0 20px rgba(2,6,23,0.8)' }}
                >
                  טוענים את החוויה…
                </p>
                {!reduceMotion ? (
                  <div className="flex h-1 w-44 overflow-hidden rounded-full bg-white/10 sm:w-52">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-l from-cyan-400 via-violet-400 to-fuchsia-500"
                      initial={{ x: '-100%', width: '40%' }}
                      animate={{ x: ['-100%', '120%'] }}
                      transition={{ duration: 1.35, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                ) : (
                  <div className="h-1 w-44 rounded-full bg-white/15 sm:w-52" aria-hidden />
                )}
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
