import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { useLocation } from 'react-router-dom'
import { CustomLink } from './CustomLink'
import { trackEvent } from '../lib/analytics'
import { primaryCtaInnerClass, primaryCtaOuterClass } from '../lib/primaryCtaClasses'
import { CosmicField } from './CosmicField'
import { scrollIsolationDebug } from '../lib/scrollIsolationDebug'
import { useRevealIsVisible } from '../hooks/useRevealIsVisible'
import { useHeroScrollFade } from '../hooks/useHeroScrollFade'
import { useHeavyEffectsBlocked } from '../hooks/useHeavyEffectsBlocked'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useEffectsStage, useHeavyEffectsReady } from '../context/HeavyEffectsReadyContext'

const Logo3D = lazy(() =>
  import('./Logo3D').then((m) => ({ default: m.Logo3D })),
)

const WITCH_SECTION_IO: IntersectionObserverInit = {
  root: null,
  rootMargin: '-48px 0px -12% 0px',
  threshold: 0.08,
}

/** לוגו יחיד מתוך `public/logo.svg` (ללא רקע לבן בקובץ) */
const logoSrc = '/logo.svg'

const logoTransformBase = 'perspective(600px) rotateX(6deg) rotateY(-3deg)'

/** אותו מבנה פילטר בכל מצב — הדפדפן מחליף בין 0/1 בצורה חלקה, בלי re-render לכל פריים */
const LOGO_FILTER_SMOOTH = 'filter 0.7s cubic-bezier(0.33, 1, 0.32, 1)'

function buildLogoFilterStyle(hover: boolean): CSSProperties {
  const t = hover ? 1 : 0
  const b = 1.04 + 0.05 * t
  const c = 1.02 + 0.03 * t
  const w = 0.14 + 0.1 * t
  const v = 0.38 * t
  const vDeep = 0.14 * t
  return {
    filter: [
      `brightness(${b.toFixed(3)})`,
      `contrast(${c.toFixed(3)})`,
      `saturate(${(1 + 0.08 * t).toFixed(3)})`,
      `drop-shadow(0 0 18px rgba(255, 255, 255, ${w.toFixed(3)}))`,
      `drop-shadow(0 0 48px rgba(139, 92, 246, ${v.toFixed(3)}))`,
      `drop-shadow(0 0 80px rgba(49, 46, 129, ${vDeep.toFixed(3)}))`,
    ].join(' '),
    imageRendering: 'auto' as const,
  }
}

