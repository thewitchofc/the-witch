import { Link } from 'react-router-dom'
import { trackEvent } from '../lib/analytics'

const pillars = [
  {
    title: 'לא תבניות',
    body: 'כל אתר נבנה מאפס.\nבלי מגבלות ובלי קיצורי דרך.',
  },
  {
    title: 'חשיבה על תוצאה',
    body: 'כל החלטה באתר נועדה להוביל לפעולה.\nלא רק להיראות טוב.',
  },
  {
    title: 'דיוק בפרטים',
    body: 'ההבדל בין אתר רגיל לאתר שמביא לקוחות נמצא בפרטים הקטנים.',
  },
] as const

/** למה לבחור, אמון בלי התחננות */
export function WhyItWorksDifferent() {
  return (
    <section
      className="mx-auto max-w-5xl px-6 py-24 text-center text-white md:py-32"
      dir="rtl"
      lang="he"
      aria-labelledby="why-fit-heading"
    >
      <h2
        id="why-fit-heading"
        className="mb-16 text-balance text-2xl font-semibold tracking-tight text-white md:text-4xl"
      >
        לא כולם מתאימים לעבוד איתי ויש לזה סיבה
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {pillars.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-md md:p-6"
          >
            <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
            <p className="whitespace-pre-line text-pretty text-sm leading-relaxed text-slate-300">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-xl md:mt-20">
        <p className="mb-5 text-balance text-center text-base leading-relaxed text-slate-300 md:text-lg">
          אם זה נשמע כמו שפה משותפת, הצעד הבא הוא שיחה קצרה. בלי עלות ובלי התחייבות.
        </p>
        <div className="flex justify-center">
          <Link
            to="/apply#contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-l from-cyan-400 via-violet-500 to-fuchsia-500 px-8 py-3 text-base font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.3)] ring-1 ring-white/15 transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80 md:px-10 md:text-lg"
            onClick={() =>
              trackEvent('cta_click', {
                cta_location: 'apply_why_different',
                link_url: '/apply#contact',
              })
            }
          >
            מלאו טופס התאמה
          </Link>
        </div>
      </div>
    </section>
  )
}
