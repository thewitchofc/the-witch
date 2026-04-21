import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { trackEvent } from '../lib/analytics'
import { primaryCtaInnerClass, primaryCtaOuterClass } from '../lib/primaryCtaClasses'
import { CosmicField } from './CosmicField'
import { useRevealIsVisible } from '../hooks/useRevealIsVisible'

const WITCH_SECTION_IO: IntersectionObserverInit = {
  root: null,
  rootMargin: '-48px 0px -12% 0px',
  threshold: 0.08,
}

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

const headline = 'אתרים שמביאים לך לקוחות, לא רק ביקורים.'

const sublines = [
  'מבנה, מהירות ומסרים שמובילים לפעולה אחת ברורה. בקוד מלא, בלי תבניות.',
] as const

const ctaLabel = 'שיחת התאמה חינם, בלי התחייבות'

const disclaimerDesktop = [
  'מתאימה לעסקים שמוכנים להשקיע בתוצאה, לא ב״מחיר הכי נמוך״.',
  'עד 4 פרויקטים בחודש, כדי לשמור על איכות וזמינות.',
] as const

/** טקסט לבן, glow לבן עדין + עומק קל כדי שיישאר קריא על רקע עמוס */
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

function unitRand(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

function witchFlightStyle(key: number): CSSProperties {
  const r = (n: number) => unitRand(key * 9973 + n)
  /* מחזור כולל 12–18s (טיסה + idle ב-keyframes) */
  const dur = 12 + r(1) * 6
  const startPct = -(6 + r(2) * 18)
  const endPct = 100 + r(3) * 12
  const bob = -(5 + r(4) * 12)

  const top0 = 10 + r(5) * 42
  const diagonal = r(6) < 0.78
  let top1 = diagonal
    ? top0 + (8 + r(7) * 14) * (r(8) < 0.5 ? -1 : 1)
    : top0 + (r(9) * 4 - 2)
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
  const sectionRef = useRef<HTMLElement | null>(null)
  const [witchFlying, setWitchFlying] = useState(false)

  const logoDesktopRevealRef = useRef<HTMLDivElement>(null)
  const logoMobileRevealRef = useRef<HTMLDivElement>(null)
  const headlineRevealRef = useRef<HTMLHeadingElement>(null)
  const sublineRevealRef = useRef<HTMLDivElement>(null)
  const ctaRevealRef = useRef<HTMLAnchorElement>(null)
  const disclaimerRevealRef = useRef<HTMLParagraphElement>(null)

  useRevealIsVisible(logoDesktopRevealRef)
  useRevealIsVisible(logoMobileRevealRef)
  useRevealIsVisible(headlineRevealRef)
  useRevealIsVisible(sublineRevealRef)
  useRevealIsVisible(ctaRevealRef)
  useRevealIsVisible(disclaimerRevealRef)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const obs = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setWitchFlying(true)
        obs.disconnect()
      }
    }, WITCH_SECTION_IO)

    obs.observe(section)
    return () => obs.disconnect()
  }, [])

  /** ללא onAnimationIteration, עדכון state בכל מחזור גרם לרינדורים חוזרים ולעומס ב-Lighthouse */
  const witchMotionStyle = useMemo(() => witchFlightStyle(0), [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className={
        stacked
          ? 'pointer-events-none relative isolate flex min-h-0 w-full flex-1 flex-col overflow-x-hidden overflow-y-visible bg-transparent pt-24 text-white'
          : 'pointer-events-none relative isolate flex min-h-[100svh] w-full scroll-mt-24 flex-col overflow-hidden bg-[#020617] pt-24 text-white supports-[min-height:100dvh]:min-h-[100dvh]'
      }
      dir="rtl"
      lang="he"
    >
      {showCosmicField ? <CosmicField /> : null}

      <img
        src="/witch.png"
        className={
          witchFlying ? 'witch-sprite witch-sprite--flying' : 'witch-sprite'
        }
        style={witchMotionStyle}
        alt=""
        aria-hidden
      />

      <div className="relative z-10 flex min-h-0 w-full flex-1 touch-manipulation flex-col items-center justify-center pb-[max(1rem,env(safe-area-inset-bottom,0px))] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:pl-[max(1.5rem,env(safe-area-inset-left,0px))] sm:pr-[max(1.5rem,env(safe-area-inset-right,0px))]">
        <div
          ref={logoDesktopRevealRef}
          className={
            stacked
              ? 'hero-reveal hero-reveal--from-top hero-reveal--duration-lg mb-0 mt-3 hidden w-full shrink-0 md:mb-4 md:mt-4 md:block'
              : 'hero-reveal hero-reveal--from-top hero-reveal--duration-lg mb-0 mt-3 hidden w-full shrink-0 md:mb-10 md:mt-4 md:block'
          }
          lang="en"
          dir="ltr"
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
        </div>

        <div
          className={
            stacked
              ? 'hero-content flex w-full max-w-full flex-col items-center justify-center gap-2 px-3 pt-6 pb-3 text-center md:max-w-4xl md:gap-5 md:px-4 md:py-5 lg:max-w-5xl'
              : 'hero-content flex w-full max-w-full flex-col items-center justify-center gap-5 px-4 pt-20 pb-10 text-center md:max-w-4xl md:gap-8 md:py-8 lg:max-w-5xl'
          }
        >
          <div
            ref={logoMobileRevealRef}
            className="hero-reveal hero-reveal--fade-only hero-reveal--duration-lg mt-3 block w-full shrink-0 md:hidden"
            dir="ltr"
            lang="en"
          >
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

          <h1
            ref={headlineRevealRef}
            className="hero-reveal hero-reveal--delay-1 mx-auto w-full max-w-[260px] text-balance font-sans text-2xl font-semibold leading-snug tracking-tight md:max-w-none md:text-5xl md:leading-snug lg:text-6xl lg:leading-[1.08]"
          >
            <span className="text-white md:hidden" style={heroHeadlineGlyphStyle}>
              {headline}
            </span>
            <span className="hidden text-white md:inline" style={heroHeadlineGlyphStyle}>
              {headline}
            </span>
          </h1>

          <div
            ref={sublineRevealRef}
            className="hero-reveal hero-reveal--fade-only hero-reveal--delay-2 mx-auto w-full max-w-[260px] text-pretty font-normal leading-relaxed md:max-w-none"
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
          </div>

          <div className="relative mx-auto mt-3 flex w-full max-w-[min(100%,320px)] flex-col items-center overflow-visible sm:max-w-[360px] md:mt-0 md:max-w-none md:w-fit">
            <Link
              ref={ctaRevealRef}
              to="/apply#contact"
              aria-label="שיחת התאמה חינם לפרויקט, מעבר לטופס יצירת קשר"
              className={`hero-cta-reveal pointer-events-auto z-10 ${primaryCtaOuterClass}`}
              onClick={() =>
                trackEvent('cta_click', {
                  cta_location: 'hero_primary',
                  link_url: '/apply#contact',
                })
              }
            >
              <span className={`${primaryCtaInnerClass} md:py-4 md:text-lg`}>
                <span className="md:hidden">שיחת התאמה חינם</span>
                <span className="hidden md:inline">{ctaLabel}</span>
              </span>
            </Link>
          </div>

          {!stacked ? (
            <p
              ref={disclaimerRevealRef}
              className="hero-reveal hero-reveal--fade-only hero-reveal--delay-4 hidden w-full max-w-full text-pretty text-xs leading-relaxed text-slate-300 [text-shadow:0_1px_16px_rgba(2,6,23,0.45)] sm:text-sm md:block"
            >
              {disclaimerDesktop.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}

/** רקע Spline לדף הבית, טעינה לפי בחירה (״הפעל אפקט״) */
export { HeroSpline } from './HeroSpline'
