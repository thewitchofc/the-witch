import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { CustomLink } from './CustomLink'
import { trackEvent } from '../lib/analytics'
import { primaryCtaInnerClass, primaryCtaOuterClass } from '../lib/primaryCtaClasses'
import { CosmicField } from './CosmicField'
import { useRevealIsVisible } from '../hooks/useRevealIsVisible'
import { useHeroScrollFade } from '../hooks/useHeroScrollFade'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const WITCH_SECTION_IO: IntersectionObserverInit = {
  root: null,
  rootMargin: '-48px 0px -12% 0px',
  threshold: 0.08,
}

/** לוגו יחיד מתוך `public/logo.svg` (ללא רקע לבן בקובץ) */
const logoSrc = '/logo.svg'

/** לוגו מונוכרומטי לבן (SVG עם צללים אפורים) + זוהר לבן — קבוע, בלי הובר/לחיצה */
function buildLogoFilterStyle(): CSSProperties {
  return {
    filter: [
      'brightness(0)',
      'invert(1)',
      'drop-shadow(0 0 12px rgba(255, 255, 255, 0.32))',
      'drop-shadow(0 0 36px rgba(248, 250, 252, 0.14))',
    ].join(' '),
    imageRendering: 'auto' as const,
  }
}

function buildLogoViewStyle(): CSSProperties {
  return {
    transform: 'none',
    transformOrigin: 'center center',
  }
}

const headline = 'אתרים שמביאים לך לקוחות, לא רק ביקורים.'

const sublines = [
  'מבנה, מהירות ומסרים שמובילים לפעולה אחת ברורה. בקוד מלא, בלי תבניות.',
] as const

const ctaLabel = 'שיחת התאמה חינם, בלי התחייבות'

