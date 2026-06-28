import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion'
import { useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import {
  GOOGLE_BUSINESS_MAPS_URL,
  GOOGLE_BUSINESS_RATING,
  GOOGLE_BUSINESS_REVIEW_URL,
  GOOGLE_REVIEWS,
  type GoogleReview,
} from '../data/googleReviews'

const MARQUEE_SPEED_PX_PER_SEC = 48
const MAX_SEGMENT_EXPANSIONS = 32
/** רווח אחיד בין כל כרטיסי המסילה */
const MARQUEE_TRACK_GAP = 'gap-6 md:gap-8'

const cardClass =
  'flex-[0_0_auto] flex h-[380px] w-[min(88vw,20rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-right ring-1 ring-white/[0.06] backdrop-blur-md md:h-[420px] md:w-[24rem] md:p-5'

function duplicateTwice<T>(items: readonly T[]): T[] {
  return [...items, ...items]
}

function GoogleGIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} מתוך 5 כוכבים`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`text-sm leading-none ${i < rating ? 'text-amber-300' : 'text-slate-600'}`}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  )
}

function formatAuthorShort(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length <= 1) return fullName
  return `${parts[0].charAt(0)}. ${parts[parts.length - 1]}`
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <article className={cardClass} dir="rtl" lang="he">
      <div className="mb-3 flex shrink-0 items-center justify-between gap-2">
        <StarRow rating={review.rating} />
        <GoogleGIcon />
      </div>
      <blockquote
        className="min-h-0 flex-1 text-pretty text-sm leading-relaxed text-slate-300 line-clamp-5 md:text-[15px] md:leading-relaxed md:line-clamp-6"
        title={review.text}
      >
        {review.text}
      </blockquote>
      <footer className="mt-3 shrink-0 border-t border-white/[0.06] pt-3 text-xs">
        <cite className="not-italic font-medium text-slate-200" title={review.author}>
          {formatAuthorShort(review.author)}
        </cite>
      </footer>
    </article>
  )
}

function ProfileCtaCard({
  title,
  body,
  href,
  cta,
  ariaLabel,
}: {
  title: string
  body: string
  href: string
  cta: string
  ariaLabel: string
}) {
  return (
    <article className={cardClass} dir="rtl" lang="he">
      <div className="mb-3 flex shrink-0 items-center justify-between gap-2">
        <StarRow rating={GOOGLE_BUSINESS_RATING} />
        <GoogleGIcon />
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        <h4 className="shrink-0 text-sm font-semibold text-white md:text-base">{title}</h4>
        <p
          className="mt-2 min-h-0 flex-1 text-sm leading-relaxed text-slate-400 line-clamp-4 md:line-clamp-5"
          title={body}
        >
          {body}
        </p>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className="mt-3 inline-flex min-h-[44px] shrink-0 items-center text-sm font-medium text-cyan-200 underline-offset-2 transition hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
      >
        {cta}
      </a>
    </article>
  )
}

const FALLBACK_CTA_CARDS = [
  {
    title: 'THE WITCH ב-Google Business',
    body: `דירוג ${GOOGLE_BUSINESS_RATING.toFixed(1)} כוכבים · מעצב/ת אתרים · thewitch.co.il`,
    href: GOOGLE_BUSINESS_MAPS_URL,
    cta: 'לפרופיל ב-Google Maps',
    ariaLabel: 'THE WITCH ב-Google Maps (נפתח בחלון חדש)',
  },
  {
    title: 'עבדת איתי על אתר?',
    body: 'ביקורת קצרה ב-Google עוזרת לעסקים אחרים לבחור בביטחון.',
    href: GOOGLE_BUSINESS_REVIEW_URL,
    cta: 'להשאיר ביקורת',
    ariaLabel: 'השארת ביקורת ב-Google Business (נפתח בחלון חדש)',
  },
  {
    title: 'שקיפות ואמון',
    body: 'ביקורות אמיתיות מ-Google מוצגות כאן ברגע שיתווספו לפרופיל.',
    href: GOOGLE_BUSINESS_MAPS_URL,
    cta: 'לצפייה בפרופיל',
    ariaLabel: 'צפייה בפרופיל Google Business (נפתח בחלון חדש)',
  },
] as const

type CtaCard = (typeof FALLBACK_CTA_CARDS)[number]
type MarqueeItem = GoogleReview | CtaCard

function MarqueeCards({
  items,
  hasReviews,
  keyPrefix,
  loopPointRef,
  duplicate = false,
}: {
  items: readonly MarqueeItem[]
  hasReviews: boolean
  keyPrefix: string
  loopPointRef?: RefObject<HTMLDivElement | null>
  duplicate?: boolean
}) {
  const hiddenProps = duplicate ? ({ 'aria-hidden': true } as const) : {}

  if (hasReviews) {
    return (items as readonly GoogleReview[]).map((review, index) => {
      const card = <ReviewCard review={review} />
      if (loopPointRef && index === 0) {
        return (
          <div
            key={`${keyPrefix}-loop-${review.author}`}
            ref={loopPointRef}
            className="flex-[0_0_auto]"
            {...hiddenProps}
          >
            {card}
          </div>
        )
      }
      return (
        <div key={`${keyPrefix}-${review.author}-${index}`} className="flex-[0_0_auto]" {...hiddenProps}>
          {card}
        </div>
      )
    })
  }

  return (items as readonly CtaCard[]).map((card, index) => {
    const cta = <ProfileCtaCard {...card} />
    if (loopPointRef && index === 0) {
      return (
        <div
          key={`${keyPrefix}-loop-${card.title}`}
          ref={loopPointRef}
          className="flex-[0_0_auto]"
          {...hiddenProps}
        >
          {cta}
        </div>
      )
    }
    return (
      <div key={`${keyPrefix}-${card.title}-${index}`} className="flex-[0_0_auto]" {...hiddenProps}>
        {cta}
      </div>
    )
  })
}

function useA11yReduceMotion(): boolean {
  const prefersReduced = usePrefersReducedMotion()
  const [widgetReduced, setWidgetReduced] = useState(false)

  useLayoutEffect(() => {
    const root = document.documentElement
    const sync = () => setWidgetReduced(root.hasAttribute('data-a11y-reduce-motion'))
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(root, { attributes: true, attributeFilter: ['data-a11y-reduce-motion'] })
    return () => observer.disconnect()
  }, [])

  return prefersReduced || widgetReduced
}

function InfiniteMarqueeEngine({
  baseItems,
  hasReviews,
}: {
  baseItems: readonly MarqueeItem[]
  hasReviews: boolean
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const loopPointRef = useRef<HTMLDivElement>(null)
  const firstListWidthRef = useRef(0)
  const pausedRef = useRef(false)
  const expansionCountRef = useRef(0)

  const [segmentItems, setSegmentItems] = useState<readonly MarqueeItem[]>(() => duplicateTwice(baseItems))
  const offset = useMotionValue(0)
  const transform = useTransform(offset, (value) => `translate3d(${-value}px, 0, 0)`)

  useLayoutEffect(() => {
    expansionCountRef.current = 0
    setSegmentItems(duplicateTwice(baseItems))
    offset.set(0)
  }, [baseItems, offset])

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const loopPoint = loopPointRef.current
    if (!viewport || !loopPoint) return

    const syncLayout = () => {
      const viewportWidth = viewport.clientWidth
      const firstListWidth = loopPoint.offsetLeft
      if (firstListWidth <= 0) return

      firstListWidthRef.current = firstListWidth

      const minSegmentWidth = Math.max(viewportWidth * 2, viewportWidth + 1)
      if (
        viewportWidth > 0 &&
        firstListWidth < minSegmentWidth &&
        expansionCountRef.current < MAX_SEGMENT_EXPANSIONS
      ) {
        expansionCountRef.current += 1
        setSegmentItems((prev) => [...prev, ...baseItems])
      }
    }

    syncLayout()
    const observer = new ResizeObserver(syncLayout)
    observer.observe(viewport)
    observer.observe(loopPoint)
    return () => observer.disconnect()
  }, [baseItems, segmentItems])

  useAnimationFrame((_time, delta) => {
    if (pausedRef.current) return

    const loopWidth = firstListWidthRef.current
    if (loopWidth <= 0) return

    let next = offset.get() + (MARQUEE_SPEED_PX_PER_SEC * delta) / 1000

    while (next >= loopWidth) {
      next -= loopWidth
    }

    offset.set(next)
  })

  return (
    <div
      ref={viewportRef}
      className="relative w-[100vw] max-w-[100vw] overflow-hidden [margin-inline:calc(50%-50vw)]"
      dir="ltr"
      onMouseEnter={() => {
        pausedRef.current = true
      }}
      onMouseLeave={() => {
        pausedRef.current = false
      }}
      aria-label={hasReviews ? 'ביקורות לקוחות מגוגל' : 'קישורים לפרופיל Google Business'}
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10 bg-gradient-to-l from-slate-950 to-transparent md:w-16"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-10 bg-gradient-to-r from-slate-950 to-transparent md:w-16"
        aria-hidden
      />

      <motion.div
        className={`flex w-max items-stretch will-change-transform ${MARQUEE_TRACK_GAP}`}
        dir="ltr"
        style={{
          transform,
          transformOrigin: '0px 0px',
        }}
      >
        <MarqueeCards items={segmentItems} hasReviews={hasReviews} keyPrefix="a" />
        <MarqueeCards
          items={segmentItems}
          hasReviews={hasReviews}
          keyPrefix="b"
          loopPointRef={loopPointRef}
          duplicate
        />
      </motion.div>
    </div>
  )
}

export function GoogleReviewsMarquee() {
  const hasReviews = GOOGLE_REVIEWS.length > 0
  const baseItems = hasReviews ? GOOGLE_REVIEWS : FALLBACK_CTA_CARDS
  const reduceMotion = useA11yReduceMotion()

  return (
    <div className="pointer-events-auto mt-8 md:mt-10" lang="he">
      <div className="mb-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-2 text-center" dir="rtl">
        <div className="inline-flex items-center gap-2">
          <GoogleGIcon />
          <span className="text-sm font-semibold text-white md:text-base">ביקורות בגוגל</span>
        </div>
        <span className="text-xs text-slate-400 md:text-sm">
          <span className="font-semibold text-amber-200">{GOOGLE_BUSINESS_RATING.toFixed(1)}</span>
          <span aria-hidden> ★ </span>
          · Google Business
        </span>
        <a
          href={GOOGLE_BUSINESS_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-cyan-200 underline-offset-2 transition hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 md:text-sm"
        >
          {hasReviews ? 'לכל הביקורות' : 'לפרופיל ב-Google Maps'}
        </a>
        <a
          href={GOOGLE_BUSINESS_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-slate-400 underline-offset-2 transition hover:text-cyan-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 md:text-sm"
        >
          להשאיר ביקורת
        </a>
      </div>

      {reduceMotion ? (
        <div
          className="overflow-visible px-3 md:px-4"
          aria-label={hasReviews ? 'ביקורות לקוחות מגוגל' : 'קישורים לפרופיל Google Business'}
        >
          <div className={`flex flex-wrap justify-center ${MARQUEE_TRACK_GAP}`}>
            <MarqueeCards items={baseItems} hasReviews={hasReviews} keyPrefix="static" />
          </div>
        </div>
      ) : (
        <InfiniteMarqueeEngine baseItems={baseItems} hasReviews={hasReviews} />
      )}
    </div>
  )
}
