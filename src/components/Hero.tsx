import { motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { trackEvent } from '../lib/analytics'
import { CosmicField } from './CosmicField'

const MotionLink = motion(Link)

/** לוגו יחיד מתוך `public/logo.svg` (ללא רקע לבן בקובץ) */
const logoSrc = '/logo.svg'

const logoImgStyle = {
  filter: [
    'drop-shadow(0 0 18px rgba(168, 85, 247, 0.55))',
    'drop-shadow(0 0 36px rgba(139, 92, 246, 0.4))',
    'drop-shadow(0 0 56px rgba(168, 85, 247, 0.22))',
    'drop-shadow(0 0 22px rgba(34, 211, 238, 0.45))',
    'drop-shadow(0 0 44px rgba(34, 211, 238, 0.28))',
    'drop-shadow(0 0 20px rgba(244, 114, 182, 0.32))',
  ].join(' '),
} as CSSProperties

const headline = 'אתרים שמביאים לך לקוחות.'

const sublines = ['פחות רעש, יותר תוצאות.'] as const

const ctaLabel = 'בדיקת התאמה לפרויקט'

const disclaimerDesktop = [
  'עובדת רק עם עסקים שמוכנים להשקיע בתוצאה.',
  'הגבלה ל־4 פרויקטים בחודש.',
] as const

const easeOut = 'easeOut' as const

const ctaRestShadow =
  '0 2px 16px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 92, 246, 0.22), 0 0 28px rgba(34, 211, 238, 0.1)'
const ctaHoverShadow =
  '0 8px 28px rgba(0, 0, 0, 0.45), 0 0 28px rgba(167, 139, 250, 0.35), 0 0 40px rgba(34, 211, 238, 0.16)'

/** טקסט לבן — glow לבן עדין + עומק קל כדי שיישאר קריא על רקע עמוס */
const heroHeadlineGlyphStyle = {
  WebkitTextStroke: '0.35px rgba(248, 250, 252, 0.22)',
  paintOrder: 'stroke fill',
  textShadow: [
    '0 0 1px rgba(255, 255, 255, 0.5)',
    '0 0 14px rgba(255, 255, 255, 0.32)',
    '0 0 32px rgba(248, 250, 252, 0.2)',
    '0 0 52px rgba(241, 245, 249, 0.12)',
    '0 2px 14px rgba(2, 6, 23, 0.45)',
    '0 1px 0 rgba(2, 6, 23, 0.2)',
  ].join(', '),
} as const satisfies CSSProperties

const heroSublineGlyphStyle = {
  WebkitTextStroke: '0.28px rgba(248, 250, 252, 0.18)',
  paintOrder: 'stroke fill',
  textShadow: [
    '0 0 1px rgba(255, 255, 255, 0.42)',
    '0 0 12px rgba(255, 255, 255, 0.26)',
    '0 0 28px rgba(248, 250, 252, 0.16)',
    '0 2px 10px rgba(2, 6, 23, 0.4)',
  ].join(', '),
} as const satisfies CSSProperties

type HeroLayout = 'default' | 'stacked'

function randomWitchFlight(): CSSProperties {
  const dur = 18 + Math.random() * 16
  const startPct = -(10 + Math.random() * 28)
  const endPct = 100 + Math.random() * 22
  const bob = -(10 + Math.random() * 26)

  const top0 = 10 + Math.random() * 42
  const diagonal = Math.random() < 0.78
  let top1 = diagonal
    ? top0 + (14 + Math.random() * 26) * (Math.random() < 0.5 ? -1 : 1)
    : top0 + (Math.random() * 5 - 2.5)
  top1 = Math.max(8, Math.min(58, top1))
  if (diagonal && Math.abs(top1 - top0) < 8) {
    top1 = top0 + (top1 >= top0 ? 10 : -10)
    top1 = Math.max(8, Math.min(58, top1))
  }

  return {
    ['--w-left-0' as string]: `${startPct}%`,
    ['--w-left-1' as string]: `${endPct}%`,
    ['--w-top-0' as string]: `${top0}%`,
    ['--w-top-1' as string]: `${top1}%`,
    ['--w-bob' as string]: `${bob}px`,
    ['--witch-dur' as string]: `${dur}s`,
  } as CSSProperties
}

export function Hero({
  layout = 'default',
  showCosmicField = true,
}: {
  layout?: HeroLayout
  /** כש־false, הרקע הקוסמי מגיע מההורה (למשל דף הבית על כל המסך) */
  showCosmicField?: boolean
}) {
  const stacked = layout === 'stacked'

  const [witchFlight, setWitchFlight] = useState(() => ({
    key: 0,
    style: randomWitchFlight(),
  }))

  const onWitchLap = useCallback(() => {
    setWitchFlight((prev) => ({
      key: prev.key + 1,
      style: randomWitchFlight(),
    }))
  }, [])

  return (
    <section
      id="home"
      className={
        stacked
          ? 'pointer-events-none relative isolate flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-transparent pt-24 text-white'
          : 'pointer-events-none relative isolate flex min-h-[100svh] w-full scroll-mt-24 flex-col overflow-hidden bg-[#020617] pt-24 text-white supports-[min-height:100dvh]:min-h-[100dvh]'
      }
      dir="rtl"
      lang="he"
    >
      {showCosmicField ? <CosmicField /> : null}

      <img
        key={witchFlight.key}
        src="/witch.png"
        className="witch-animation"
        style={witchFlight.style}
        alt=""
        aria-hidden
        onAnimationIteration={onWitchLap}
      />

      <div className="relative z-10 flex min-h-0 w-full flex-1 touch-manipulation flex-col items-center justify-center pb-[max(1rem,env(safe-area-inset-bottom,0px))] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:pl-[max(1.5rem,env(safe-area-inset-left,0px))] sm:pr-[max(1.5rem,env(safe-area-inset-right,0px))]">
        <motion.div
          className={
            stacked
              ? 'mb-0 mt-3 hidden w-full shrink-0 md:mb-4 md:mt-4 md:block'
              : 'mb-0 mt-3 hidden w-full shrink-0 md:mb-10 md:mt-4 md:block'
          }
          lang="en"
          dir="ltr"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <img
            src={logoSrc}
            alt="The Witch"
            width={1690}
            height={890}
            decoding="async"
            fetchPriority="high"
            className={
              stacked
                ? 'mx-auto h-auto w-auto max-h-[min(28vh,172px)] object-contain object-center select-none md:max-h-[min(32vh,224px)] lg:max-h-[min(36vh,260px)]'
                : 'mx-auto h-auto w-auto max-h-[min(30vh,190px)] object-contain object-center select-none md:max-h-[min(36vh,240px)] lg:max-h-[min(40vh,276px)] xl:max-h-[min(44vh,310px)]'
            }
            style={logoImgStyle}
          />
        </motion.div>

        <div
          className={
            stacked
              ? 'hero-content flex w-full max-w-full flex-col items-center justify-center gap-2 px-3 pt-6 pb-3 text-center md:max-w-4xl md:gap-5 md:px-4 md:py-5 lg:max-w-5xl'
              : 'hero-content flex w-full max-w-full flex-col items-center justify-center gap-5 px-4 pt-20 pb-10 text-center md:max-w-4xl md:gap-8 md:py-8 lg:max-w-5xl'
          }
        >
          <div className="mt-3 block w-full shrink-0 md:hidden" dir="ltr" lang="en">
            <img
              src={logoSrc}
              alt="The Witch"
              width={1690}
              height={890}
              decoding="async"
              className={
                stacked
                  ? 'mx-auto h-auto w-auto max-h-[min(25vh,148px)] object-contain object-center select-none'
                  : 'mx-auto h-auto w-auto max-h-[min(27vh,158px)] object-contain object-center select-none sm:max-h-[min(30vh,176px)]'
              }
              style={logoImgStyle}
            />
          </div>

          <motion.h1
            className="mx-auto w-full max-w-[260px] text-balance font-sans text-2xl font-semibold leading-snug tracking-tight md:max-w-none md:text-5xl md:leading-snug lg:text-6xl lg:leading-[1.08]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: easeOut }}
          >
            <span className="text-white md:hidden" style={heroHeadlineGlyphStyle}>
              {headline}
            </span>
            <span className="hidden text-white md:inline" style={heroHeadlineGlyphStyle}>
              {headline}
            </span>
          </motion.h1>

          <motion.div
            className="mx-auto w-full max-w-[260px] text-pretty font-normal leading-relaxed md:max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.22, ease: easeOut }}
          >
            <div className="space-y-2 md:hidden">
              {sublines.map((line) => (
                <p
                  key={line}
                  className="text-sm text-white/95 sm:text-base"
                  style={heroSublineGlyphStyle}
                >
                  {line}
                </p>
              ))}
            </div>
            <div className="hidden space-y-2 md:block md:text-xl md:leading-relaxed">
              {sublines.map((line) => (
                <p
                  key={line}
                  className="text-white/95"
                  style={heroSublineGlyphStyle}
                >
                  {line}
                </p>
              ))}
            </div>
          </motion.div>

          <div className="relative mx-auto mt-3 flex w-full max-w-[260px] justify-center overflow-visible md:mt-0 md:w-fit md:max-w-none">
            <MotionLink
              to="/apply#contact"
              aria-label="בדיקת התאמה לפרויקט — מעבר לטופס יצירת קשר"
              className="pointer-events-auto group relative z-10 flex w-full min-w-0 touch-manipulation rounded-full bg-gradient-to-l from-cyan-400 via-violet-500 to-fuchsia-500 p-[1.5px] no-underline shadow-[0_0_1px_rgba(255,255,255,0.12)] transition-shadow duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400/80 active:opacity-95 md:inline-flex md:w-auto"
              onClick={() =>
                trackEvent('cta_click', {
                  cta_location: 'hero_primary',
                  link_url: '/apply#contact',
                })
              }
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
              <span className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-gradient-to-b from-slate-900/98 via-slate-950/98 to-slate-950 px-6 py-3 text-center text-base font-medium text-white shadow-inner shadow-black/40 ring-1 ring-inset ring-white/12 backdrop-blur-md transition-[background-color,box-shadow,ring-color] duration-300 ease-out group-hover:from-slate-900/92 group-hover:via-slate-950 group-hover:to-slate-950 group-hover:ring-white/22 md:min-h-[48px] md:w-auto md:px-8 md:py-4 md:text-lg">
                {ctaLabel}
              </span>
            </MotionLink>
          </div>

          {!stacked ? (
            <motion.p
              className="hidden w-full max-w-full text-pretty text-xs leading-relaxed text-slate-300 [text-shadow:0_1px_16px_rgba(2,6,23,0.45)] sm:text-sm md:block"
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
          ) : null}
        </div>
      </div>
    </section>
  )
}
