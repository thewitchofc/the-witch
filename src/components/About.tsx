import { CustomLink } from './CustomLink'
import { trackEvent } from '../lib/analytics'
import { primaryCtaInnerClass, primaryCtaOuterClass } from '../lib/primaryCtaClasses'

const ABOUT_SPARKLE_COUNT = 12

const linkClass =
  'font-medium text-violet-300 underline decoration-violet-400/40 underline-offset-[5px] transition-colors hover:text-white hover:decoration-cyan-400/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70'

const cardClass =
  'rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-right ring-1 ring-white/[0.04] backdrop-blur-md md:p-6'

const fitSignals = [
  <>
    רוצה אתר שמייצר פניות, לא עוד
    <br />
    “כרטיס ביקור” יפה.
  </>,
  'מבין שמסרים, מבנה ומהירות הם חלק מהמכירה.',
  'מוכן להשקיע בבנייה נקייה שמחזיקה לאורך זמן.',
] as const

const buildFocus = [
  { title: 'אסטרטגיה לפני עיצוב', body: 'קודם מבינים מי הלקוח, מה הוא צריך לראות, ומה צריך לגרום לו לפנות.' },
  { title: 'קוד מלא ונקי', body: 'בלי תבניות ובלי מגבלות של פלטפורמות, כדי שהאתר יתאים לעסק ולא להפך.' },
  { title: 'חוויה שמובילה פעולה', body: 'כל כותרת, כפתור ומקטע מקבלים תפקיד ברור במסע של המבקר.' },
  { title: 'ביצועים מההתחלה', body: 'מהירות, נגישות ומבנה SEO נכנסים לתהליך כבר בשלב הבנייה.' },
] as const

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 overflow-x-hidden py-10 text-white md:py-14"
      dir="rtl"
      lang="he"
      aria-labelledby="about-heading"
    >
      <div className="relative mx-auto w-full min-w-0 max-w-5xl py-8 sm:py-10 md:py-14">
        <div
          className="pointer-events-none absolute -right-24 top-4 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-28 top-64 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute left-1/2 top-56 z-0 -translate-x-1/2 motion-reduce:hidden motion-safe:animate-[spin_44s_linear_infinite]"
          aria-hidden
        >
          {Array.from({ length: ABOUT_SPARKLE_COUNT }).map((_, i) => {
            const angle = (i * 360) / ABOUT_SPARKLE_COUNT
            const hue = i % 2 === 0 ? 'text-cyan-200/85' : 'text-violet-200/85'
            return (
              <span
                key={i}
                className={`absolute left-0 top-0 block origin-center text-[0.65rem] leading-none drop-shadow-[0_0_6px_rgba(167,139,250,0.55)] motion-safe:animate-[about-sparkle-twinkle_2.8s_ease-in-out_infinite] sm:text-xs md:text-sm ${hue}`}
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(-1 * (min(86vw, 40rem) * 0.5 + 4rem)))`,
                  animationDelay: `${i * 0.18}s`,
                }}
              >
                ✦
              </span>
            )
          })}
        </div>

        <div className="relative z-10 space-y-8 md:space-y-10">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/50 px-6 py-12 text-center shadow-[0_0_54px_rgba(139,92,246,0.14)] ring-1 ring-white/[0.05] backdrop-blur-xl md:px-10 md:py-16">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-cyan-300/70 to-transparent"
              aria-hidden
            />
            <p className="mx-auto mb-4 w-fit rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1 text-xs font-medium text-cyan-100">
              המכשפה, מאחורי הקוד
            </p>
            <h1
              id="about-heading"
              className="mx-auto min-w-0 max-w-3xl text-balance break-words text-3xl font-semibold leading-[1.15] tracking-tight text-white md:text-5xl md:leading-[1.1] lg:text-6xl"
            >
              <span className="block">אני בונה אתרים שמכוונים לדבר אחד.</span>
              <span className="block text-cyan-100">להפוך מבקרים ללקוחות.</span>
            </h1>

            <div className="mx-auto mt-6 max-w-2xl space-y-4 text-pretty text-base leading-relaxed text-slate-300 md:mt-7 md:text-lg">
              <p>
                לא עוד אתר שנראה טוב רק בסקיצה. אתר בקוד מלא, עם מסרים, מבנה וחוויה שמובילים
                לפנייה.
              </p>
            </div>

            <div
              className="mx-auto mt-7 max-w-xl rounded-2xl border border-violet-300/20 bg-violet-500/[0.08] px-5 py-4 text-center shadow-[0_0_32px_rgba(139,92,246,0.16)] ring-1 ring-white/[0.05]"
              role="note"
            >
              <p className="text-lg font-semibold leading-relaxed text-white md:text-2xl">
                אני לא מוכרת זמן. אני מוכרת תוצאה.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <CustomLink
                to="/apply#contact"
                className={`pointer-events-auto z-10 ${primaryCtaOuterClass}`}
                aria-label="מעבר לטופס בדיקת התאמה לפרויקט"
                onClick={() =>
                  trackEvent('cta_click', { cta_location: 'about_hero', link_url: '/apply#contact' })
                }
              >
                <span className={primaryCtaInnerClass}>בדיקת התאמה לפרויקט</span>
              </CustomLink>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/30 p-5 ring-1 ring-white/[0.04] backdrop-blur-md md:p-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold text-violet-200">למי זה מתאים</p>
              <h2 className="mt-2 text-2xl font-semibold leading-tight text-white md:text-3xl">
                לעסקים שלא מחפשים קיצור דרך.
              </h2>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {fitSignals.map((signal, index) => (
                <div key={index} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-right">
                  <span className="mb-3 block h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.7)]" />
                  <p className="text-base leading-relaxed text-slate-300 md:text-lg">{signal}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 text-center md:mb-6">
              <p className="text-sm font-semibold text-cyan-200">מה עומד מאחורי העבודה</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                ארבעה דברים שאני לא מתפשרת עליהם
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {buildFocus.map((item) => (
                <article key={item.title} className={cardClass}>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-violet-300/15 bg-violet-500/[0.06] p-6 text-center ring-1 ring-white/[0.05] backdrop-blur-xl md:p-8">
            <p className="text-sm font-medium text-violet-100">השורה התחתונה</p>
            <h2 className="mx-auto mt-2 max-w-2xl text-balance text-2xl font-semibold leading-tight text-white md:text-3xl">
              אם אתה מחפש אתר שרק יראה טוב, יש פתרונות אחרים.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
              אם אתה מחפש אתר שמביא לקוחות,{' '}
              <CustomLink
                to="/apply#contact"
                className={linkClass}
                aria-label="מעבר לטופס בדיקת התאמה לפרויקט"
                onClick={() =>
                  trackEvent('cta_click', { cta_location: 'about_inline', link_url: '/apply#contact' })
                }
              >
                תמלא את הטופס
              </CustomLink>{' '}
              ונבדוק התאמה.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
