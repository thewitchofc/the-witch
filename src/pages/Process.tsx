import { useRef } from 'react'
import { CustomLink } from '../components/CustomLink'
import { trackEvent } from '../lib/analytics'
import { Seo } from '../components/Seo'
import { useRevealIsVisible } from '../hooks/useRevealIsVisible'
import { primaryCtaInnerClass, primaryCtaOuterClass } from '../lib/primaryCtaClasses'

const steps = [
  {
    title: 'שיחת התאמה',
    body: 'מבינים יחד מטרות, קהל יעד והיקף ומוודאים שהפרויקט מתאים לשני הצדדים.',
  },
  {
    title: 'אפיון',
    body: 'מגדירים מבנה, תוכן וזרימת משתמש כך שהאתר ישרת מטרה ברורה.',
  },
  {
    title: 'עיצוב',
    body: 'מעצבים חוויה שמרגישה נכון למותג ומובילה לפעולה.',
  },
  {
    title: 'פיתוח',
    body: 'בנייה בקוד נקי, מהירות, נגישות והתאמה למובייל.',
  },
  {
    title: 'עלייה לאוויר',
    body: 'השקה מבוקרת, בדיקות אחרונות וליווי ליום הראשון באוויר.',
  },
] as const

const yesIf = [
  'אתם מחפשים אתר שמביא לקוחות ולא רק ״נראה יפה״.',
  'מוכנים להשקיע בתוצאה ובבנייה נכונה (קוד מותאם, בלי תבניות).',
  'יש מטרה עסקית ברורה ורוצים לעבוד בשקיפות בשלבים.',
  'מעריכים דיוק, מהירות טעינה וחוויית משתמש איכותית.',
] as const

const lessIf = [
  'המטרה העיקרית היא רק המחיר הנמוך ביותר בשוק.',
  'מחפשים פתרון מהיר בוויקס / שופיפיי / וורדפרס.',
  'אין זמן או רצון לתת משוב במהלך אפיון ועיצוב.',
  'רוצים ״עוד דף נחיתה גנרי״ בלי חשיבה על המרות.',
] as const