function buildLogoViewStyle(depthScale: number): CSSProperties {
  const s = Number.isFinite(depthScale) ? depthScale : 1.02
  return {
    transform: `${logoTransformBase} scale(${s.toFixed(4)})`,
    transformOrigin: 'center center',
  }
}

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
  const scrollFadeLayerRef = useRef<HTMLDivElement | null>(null)
  const [witchFlying, setWitchFlying] = useState(false)
  const [logoDepthScale, setLogoDepthScale] = useState(1.02)
  const [logoHover, setLogoHover] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const [enableLogo3D, setEnableLogo3D] = useState(false)
  const [logoCanvasUnlocked, setLogoCanvasUnlocked] = useState(false)
  const blockHeavy = useHeavyEffectsBlocked()
  const { pathname } = useLocation()
  const isHomeRoute = pathname === '/'

  const disclaimerRevealRef = useRef<HTMLParagraphElement>(null)

  useRevealIsVisible(disclaimerRevealRef)

  useHeroScrollFade(sectionRef, scrollFadeLayerRef)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (reducedMotion) return

    const update = () => {
      const top = section.getBoundingClientRect().top
      const t = Math.max(0, Math.min(1, -top / 260))
      setLogoDepthScale(1.02 - t * 0.14)
    }

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        update()
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  const logoFilterStyle = useMemo(
    () => buildLogoFilterStyle(logoHover),
    [logoHover],
  )

  const logoViewStyle = useMemo(
    () => buildLogoViewStyle(logoDepthScale),
    [logoDepthScale],
  )

  const logoImageStyle = useMemo((): CSSProperties => {
    /* רק filter — transform (עומק בגלילה) בלי transition כדי שיישאר מסונכרן ל־rAF */
    const trans = reducedMotion ? 'none' : LOGO_FILTER_SMOOTH
    return {
      ...logoFilterStyle,
      ...logoViewStyle,
      transition: trans,
    }
  }, [logoFilterStyle, logoViewStyle, reducedMotion])

  const desktopLogoImgClass = stacked
    ? 'mx-auto h-auto w-auto max-h-[min(28vh,172px)] object-contain object-center select-none md:max-h-[min(32vh,224px)] lg:max-h-[min(36vh,260px)]'
    : 'mx-auto h-auto w-auto max-h-[min(30vh,190px)] object-contain object-center select-none md:max-h-[min(36vh,240px)] lg:max-h-[min(40vh,276px)] xl:max-h-[min(44vh,310px)]'

  const desktopLogoShellClass = stacked
    ? 'relative mx-auto block aspect-[169/89] w-full max-h-[min(28vh,172px)] select-none md:max-h-[min(32vh,224px)] lg:max-h-[min(36vh,260px)]'
    : 'relative mx-auto block aspect-[169/89] w-full max-h-[min(30vh,190px)] select-none md:max-h-[min(36vh,240px)] lg:max-h-[min(40vh,276px)] xl:max-h-[min(44vh,310px)]'

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

  const heavyEffectsReady = useHeavyEffectsReady()
  const effectsStage = useEffectsStage()

  const showLogo3D =
    enableLogo3D &&
    !blockHeavy &&
    isHomeRoute &&
    scrollIsolationDebug.enableLogo3D

  const showLogo3DCanvas = showLogo3D && heavyEffectsReady && logoCanvasUnlocked

  const effectsStageRef = useRef(effectsStage)
  effectsStageRef.current = effectsStage

  useEffect(() => {
    if (!showLogo3D || !heavyEffectsReady) {
      setLogoCanvasUnlocked(false)
      return
    }

    let cancelled = false
    const unlock = () => {
      if (!cancelled) setLogoCanvasUnlocked(true)
    }

    let scheduled: ReturnType<typeof setTimeout> | undefined
    if (effectsStage >= 3) {
      scheduled = window.setTimeout(unlock, 200)
    }

    if (effectsStage >= 2 && (window.scrollY > 16 || document.documentElement.scrollTop > 16)) {
      unlock()
    }

    const onInteract = () => {
      if (effectsStageRef.current >= 2) unlock()
    }

    window.addEventListener('scroll', onInteract, { passive: true })
    window.addEventListener('pointerdown', onInteract)
    window.addEventListener('keydown', onInteract)

    return () => {
      cancelled = true
      if (scheduled !== undefined) window.clearTimeout(scheduled)
      window.removeEventListener('scroll', onInteract)
      window.removeEventListener('pointerdown', onInteract)
      window.removeEventListener('keydown', onInteract)
    }
  }, [showLogo3D, heavyEffectsReady, effectsStage])

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
      <div
        ref={scrollFadeLayerRef}
        className="hero-scroll-fade-layer relative flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden"
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
        />

        <div className="relative z-10 flex min-h-0 w-full min-w-0 max-w-full flex-1 touch-manipulation flex-col items-center justify-center pb-[max(1rem,env(safe-area-inset-bottom,0px))] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:pl-[max(1.5rem,env(safe-area-inset-left,0px))] sm:pr-[max(1.5rem,env(safe-area-inset-right,0px))]">
          <div
            className={
              stacked
                ? 'pointer-events-auto hero-reveal--lcp mb-0 mt-2 hidden w-full min-w-0 max-w-full shrink-0 pt-6 [overflow:visible] md:mb-4 md:mt-2 md:block md:pt-7'
                : 'pointer-events-auto hero-reveal--lcp mb-0 mt-2 hidden w-full min-w-0 max-w-full shrink-0 pt-6 [overflow:visible] md:mb-10 md:mt-2 md:block md:pt-7'
            }
            lang="en"
            dir="ltr"
          >
            {showLogo3DCanvas ? (
              <Suspense
                fallback={
                  <div
                    className={desktopLogoShellClass}
                    style={logoImageStyle}
                    onPointerEnter={() => setLogoHover(true)}
                    onPointerLeave={() => setLogoHover(false)}
                  >
                    <img
                      src={logoSrc}
                      alt="The Witch logo"
                      width={1690}
                      height={890}
                      decoding="async"
                      fetchPriority="high"
                      className={desktopLogoImgClass}
                    />
                  </div>
                }
              >
                <div
                  className={desktopLogoShellClass}
                  style={logoImageStyle}
                  onPointerEnter={() => setLogoHover(true)}
                  onPointerLeave={() => setLogoHover(false)}
                >
                  <Logo3D className="h-full w-full" />
                </div>
              </Suspense>
            ) : showLogo3D ? (
              <div
                className={desktopLogoShellClass}
                style={logoImageStyle}
                onPointerEnter={() => setLogoHover(true)}
                onPointerLeave={() => setLogoHover(false)}
                onPointerDown={() => {
                  if (effectsStage >= 2) setLogoCanvasUnlocked(true)
                }}
              >
                <img
                  src={logoSrc}
                  alt="The Witch logo"
                  width={1690}
                  height={890}
                  decoding="async"
                  fetchPriority="high"
                  className={`${desktopLogoImgClass} h-full w-full`}
                />
              </div>
            ) : !blockHeavy ? (
              <button
                type="button"
                className="block w-full cursor-pointer border-0 bg-transparent p-0"
                aria-label="הצג לוגו תלת־ממד"
                onClick={() => {
                  setEnableLogo3D(true)
                  trackEvent('logo_3d_opt_in', {
                    surface: 'hero_desktop',
                    layout: stacked ? 'stacked' : 'default',
                  })
                }}
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
                  onPointerEnter={() => setLogoHover(true)}
                  onPointerLeave={() => setLogoHover(false)}
                />
              </button>
            ) : (
              <img
                src={logoSrc}
                alt="The Witch logo"
                width={1690}
                height={890}
                decoding="async"
                fetchPriority="high"
                className={desktopLogoImgClass}
                style={logoImageStyle}
                onPointerEnter={() => setLogoHover(true)}
                onPointerLeave={() => setLogoHover(false)}
              />
            )}
          </div>

          <div
            className={
              stacked
                ? 'hero-content flex w-full min-w-0 max-w-full flex-col items-center justify-center gap-2 break-words px-3 pt-6 pb-3 text-center md:max-w-4xl md:gap-5 md:px-4 md:py-5 lg:max-w-5xl'
                : 'hero-content flex w-full min-w-0 max-w-full flex-col items-center justify-center gap-5 break-words px-4 pt-20 pb-10 text-center md:max-w-4xl md:gap-8 md:py-8 lg:max-w-5xl'
            }
          >
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
                onPointerEnter={() => setLogoHover(true)}
                onPointerLeave={() => setLogoHover(false)}
              />
            </div>

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
    </section>
  )
}

/** רקע Spline לדף הבית, טעינה לפי בחירה (״הפעל אפקט״) */
export { HeroSpline } from './HeroSpline'
