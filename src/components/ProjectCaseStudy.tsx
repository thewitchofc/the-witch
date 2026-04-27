import { CustomLink } from './CustomLink'
import { trackEvent } from '../lib/analytics'
import { primaryCtaInnerClass, primaryCtaOuterClass } from '../lib/primaryCtaClasses'

type ProjectCaseStudyProps = {
  title: string
  eyebrow: string
  subtitle: string
  description: string
  image: string
  imageAlt: string
  problem: string
  solution: string
  result: string
  workItems: readonly string[]
  ctaLocation: string
  liveSiteUrl?: string
  statusLabel?: string
  imageObjectClassName?: string
  imageSizeClassName?: string
  showImageBackdrop?: boolean
}

const summaryCardClass =
  'rounded-2xl border border-white/10 bg-white/[0.045] p-5 text-right ring-1 ring-white/[0.04] backdrop-blur-md md:p-6'

export function ProjectCaseStudy({
  title,
  eyebrow,
  subtitle,
  description,
  image,
  imageAlt,
  problem,
  solution,
  result,
  workItems,
  ctaLocation,
  liveSiteUrl,
  statusLabel,
  imageObjectClassName = 'object-cover object-center',
  imageSizeClassName = 'h-[280px] md:h-[520px]',
  showImageBackdrop = false,
}: ProjectCaseStudyProps) {
  return (
    <main
      className="relative z-10 pb-24 pt-20 supports-[min-height:100dvh]:min-h-[100dvh] md:pb-32"
      dir="rtl"
      lang="he"
    >
      <div className="pointer-events-none absolute -right-28 top-16 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-28 top-72 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <section className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-[0.92fr_1.08fr] md:px-6 md:py-16">
        <div className="relative order-2 overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-[0_0_54px_rgba(139,92,246,0.12)] ring-1 ring-white/[0.05] md:order-1">
          {showImageBackdrop ? (
            <img
              src={image}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-45 blur-xl"
              width={1600}
              height={900}
              loading="eager"
              decoding="async"
            />
          ) : null}
          <img
            src={image}
            alt={imageAlt}
            className={`relative z-10 w-full ${imageSizeClassName} ${imageObjectClassName}`}
            width={1600}
            height={900}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/10 to-transparent" />
        </div>

        <div className="order-1 text-center md:order-2 md:text-right">
          <div className="mb-4 flex flex-wrap justify-center gap-2 md:justify-start">
            <p className="w-fit rounded-full border border-violet-300/20 bg-violet-300/[0.08] px-3 py-1 text-xs font-medium text-violet-100">
              {eyebrow}
            </p>
            {statusLabel ? (
              <p className="w-fit rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-xs font-medium text-cyan-100">
                {statusLabel}
              </p>
            ) : null}
          </div>
          <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-lg font-medium text-cyan-100 md:text-2xl">{subtitle}</p>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 md:mx-0 md:text-lg">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <CustomLink
              to="/apply#contact"
              aria-label="בדיקת התאמה לפרויקט, מעבר לטופס יצירת קשר"
              className={`pointer-events-auto z-10 ${primaryCtaOuterClass}`}
              onClick={() => trackEvent('cta_click', { cta_location: ctaLocation, link_url: '/apply#contact' })}
            >
              <span className={primaryCtaInnerClass}>בדיקת התאמה לפרויקט</span>
            </CustomLink>
            {liveSiteUrl ? (
              <a
                href={liveSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`צפייה באתר החי של ${title} (נפתח בלשונית חדשה)`}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/15 bg-white/[0.035] px-6 py-3 text-sm font-medium text-slate-200 ring-1 ring-white/[0.06] transition hover:border-cyan-300/35 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 md:text-base"
                onClick={() => trackEvent('cta_click', { cta_location: `${ctaLocation}_live_site`, link_url: liveSiteUrl })}
              >
                צפייה באתר החי
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-6 md:grid-cols-3 md:px-6 md:py-8">
        <article className={summaryCardClass}>
          <p className="text-sm font-semibold text-violet-200">הבעיה</p>
          <p className="mt-3 text-base leading-relaxed text-slate-300 md:text-lg">{problem}</p>
        </article>
        <article className={summaryCardClass}>
          <p className="text-sm font-semibold text-cyan-200">הפתרון</p>
          <p className="mt-3 text-base leading-relaxed text-slate-300 md:text-lg">{solution}</p>
        </article>
        <article className="rounded-2xl border border-violet-300/15 bg-violet-500/[0.07] p-5 text-right ring-1 ring-white/[0.04] backdrop-blur-md md:p-6">
          <p className="text-sm font-semibold text-violet-100">התוצאה</p>
          <p className="mt-3 text-base font-medium leading-relaxed text-white md:text-lg">{result}</p>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14" aria-labelledby="case-study-work">
        <div className="mb-6 text-center md:mb-8">
          <p className="text-sm font-semibold text-cyan-200">מה נבנה בפועל</p>
          <h2 id="case-study-work" className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            לא רק עיצוב, אלא מערכת עבודה שלמה
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {workItems.map((item) => (
            <div key={item} className={summaryCardClass}>
              <span className="mb-3 block h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.7)]" />
              <p className="text-base leading-relaxed text-slate-300">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pt-4 md:px-6 md:pt-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-violet-300/15 bg-gradient-to-l from-violet-500/[0.12] via-slate-950/70 to-cyan-500/[0.08] px-6 py-10 text-center ring-1 ring-white/[0.05] backdrop-blur-xl md:px-10 md:py-12">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl">
            רוצה אתר שמרגיש טוב וגם עובד?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
            נבדוק אם אפשר לבנות לך אתר שמוביל אנשים לפעולה, לא רק נראה יפה.
          </p>
          <CustomLink
            to="/apply#contact"
            aria-label="בדיקת התאמה לפרויקט, מעבר לטופס יצירת קשר"
            className={`mt-7 ${primaryCtaOuterClass}`}
            onClick={() => trackEvent('cta_click', { cta_location: `${ctaLocation}_footer`, link_url: '/apply#contact' })}
          >
            <span className={primaryCtaInnerClass}>בדיקת התאמה לפרויקט</span>
          </CustomLink>
        </div>
      </section>
    </main>
  )
}