function ProcessStepCard({ index, item }: { index: number; item: (typeof steps)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  useRevealIsVisible(ref)

  return (
    <div
      ref={ref}
      className="hero-reveal group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45 p-5 text-center shadow-[0_0_32px_rgba(15,23,42,0.18)] ring-1 ring-white/[0.04] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.06] hover:shadow-[0_0_38px_rgba(34,211,238,0.10)] md:p-6"
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-l from-transparent via-cyan-300/45 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-sm font-semibold text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
        {index + 1}
      </div>
      <h2 className="mb-2 text-lg font-semibold text-white md:text-xl">{item.title}</h2>
      <p className="text-pretty text-sm leading-relaxed text-slate-300 md:text-base md:leading-relaxed">
        {item.body}
      </p>
    </div>
  )
}

export function ProcessPage() {
  const footerCtaRef = useRef<HTMLAnchorElement>(null)
  useRevealIsVisible(footerCtaRef)

  return (
    <div className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]">
      <Seo
        title="תהליך עבודה, The Witch"
        description="איך נראה תהליך בניית אתר איתי: שיחת התאמה, אפיון, עיצוב, פיתוח ועלייה לאוויר. שלבים ברורים, בלי הפתעות ובלי קיצורי דרך."
        path="/process"
      />
      <div
        className="pointer-events-none absolute -right-28 top-20 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-[34rem] h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.10),transparent_48%)]"
        aria-hidden
      />
      <main
        id="process"
        className="relative z-10 mx-auto min-h-[100svh] max-w-6xl px-4 pb-24 pt-20 supports-[min-height:100dvh]:min-h-[100dvh] md:px-6 md:pb-32"
        dir="rtl"
        lang="he"
        aria-labelledby="process-page-heading"
      >
        <section className="mx-auto mb-14 max-w-5xl md:mb-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-12 md:gap-y-14">
            <div className="md:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-6 text-center shadow-[0_0_42px_rgba(139,92,246,0.10)] ring-1 ring-white/[0.04] backdrop-blur-xl md:sticky md:top-[20%] md:z-10 md:max-w-md md:p-7 md:text-start">
                <p className="mx-auto mb-4 w-fit rounded-full border border-violet-300/20 bg-violet-300/[0.08] px-3 py-1 text-xs font-medium text-violet-100 md:mx-0">
                  תהליך מסודר, בלי ניחושים
                </p>
                <h1
                  id="process-page-heading"
                  className="mb-6 text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:mb-7 md:text-4xl"
                >
                  איך נראה תהליך עבודה איתי?
                </h1>

                <div className="mx-auto max-w-2xl space-y-3 text-base leading-relaxed text-slate-300 md:mx-0 md:text-lg">
                  <p className="text-pretty">כל פרויקט נבנה בשלבים ברורים, בלי הפתעות ובלי קיצורי דרך.</p>
                  <p className="text-pretty">
                    כך אתם יודעים מה קורה מתי, ואני יכולה לשמור על איכות מקצה לקצה.
                  </p>
                </div>

                <div className="mt-7 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
                  <p className="text-sm font-medium leading-relaxed text-cyan-100 md:text-base">
                    המטרה היא לא רק “לסיים אתר”, אלא לבנות תהליך שמוביל לתוצאה נכונה.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="relative mx-auto grid max-w-3xl grid-cols-1 gap-5 md:mx-0 md:max-w-none md:gap-6">
                <div
                  className="pointer-events-none absolute bottom-8 right-1/2 top-8 hidden w-px translate-x-1/2 bg-gradient-to-b from-cyan-300/0 via-cyan-300/35 to-violet-300/0 md:block"
                  aria-hidden
                />
                {steps.map((item, index) => (
                  <ProcessStepCard key={item.title} index={index} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl py-20" aria-labelledby="process-fit-heading">
          <h2
            id="process-fit-heading"
            className="mb-12 text-balance text-center text-xl font-semibold tracking-tight text-white md:text-3xl"
          >
            למי זה מתאים ולמי לא?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8">
            <div className="rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.045] p-6 shadow-[0_0_34px_rgba(34,211,238,0.08)] ring-1 ring-white/[0.04] backdrop-blur-md">
              <h3 className="mb-4 text-center text-lg font-semibold text-white">כן מתאים לך אם</h3>
              <ul className="list-disc space-y-3 ps-5 text-pretty text-right text-base leading-relaxed text-slate-300 marker:text-slate-400">
                {yesIf.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-violet-300/15 bg-violet-500/[0.045] p-6 shadow-[0_0_34px_rgba(139,92,246,0.08)] ring-1 ring-white/[0.04] backdrop-blur-md">
              <h3 className="mb-4 text-center text-lg font-semibold text-white">פחות מתאים אם</h3>
              <ul className="list-disc space-y-3 ps-5 text-pretty text-right text-base leading-relaxed text-slate-300 marker:text-slate-400">
                {lessIf.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-3xl border-t border-white/[0.06] px-0 pt-14 text-center md:mt-20 md:pt-16">
          <div className="rounded-3xl border border-violet-300/15 bg-gradient-to-l from-violet-500/[0.12] via-slate-950/70 to-cyan-500/[0.08] px-6 py-10 shadow-[0_0_46px_rgba(139,92,246,0.12)] ring-1 ring-white/[0.05] backdrop-blur-xl md:px-10 md:py-12">
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              מוכנים להתחיל?
            </h2>
            <CustomLink
              ref={footerCtaRef}
              to="/apply#contact"
              aria-label="בדיקת התאמה לפרויקט, מעבר לטופס יצירת קשר"
              className={`final-cta-reveal mt-6 ${primaryCtaOuterClass}`}
              onClick={() =>
                trackEvent('cta_click', { cta_location: 'process_footer', link_url: '/apply#contact' })
              }
            >
              <span className={primaryCtaInnerClass}>בדיקת התאמה לפרויקט</span>
            </CustomLink>
          </div>
        </section>
      </main>
    </div>
  )
}
