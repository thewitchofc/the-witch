import { Link } from 'react-router-dom'
import { trackEvent } from '../lib/analytics'

const cardIconWrapDefault = 'mb-3 flex justify-center'
const cardIconWrapStacked = 'mb-1 flex justify-center md:mb-3'

type WhyMeVariant = 'default' | 'stacked'

function IconBolt({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function IconTarget({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconBriefcase({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

export default function WhyMe({ variant = 'default' }: { variant?: WhyMeVariant }) {
  const stacked = variant === 'stacked'
  const cardIconWrap = stacked ? cardIconWrapStacked : cardIconWrapDefault

  return (
    <section
      className={
        stacked
          ? 'pointer-events-none flex-shrink-0 px-3 py-3 text-center md:px-4 md:py-6'
          : 'pointer-events-none px-4 py-16 text-center md:py-20'
      }
    >
      <div className="mx-auto max-w-5xl">
        <h2
          className={
            stacked
              ? 'mb-3 text-sm font-semibold text-white md:mb-6 md:text-2xl'
              : 'mb-12 text-xl font-semibold text-white md:text-3xl'
          }
        >
          לא עוד אתר. מערכת שמביאה תוצאות.
        </h2>

        <div className={stacked ? 'grid grid-cols-3 gap-2 md:gap-8' : 'grid gap-8 md:grid-cols-3'}>
          <div
            className={
              stacked
                ? 'rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-md md:rounded-2xl md:p-6'
                : 'rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-6'
            }
          >
            <div className={cardIconWrap}>
              <IconBolt className={stacked ? 'h-6 w-6 text-violet-300 md:h-8 md:w-8' : 'h-8 w-8 text-violet-300'} />
            </div>
            <h3
              className={
                stacked
                  ? 'mb-0.5 text-[11px] font-semibold leading-tight text-white md:mb-2 md:text-lg'
                  : 'mb-2 text-lg font-semibold text-white'
              }
            >
              מהירות אמיתית
            </h3>
            <p
              className={
                stacked
                  ? 'text-[10px] leading-snug text-slate-300 md:text-sm'
                  : 'text-sm text-slate-300'
              }
            >
              אתרים שעולים מהר, בלי תקיעות ובלי עומס מיותר.
            </p>
          </div>

          <div
            className={
              stacked
                ? 'rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-md md:rounded-2xl md:p-6'
                : 'rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-6'
            }
          >
            <div className={cardIconWrap}>
              <IconTarget
                className={stacked ? 'h-6 w-6 text-violet-300 md:h-8 md:w-8' : 'h-8 w-8 text-violet-300'}
              />
            </div>
            <h3
              className={
                stacked
                  ? 'mb-0.5 text-[11px] font-semibold leading-tight text-white md:mb-2 md:text-lg'
                  : 'mb-2 text-lg font-semibold text-white'
              }
            >
              בנוי להמיר
            </h3>
            <p
              className={
                stacked
                  ? 'text-[10px] leading-snug text-slate-300 md:text-sm'
                  : 'text-sm text-slate-300'
              }
            >
              כל אלמנט באתר נבנה כדי להביא לקוחות — לא רק להיראות יפה.
            </p>
          </div>

          <div
            className={
              stacked
                ? 'rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-md md:rounded-2xl md:p-6'
                : 'rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-6'
            }
          >
            <div className={cardIconWrap}>
              <IconBriefcase
                className={stacked ? 'h-6 w-6 text-violet-300 md:h-8 md:w-8' : 'h-8 w-8 text-violet-300'}
              />
            </div>
            <h3
              className={
                stacked
                  ? 'mb-0.5 text-[11px] font-semibold leading-tight text-white md:mb-2 md:text-lg'
                  : 'mb-2 text-lg font-semibold text-white'
              }
            >
              חשיבה עסקית
            </h3>
            <p
              className={
                stacked
                  ? 'text-[10px] leading-snug text-slate-300 md:text-sm'
                  : 'text-sm text-slate-300'
              }
            >
              אני לא רק בונה — אני חושבת כמו בעלת עסק.
            </p>
          </div>
        </div>

        {stacked ? (
          <div className="pointer-events-auto mt-4 flex justify-center md:mt-6">
            <Link
              to="/apply#contact"
              className="inline-flex min-h-[44px] items-center text-sm font-semibold text-cyan-200 underline-offset-4 transition hover:text-white hover:underline md:text-base"
              onClick={() =>
                trackEvent('cta_click', {
                  cta_location: 'why_me_stacked',
                  link_url: '/apply#contact',
                })
              }
            >
              שיחת התאמה חינם — לטופס קצר
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
