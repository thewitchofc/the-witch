import { Link } from 'react-router-dom'
import { CosmicField } from '../components/CosmicField'

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

export function ProcessPage() {
  return (
    <div className="relative isolate min-h-[100svh] w-full overflow-x-clip bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]">
      <CosmicField />
      <main
        id="process"
        className="relative z-10 mx-auto min-h-[100svh] max-w-6xl px-4 pb-24 pt-20 supports-[min-height:100dvh]:min-h-[100dvh] md:px-6 md:pb-32"
        dir="rtl"
        lang="he"
        aria-labelledby="process-page-heading"
      >
        <h1
          id="process-page-heading"
          className="mb-6 text-balance text-center text-2xl font-semibold tracking-tight text-white md:mb-8 md:text-4xl"
        >
          איך נראה תהליך עבודה איתי?
        </h1>

        <div className="mx-auto mb-14 max-w-2xl space-y-1.5 text-center text-base leading-snug text-slate-300 md:mb-16 md:text-lg md:leading-relaxed">
          <p className="text-pretty">כל פרויקט נבנה בשלבים ברורים, בלי הפתעות ובלי קיצורי דרך.</p>
          <p className="text-pretty">
            כך אתם יודעים מה קורה מתי, ואני יכולה לשמור על איכות מקצה לקצה.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:gap-7">
          {steps.map((item, index) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-md md:p-6"
            >
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                שלב {index + 1}
              </p>
              <h2 className="mb-2 text-lg font-semibold text-white md:text-xl">{item.title}</h2>
              <p className="text-pretty text-sm leading-relaxed text-gray-300 md:text-base md:leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <section className="mx-auto max-w-5xl py-20" aria-labelledby="process-fit-heading">
          <h2
            id="process-fit-heading"
            className="mb-12 text-balance text-center text-xl font-semibold tracking-tight text-white md:text-3xl"
          >
            למי זה מתאים ולמי לא?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <h3 className="mb-4 text-center text-lg font-semibold text-white">כן מתאים לך אם</h3>
              <ul className="list-disc space-y-3 ps-5 text-pretty text-right text-base leading-relaxed text-gray-300 marker:text-slate-400">
                {yesIf.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <h3 className="mb-4 text-center text-lg font-semibold text-white">פחות מתאים אם</h3>
              <ul className="list-disc space-y-3 ps-5 text-pretty text-right text-base leading-relaxed text-gray-300 marker:text-slate-400">
                {lessIf.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-3xl border-t border-white/[0.06] px-0 pt-14 text-center md:mt-20 md:pt-16">
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 px-6 py-10 ring-1 ring-white/[0.04] md:px-10 md:py-12">
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              מוכנים להתחיל?
            </h2>
            <Link
              to="/apply#contact"
              className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-slate-950/80 px-8 py-3 text-base font-medium text-white ring-1 ring-white/15 transition hover:bg-slate-900/90 hover:ring-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
            >
              בדיקת התאמה לפרויקט
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
