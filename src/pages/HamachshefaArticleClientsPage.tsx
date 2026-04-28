import { CustomLink } from '../components/CustomLink'
import { Seo } from '../components/Seo'
import { trackEvent } from '../lib/analytics'
import { primaryCtaInnerClass, primaryCtaOuterClass } from '../lib/primaryCtaClasses'

const ARTICLE_PATH = '/hamachshefa-bniyat-atarim-eich-livchor-atar-shmevi-lakochot' as const

const articleHighlights = [
  {
    title: 'לא מתחילים מעיצוב',
    body: 'מתחילים מהשאלה מה הלקוח צריך להבין כדי לפנות.',
  },
  {
    title: 'מהירות היא חלק מהמכירה',
    body: 'אתר איטי פוגע באמון עוד לפני שהמבקר קרא מילה.',
  },
  {
    title: 'SEO בלי לוותר על חוויה',
    body: 'התוכן צריך להיות ברור גם לגוגל וגם לאדם שקורא אותו.',
  },
] as const

const checkpoints = [
  'האם ברור תוך כמה שניות מה העסק עושה ולמי הוא מתאים?',
  'האם יש סיבה אמיתית לפנות דווקא אליך ולא למתחרה?',
  'האם הדרך לפנייה קצרה, ברורה ונגישה גם במובייל?',
  'האם האתר נטען מהר ומרגיש מקצועי כבר בכניסה?',
] as const

export default function HamachshefaArticleClientsPage() {
  return (
    <>
      <Seo
        title="המכשפה לבניית אתרים – איך לבחור אתר שמביא לקוחות? | The Witch"
        description="המכשפה לבניית אתרים: איך לבחור אתר שמביא לקוחות — המרות, מהירות, SEO וקוד נקי. פחות עיצוב ריק, יותר תוצאות."
        path={ARTICLE_PATH}
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
          className="pointer-events-none absolute -left-32 top-[34rem] h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.16),transparent_52%)]"
          aria-hidden
        />

        <article className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-24 md:px-6 md:pb-32 md:pt-28">
          <header className="mx-auto max-w-4xl text-center">
            <p className="mx-auto mb-4 w-fit rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1 text-xs font-medium text-cyan-100">
              <CustomLink
                to="/hamachshefa-bniyat-atarim"
                className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
              >
                המכשפה לבניית אתרים
              </CustomLink>
              <span aria-hidden> · </span>
              מאמר
            </p>
            <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              איך לבחור אתר שמביא לקוחות, ולא רק נראה יפה?
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
              רוב האתרים נראים טוב בסקיצה. השאלה האמיתית היא האם הם מסבירים, משכנעים ומובילים לפנייה.
            </p>
          </header>

          <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)] lg:items-start">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45 p-6 text-right shadow-[0_0_46px_rgba(139,92,246,0.12)] ring-1 ring-white/[0.05] backdrop-blur-xl md:p-8">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-cyan-300/70 to-transparent"
                aria-hidden
              />
              <div className="space-y-6 text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
                <p>
                  המכשפה לבניית אתרים מתמקדת ביצירת אתרים שמביאים תוצאות אמיתיות לעסקים. רוב האתרים היום נראים
                  טוב, אבל לא מייצרים פניות, וזה ההבדל המרכזי.
                </p>

                <p>
                  כאשר בונים אתר, חשוב להבין שהמטרה היא לא רק עיצוב, אלא יצירת חוויית משתמש שגורמת ללקוח לפעול.
                  אתר טוב יודע לקחת מבקר קר ולהוביל אותו בהדרגה להבנה, אמון ופנייה.
                </p>

                <p>
                  עוד טעות נפוצה היא להתעלם ממהירות ו־SEO. אתר איטי או לא מותאם למנועי חיפוש פשוט לא יביא תנועה
                  איכותית. לכן בניית אתרים מקצועית חייבת לשלב קוד נקי, ביצועים גבוהים וחשיבה שיווקית.
                </p>

                <p className="rounded-2xl border border-violet-300/15 bg-violet-500/[0.08] p-5 text-center text-lg font-semibold leading-relaxed text-white md:text-xl">
                  אתר שמביא לקוחות לא נמדד רק ביופי. הוא נמדד במה שהוא גורם לאנשים לעשות.
                </p>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.055] p-6 text-right shadow-[0_0_38px_rgba(34,211,238,0.10)] ring-1 ring-white/[0.05] backdrop-blur-xl">
                <h2 className="text-xl font-semibold text-white">בדיקה מהירה לאתר טוב</h2>
                <div className="mt-5 space-y-3">
                  {checkpoints.map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.7)]" />
                      <p className="text-sm leading-relaxed text-slate-300 md:text-base">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-violet-300/15 bg-violet-500/[0.07] p-6 text-center shadow-[0_0_38px_rgba(139,92,246,0.12)] ring-1 ring-white/[0.05] backdrop-blur-xl">
                <p className="text-sm font-medium text-violet-100">השורה התחתונה</p>
                <p className="mt-2 text-pretty text-base leading-relaxed text-slate-200">
                  אם האתר לא מוביל לפנייה, הוא לא עושה את העבודה שלו.
                </p>
              </div>
            </aside>
          </div>

          <section className="mt-6 grid gap-3 md:grid-cols-3">
            {articleHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 text-right shadow-[0_0_30px_rgba(15,23,42,0.18)] ring-1 ring-white/[0.04] backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.065] md:p-6"
              >
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">{item.body}</p>
              </div>
            ))}
          </section>

          <section className="mx-auto mt-8 max-w-3xl rounded-3xl border border-violet-300/15 bg-gradient-to-l from-violet-500/[0.14] via-slate-950/75 to-cyan-500/[0.10] px-6 py-10 text-center shadow-[0_0_48px_rgba(139,92,246,0.16)] ring-1 ring-white/[0.05] backdrop-blur-xl md:px-10 md:py-12">
            <h2 className="text-balance text-2xl font-semibold leading-tight text-white md:text-3xl">
              רוצה לבדוק אם האתר הבא שלך צריך להיבנות ככה?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-slate-300">
              מלא טופס קצר ונבין אם יש התאמה לפרויקט, בלי התחייבות ובלי למשוך זמן.
            </p>
            <CustomLink
              to="/apply#contact"
              className={primaryCtaOuterClass}
              onClick={() =>
                trackEvent('cta_click', {
                  cta_location: 'hamachshefa_article_bottom',
                  link_url: '/apply#contact',
                })
              }
            >
              <span className={primaryCtaInnerClass}>בדיקת התאמה לפרויקט</span>
            </CustomLink>
          </section>
        </article>
      </div>
    </>
  )
}
