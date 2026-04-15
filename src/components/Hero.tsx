import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { CosmicField } from './CosmicField'

const MotionLink = motion(Link)

const logoMaskStyle = {
  WebkitMaskImage: 'url(/the-witch-logo.png)',
  maskImage: 'url(/the-witch-logo.png)',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
  WebkitMaskSourceType: 'luminance',
  maskMode: 'luminance',
} as CSSProperties

const logoImgStyle = {
  ...logoMaskStyle,
  opacity: 1,
  filter:
    'drop-shadow(0 0 10px rgba(168, 85, 247, 0.35)) drop-shadow(0 0 12px rgba(168, 85, 247, 0.25)) drop-shadow(0 0 20px rgba(34, 211, 238, 0.25))',
} as CSSProperties

const headlineDesktop = 'אתרים שמביאים תוצאות.'
const headlineMobile = 'אתר שמביא לך לקוחות.'

const sublinesDesktop = ['בלי תבניות. בלי קיצורי דרך.'] as const
const sublineMobile = 'מהיר. מדויק. עובד.'

const ctaLabel = 'בדיקת התאמה לפרויקט'

const urgencyMobile = 'מוגבל ל־4 פרויקטים בחודש'

const disclaimerDesktop = [
  'עובדת רק עם עסקים שמוכנים להשקיע בתוצאה.',
  'הגבלה ל־4 פרויקטים בחודש.',
] as const

const easeOut = 'easeOut' as const

const ctaRestShadow =
  '0 4px 24px rgba(0, 0, 0, 0.28), 0 0 20px rgba(139, 92, 246, 0.12), 0 0 32px rgba(34, 211, 238, 0.06)'
const ctaHoverShadow =
  '0 10px 36px rgba(0, 0, 0, 0.35), 0 0 32px rgba(167, 139, 250, 0.42), 0 0 56px rgba(34, 211, 238, 0.18)'

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] w-full scroll-mt-24 flex-col items-center justify-center overflow-x-clip bg-[#020617] pt-24 text-white supports-[min-height:100dvh]:min-h-[100dvh]"
      dir="rtl"
      lang="he"
    >
      <CosmicField />

      <div className="relative z-10 flex w-full flex-1 touch-manipulation items-center justify-center pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:pl-[max(1.5rem,env(safe-area-inset-left,0px))] sm:pr-[max(1.5rem,env(safe-area-inset-right,0px))]">
        <div className="flex w-full max-w-full flex-col items-center justify-center py-[max(0.75rem,env(safe-area-inset-bottom,0px))]">
          <div className="mx-auto flex w-full max-w-[90%] flex-col items-center gap-5 text-center md:max-w-4xl md:gap-8 lg:max-w-5xl">
            <motion.div
              className="order-3 flex w-full justify-center max-md:opacity-90 md:order-1"
              lang="en"
              dir="ltr"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <img
                src="/the-witch-logo.png"
                alt="The Witch"
                width={1024}
                height={1024}
                decoding="async"
                fetchPriority="high"
                className="mx-auto h-auto w-full max-w-[140px] object-contain select-none md:max-w-[380px] lg:max-w-[460px] xl:max-w-[520px]"
                style={logoImgStyle}
              />
            </motion.div>

            <div className="order-1 flex w-full flex-col items-center gap-3 md:order-2 md:gap-5">
              <motion.h1
                className="mx-auto w-full max-w-full text-balance font-sans text-2xl font-semibold leading-snug tracking-tight sm:text-3xl sm:leading-snug md:text-5xl md:leading-snug lg:text-6xl lg:leading-[1.08]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2, ease: easeOut }}
              >
                <span
                  className="bg-gradient-to-l from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent md:hidden"
                  style={{
                    textShadow:
                      '0 0 20px rgba(168, 85, 247, 0.35), 0 0 40px rgba(34, 211, 238, 0.25)',
                  }}
                >
                  {headlineMobile}
                </span>
                <span
                  className="hidden bg-gradient-to-l from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent md:inline"
                  style={{
                    textShadow:
                      '0 0 20px rgba(168, 85, 247, 0.35), 0 0 40px rgba(34, 211, 238, 0.25)',
                  }}
                >
                  {headlineDesktop}
                </span>
              </motion.h1>

              <motion.div
                className="mx-auto w-full max-w-full text-pretty font-normal leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.35, ease: easeOut }}
              >
                <p className="bg-gradient-to-l from-cyan-200/78 via-purple-200/68 to-pink-300/72 bg-clip-text text-sm text-transparent sm:text-base md:hidden">
                  {sublineMobile}
                </p>
                <div className="hidden space-y-2 md:block md:text-xl md:leading-relaxed">
                  {sublinesDesktop.map((line) => (
                    <p
                      key={line}
                      className="bg-gradient-to-l from-cyan-200/78 via-purple-200/68 to-pink-300/72 bg-clip-text text-transparent"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="order-2 mt-4 flex w-full max-w-full flex-col items-center gap-3 md:order-3 md:mt-6 md:gap-3">
              <div className="group relative mx-auto w-full max-w-[300px] md:mx-0 md:w-auto md:max-w-none">
                <div
                  className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-l from-violet-500 via-fuchsia-500 to-cyan-400 opacity-40 blur-lg transition-[opacity,filter] duration-300 ease-out group-hover:opacity-95 group-hover:blur-[28px]"
                  aria-hidden
                />
                <MotionLink
                  to="/apply#contact"
                  className="relative flex min-h-[48px] w-full touch-manipulation items-center justify-center rounded-full bg-slate-950/80 px-6 py-3 text-base font-medium text-white no-underline ring-1 ring-white/10 backdrop-blur-sm transition-shadow duration-300 ease-out hover:ring-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400/80 active:opacity-95 md:inline-flex md:min-h-[48px] md:w-auto md:px-8 md:py-4 md:text-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1, boxShadow: ctaRestShadow }}
                  transition={{ duration: 0.5, delay: 0.5, ease: easeOut }}
                  whileHover={{
                    scale: 1.03,
                    y: -2,
                    boxShadow: ctaHoverShadow,
                    transition: { duration: 0.3, ease: easeOut },
                  }}
                >
                  <span
                    className="absolute inset-px rounded-full opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(139,92,246,0.25), rgba(236,72,153,0.2), rgba(34,211,238,0.25))',
                    }}
                    aria-hidden
                  />
                  <span className="relative">{ctaLabel}</span>
                </MotionLink>
              </div>

              <p className="text-pretty text-xs leading-relaxed text-slate-400 [text-shadow:0_1px_16px_rgba(2,6,23,0.45)] md:hidden">
                {urgencyMobile}
              </p>

              <motion.p
                className="hidden w-full max-w-full text-pretty text-xs leading-relaxed text-slate-400 [text-shadow:0_1px_16px_rgba(2,6,23,0.45)] sm:text-sm md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.58, ease: easeOut }}
              >
                {disclaimerDesktop.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