const disclaimerDesktop = [
  'מתאים לעסקים שמוכנים להשקיע בתוצאה, לא ב״מחיר הכי נמוך״.',
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

/** קצוות מסך (יחסית ל־Hero): שמאל / ימין / עליון / תחתון */
type WitchEdge = 0 | 1 | 2 | 3

function oppositeWitchEdge(e: WitchEdge): WitchEdge {
  if (e === 0) return 1
  if (e === 1) return 0
  if (e === 2) return 3
  return 2
}

/** נקודה מחוץ למסגרת על קצה נתון — אקראית לאורך הקצה */
function witchPointOnEdge(
  edge: WitchEdge,
  r: (n: number) => number,
  salt: number,
): { lx: number; ty: number } {
  const along = 0.06 + r(salt) * 0.88
  const along2 = 0.05 + r(salt + 17) * 0.9
  if (edge === 0) {
    return { lx: -0.22 - r(salt + 1) * 0.14, ty: along }
  }
  if (edge === 1) {
    return { lx: 1.1 + r(salt + 2) * 0.18, ty: along2 }
  }
  if (edge === 2) {
    return { lx: along, ty: -0.16 - r(salt + 3) * 0.12 }
  }
  return { lx: along2, ty: 1.08 + r(salt + 4) * 0.14 }
}

function pct(n: number): string {
  return `${(n * 100).toFixed(2)}%`
}

/**
 * טיסה מקצה לקצה מנוגד (חוצה את כל ה־Hero), זווית אקראית דרך נקודת אמצע.
 * הדמות מניחה כיוון לימין ב־asset — scaleX כשהטיסה שולית לשמאל כדי שלא תיראה ״אחורה״.
 */
function witchFlightStyle(epoch: number): CSSProperties {
  const r = (n: number) => unitRand(epoch * 9973 + n)

  const entry: WitchEdge = Math.floor(r(1) * 4) as WitchEdge
  const exit = oppositeWitchEdge(entry)
  const start = witchPointOnEdge(entry, r, 10)
  const end = witchPointOnEdge(exit, r, 60)

  const dx = end.lx - start.lx
  const dy = end.ty - start.ty
  const len = Math.hypot(dx, dy) || 1
  const px = -dy / len
  const py = dx / len
  const arc = (r(88) - 0.5) * 0.34
  const midL = (start.lx + end.lx) / 2 + px * arc
  const midT = (start.ty + end.ty) / 2 + py * arc
  const midLClamped = Math.max(-0.28, Math.min(1.32, midL))
  const midTClamped = Math.max(-0.22, Math.min(1.28, midT))

  const horizDominant = Math.abs(dx) >= Math.abs(dy) * 0.22
  const wFlip = horizDominant ? (dx >= 0 ? 1 : -1) : 1

  const dur = 12 + r(2) * 8
  const bob = -(5 + r(3) * 12)

  return {
    ['--w-left-0' as string]: pct(start.lx),
    ['--w-top-0' as string]: pct(start.ty),
    ['--w-left-mid' as string]: pct(midLClamped),
    ['--w-top-mid' as string]: pct(midTClamped),
    ['--w-left-1' as string]: pct(end.lx),
    ['--w-top-1' as string]: pct(end.ty),
    ['--w-bob' as string]: `${bob}px`,
    ['--w-flip' as string]: String(wFlip),
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
  const scrollFadeBackdropRef = useRef<HTMLDivElement | null>(null)
  const scrollFadeForegroundRef = useRef<HTMLDivElement | null>(null)
  const [witchFlying, setWitchFlying] = useState(false)
  /** מסלול חדש בכל סיבוב אנימציה — מיקומי התחלה/סיום אקראיים */
  const [witchPathEpoch, setWitchPathEpoch] = useState(0)
  const reducedMotion = usePrefersReducedMotion()

  const disclaimerRevealRef = useRef<HTMLParagraphElement>(null)

  useRevealIsVisible(disclaimerRevealRef)

  useHeroScrollFade(sectionRef, scrollFadeBackdropRef, scrollFadeForegroundRef)

  const logoViewStyle = useMemo(() => buildLogoViewStyle(), [])

  const logoImageStyle = useMemo((): CSSProperties => {
    return {
      ...buildLogoFilterStyle(),
      ...logoViewStyle,
    }
  }, [logoViewStyle])

  const desktopLogoImgClass = stacked
    ? 'mx-auto h-auto w-auto max-h-[min(28vh,172px)] object-contain object-center select-none md:max-h-[min(32vh,224px)] lg:max-h-[min(36vh,260px)]'
    : 'mx-auto h-auto w-auto max-h-[min(30vh,190px)] object-contain object-center select-none md:max-h-[min(36vh,240px)] lg:max-h-[min(40vh,276px)] xl:max-h-[min(44vh,310px)]'

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

  const witchMotionStyle = useMemo(() => witchFlightStyle(witchPathEpoch), [witchPathEpoch])

  return (
    <section
      ref={sectionRef}
      id="home"
      className={
        stacked
          ? 'pointer-events-none relative isolate flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden bg-transparent pt-24 text-white'
          : 'pointer-events-none relative isolate flex min-h-[100svh] w-full min-w-0 scroll-mt-24 flex-col overflow-hidden bg-[#020617] pt-24 text-white supports-[min-height:100dvh]:min-h-[100dvh]'
      }
      dir="rtl"
      lang="he"
    >
      <div className="relative flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden">
        <div
          ref={scrollFadeBackdropRef}
          className="hero-scroll-fade-layer pointer-events-none absolute inset-0 z-0 flex flex-col overflow-hidden"
        >
          {showCosmicField ? <CosmicField /> : null}

          <img
            src="/witch.webp"
            width={400}
            height={400}
            className={
              witchFlying ? 'witch-sprite witch-sprite--flying' : 'witch-sprite'
            }
            style={witchMotionStyle}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            onAnimationIteration={
              reducedMotion ? undefined : () => setWitchPathEpoch((n) => n + 1)
            }
          />
        </div>

        <div className="relative z-10 flex min-h-0 w-full min-w-0 max-w-full flex-1 touch-manipulation flex-col items-center justify-center pb-[max(1rem,env(safe-area-inset-bottom,0px))] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:pl-[max(1.5rem,env(safe-area-inset-left,0px))] sm:pr-[max(1.5rem,env(safe-area-inset-right,0px))]">
          <div
            className={
              stacked
                ? 'flex w-full min-w-0 max-w-full flex-col items-center gap-2 break-words px-3 pt-6 pb-3 text-center md:max-w-4xl md:gap-5 md:px-4 md:py-5 lg:max-w-5xl'
                : 'flex w-full min-w-0 max-w-full flex-col items-center gap-5 break-words px-4 pt-20 pb-10 text-center md:max-w-4xl md:gap-8 md:py-8 lg:max-w-5xl'
            }
          >
            <div
              className={
                stacked
                  ? 'pointer-events-auto hero-reveal--lcp mb-0 mt-2 hidden w-full min-w-0 max-w-full shrink-0 pt-6 [overflow:visible] md:mb-4 md:mt-2 md:block md:pt-7'
                  : 'pointer-events-auto hero-reveal--lcp mb-0 mt-2 hidden w-full min-w-0 max-w-full shrink-0 pt-6 [overflow:visible] md:mb-10 md:mt-2 md:block md:pt-7'
              }
              lang="en"
              dir="ltr"
            >
              <img
                src={logoSrc}
                alt="The Witch logo"
                width={1690}
                height={890}
                decoding="async"
                fetchPriority="high"
                className={desktopLogoImgClass}
                style={logoImageStyle}
              />
            </div>

            <div
              className="pointer-events-auto hero-reveal--lcp mt-2 block w-full min-w-0 max-w-full shrink-0 pt-5 [overflow:visible] md:hidden"
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
                style={logoImageStyle}
              />
            </div>

            <div
              ref={scrollFadeForegroundRef}
              className={
                stacked
                  ? 'hero-scroll-fade-layer hero-content flex w-full min-w-0 max-w-full flex-col items-center justify-center gap-2 md:gap-5'
                  : 'hero-scroll-fade-layer hero-content flex w-full min-w-0 max-w-full flex-col items-center justify-center gap-5 md:gap-8'
              }
            >
            <h1 className="hero-reveal--lcp mx-auto w-full min-w-0 max-w-[260px] text-balance break-words font-sans text-2xl font-semibold leading-snug tracking-tight md:max-w-none md:text-5xl md:leading-snug lg:text-6xl lg:leading-[1.08]">
              <span className="text-white md:hidden" style={heroHeadlineGlyphStyle}>
                {headline}
              </span>
              <span className="hidden text-white md:inline" style={heroHeadlineGlyphStyle}>
                {headline}
              </span>
            </h1>

            <div className="hero-reveal--lcp mx-auto w-full min-w-0 max-w-[260px] text-pretty break-words font-normal leading-relaxed md:max-w-none">
              <div className="space-y-2 md:hidden">
                {sublines.map((line) => (
                  <p
                    key={line}
                    className="min-w-0 max-w-full break-words text-sm text-white/95 sm:text-base"
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
                    className="min-w-0 max-w-full break-words text-white/95"
                    style={heroSublineGlyphStyle}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="relative mx-auto mt-3 flex w-full min-w-0 max-w-[min(100%,320px)] flex-col items-center overflow-visible sm:max-w-[360px] md:mt-0 md:max-w-none md:w-fit">
              <CustomLink
                to="/apply#contact"
                aria-label="שיחת התאמה חינם לפרויקט, מעבר לטופס יצירת קשר"
                className={`hero-cta-reveal--lcp pointer-events-auto z-10 ${primaryCtaOuterClass}`}
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
              </CustomLink>
            </div>

            {!stacked ? (
              <p
                ref={disclaimerRevealRef}
                className="hero-reveal hero-reveal--fade-only hero-reveal--delay-4 hidden w-full min-w-0 max-w-full text-pretty break-words text-xs leading-relaxed text-slate-300 [text-shadow:0_1px_16px_rgba(2,6,23,0.45)] sm:text-sm md:block"
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
        </div>
      </div>
    </section>
  )
}

/** רקע Spline לדף הבית, טעינה לפי בחירה (״הפעל אפקט״) */
export { HeroSpline } from './HeroSpline'
