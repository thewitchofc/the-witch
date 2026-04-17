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
      className="relative isolate flex min-h-[100svh] w-full scroll-mt-24 flex-col overflow-x-hidden bg-[#020617] pt-24 text-white supports-[min-height:100dvh]:min-h-[100dvh]"
      dir="rtl"
      lang="he"
    >
      <CosmicField />

      <div className="relative z-10 flex min-h-0 w-full flex-1 touch-manipulation flex-col items-center justify-center pb-[max(1rem,env(safe-area-inset-bottom,0px))] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:pl-[max(1.5rem,env(safe-area-inset-left,0px))] sm:pr-[max(1.5rem,env(safe-area-inset-right,0px))]">
        <motion.div
          className="mb-0 hidden w-full shrink-0 md:mb-10 md:block"
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
            className="mx-auto h-auto w-full max-w-[380px] object-contain select-none lg:max-w-[460px] xl:max-w-[520px]"
            style={logoImgStyle}
          />
        </motion.div>

        <div className="flex w-full max-w-full flex-col items-center justify-center gap-5 px-4 pt-20 pb-10 text-center md:max-w-4xl md:gap-8 md:py-8 lg:max-w-5xl">
          <div className="block w-full shrink-0 md:hidden" dir="ltr" lang="en">
            <img
              src="/the-witch-logo.png"
              alt="The Witch"
              width={1024}
              height={1024}
              decoding="async"
              className="mx-auto h-auto w-full max-w-[260px] object-contain select-none"
              style={logoImgStyle}
            />
          </div>

          <motion.h1
            className="mx-auto w-full max-w-[260px] text-balance font-sans text-2xl font-semibold leading-snug tracking-tight md:max-w-none md:text-5xl md:leading-snug lg:text-6xl lg:leading-[1.08]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: easeOut }}
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
            className="mx-auto w-full max-w-[260px] text-pretty font-normal leading-relaxed md:max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.22, ease: easeOut }}
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

          <div className="relative mx-auto mt-3 flex w-full max-w-[260px] justify-center overflow-visible md:mt-0 md:max-w-none">
            <div
              className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-r from-cyan-500 via-white/30 to-purple-500 opacity-50 blur-xl md:opacity-60 md:blur-2xl"
              aria-hidden
            />
            <MotionLink
              to="/apply#contact"
              className="relative z-10 flex min-h-[48px] w-full touch-manipulation items-center justify-center rounded-full border border-white/30 bg-slate-950/80 px-6 py-3 text-base font-medium text-white no-underline ring-0 backdrop-blur-sm transition-shadow duration-300 ease-out hover:border-white/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400/80 active:opacity-95 md:inline-flex md:min-h-[48px] md:w-auto md:border-transparent md:px-8 md:py-4 md:text-lg md:ring-1 md:ring-white/10 md:hover:ring-white/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, boxShadow: ctaRestShadow }}
              transition={{ duration: 0.5, delay: 0.35, ease: easeOut }}
              whileHover={{
                scale: 1.03,
                y: -2,
                boxShadow: ctaHoverShadow,
                transition: { duration: 0.3, ease: easeOut },
              }}
            >
              {ctaLabel}
            </MotionLink>
          </div>

          <motion.p
            className="hidden w-full max-w-full text-pretty text-xs leading-relaxed text-slate-400 [text-shadow:0_1px_16px_rgba(2,6,23,0.45)] sm:text-sm md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.5, ease: easeOut }}
          >
            {disclaimerDesktop.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
