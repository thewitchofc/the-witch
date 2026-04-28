import { CustomLink } from '../components/CustomLink'
import { Seo } from '../components/Seo'
import { trackEvent } from '../lib/analytics'
import { primaryCtaInnerClass, primaryCtaOuterClass } from '../lib/primaryCtaClasses'

const focusCards = [
  {
    title: 'מסר חד',
    body: 'האתר צריך להסביר מהר למה העסק שלך הוא הבחירה הנכונה, בלי לגרום למבקר להתאמץ.',
  },
  {
    title: 'מבנה שמוביל פעולה',
    body: 'כל אזור בעמוד נבנה כדי לקרב לפנייה: אמון, הבנה, ואז צעד ברור.',
  },
  {
    title: 'קוד ומהירות',
    body: 'לא תבנית כבדה. אתר נקי, מהיר וגמיש שנבנה סביב הצרכים של העסק.',
  },
] as const

const fitSignals = [
  'יש לך עסק אמיתי, ואתה רוצה אתר שמרגיש כמו נכס ולא כמו פלייר.',
  'חשוב לך שהאתר יעביר מקצועיות, בידול ואמון כבר מהכניסה הראשונה.',
  'אתה לא מחפש “עוד עמוד יפה”, אלא אתר שמוביל לפניות איכותיות.',
] as const

export default function HamachshefaPage() {
  return (
    <>
      <Seo
        title="המכשפה לבניית אתרים | The Witch"
        description="המכשפה לבניית אתרים – שירות פרימיום לבניית אתרים שמביאים לקוחות, עם דגש על מהירות, המרות ו-SEO."
        path="/hamachshefa-bniyat-atarim"
      />

      <div
        className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]"
        dir="rtl"
        lang="he"
      >
        <div
          className="pointer-events-none absolute -right-28 top-20 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-32 top-[28rem] h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_50%)]"
          aria-hidden
        />

        <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-24 md:px-6 md:pb-32 md:pt-28">
          <section className="grid gap-5 md:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.88fr)] md:gap-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45 px-6 py-10 text-center shadow-[0_0_52px_rgba(139,92,246,0.14)] ring-1 ring-white/[0.05] backdrop-blur-xl md:px-8 md:py-12 md:text-right">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-cyan-300/70 to-transparent"
                aria-hidden
              />
              <p className="mx-auto mb-4 w-fit rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1 text-xs font-medium text-cyan-100 md:mx-0">
                המכשפה לבניית אתרים
              </p>
              <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                אתר שלא רק נראה טוב. אתר שמוביל לפנייה.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 md:mx-0 md:text-lg">
                המכשפה לבניית אתרים היא גישה לבניית אתרים עסקיים עם מטרה ברורה: להפוך מבקרים ללקוחות. לא עוד
                כרטיס ביקור יפה, אלא מערכת דיגיטלית שמסבירה, משכנעת ומניעה לפעולה.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <CustomLink
                  to="/apply#contact"
                  className={primaryCtaOuterClass}
                  onClick={() =>
                    trackEvent('cta_click', {
                      cta_location: 'hamachshefa_hero',
                      link_url: '/apply#contact',
                    })
                  }
                >
                  <span className={primaryCtaInnerClass}>בדיקת התאמה לפרויקט</span>
                </CustomLink>
                <CustomLink
                  to="/portfolio"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-200 ring-1 ring-white/[0.06] transition hover:border-cyan-300/35 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 md:px-6 md:text-base"
                >
                  לראות עבודות
                </CustomLink>
              </div>
            </div>

            <aside className="relative overflow-hidden rounded-3xl border border-violet-300/15 bg-violet-500/[0.07] p-6 text-right shadow-[0_0_44px_rgba(139,92,246,0.14)] ring-1 ring-white/[0.05] backdrop-blur-xl md:p-7">
              <p className="text-sm font-semibold text-violet-100">למי זה מתאים?</p>
              <h2 className="mt-2 text-2xl font-semibold leading-tight text-white md:text-3xl">
                לעסק שרוצה אתר שעובד בשבילו.
              </h2>
              <div className="mt-6 space-y-4">
                {fitSignals.map((signal) => (
                  <div key={signal} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.7)]" />
                    <p className="text-sm leading-relaxed text-slate-300 md:text-base">{signal}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.06] p-4 text-center">
                <p className="text-sm leading-relaxed text-cyan-100">
                  המטרה היא לא למלא מקום במסך. המטרה היא לגרום למבקר להבין: “זה בדיוק מה שחיפשתי”.
                </p>
              </div>
            </aside>
          </section>

          <section className="mt-6 grid gap-3 md:grid-cols-3">
            {focusCards.map((card) => (
              <article
                key={card.title}
                className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 text-right shadow-[0_0_30px_rgba(15,23,42,0.18)] ring-1 ring-white/[0.04] backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.065] md:p-6"
              >
                <h2 className="text-lg font-semibold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">{card.body}</p>
              </article>
            ))}
          </section>

          <section className="mt-6 rounded-3xl border border-white/10 bg-slate-950/45 p-6 text-center shadow-[0_0_42px_rgba(34,211,238,0.08)] ring-1 ring-white/[0.05] backdrop-blur-xl md:p-8">
            <p className="text-sm font-medium text-cyan-100">רוצה להבין איך לבחור אתר שבאמת מביא לקוחות?</p>
            <h2 className="mx-auto mt-2 max-w-2xl text-balance text-2xl font-semibold leading-tight text-white md:text-3xl">
              כתבתי מדריך קצר על ההבדל בין אתר יפה לאתר שמייצר פניות.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-300">
              אם אתה עדיין בשלב של להבין מה נכון לעסק שלך, זה מקום טוב להתחיל ממנו לפני שממלאים טופס.
            </p>
            <div className="mt-7 flex justify-center">
              <CustomLink
                to="/hamachshefa-bniyat-atarim-eich-livchor-atar-shmevi-lakochot"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-violet-300/25 bg-violet-400/[0.08] px-6 py-3 text-sm font-semibold text-violet-100 transition hover:border-cyan-300/35 hover:bg-cyan-300/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 md:text-base"
              >
                לקריאת המדריך
              </CustomLink>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
