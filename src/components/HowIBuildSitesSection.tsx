import { Link } from 'react-router-dom'
import { trackEvent } from '../lib/analytics'

const caseStudy = {
  title: 'מקרה לדוגמה: SAB Glass',
  problem: 'אתר תדמית שלא הביא פניות איכותיות מגוגל, מבקרים עזבו בלי לפנות.',
  improved: 'מבנה דפים סביב המרה, ביצועים גבוהים, SEO בסיסי נכון וחוויית משתמש שמובילה לפעולה.',
  today: 'היום האתר משרת כערוץ פניות: מסלול ברור מחיפוש ועד טופס או וואטסאפ.',
  href: '/projects/sab-glass',
} as const

const principles = [
  { title: 'מהירות גבוהה', body: 'טעינה קצרה, פחות חיכוך, יותר סיכוי שהמבקר יגיע לפעולה.' },
  { title: 'חוויית משתמש', body: 'ניווט, היררכיה וקריאות ויזואלית שמורידות עומס קוגניטיבי.' },
  { title: 'המרות', body: 'כל מסך נבנה סביב מטרה: פנייה, הזמנה או השארת פרטים.' },
  { title: 'SEO', body: 'מבנה, כותרות ותוכן שמסבירים למנועי חיפוש למי האתר מיועד.' },
] as const

const technical = [
  {
    title: 'ציון ביצועים גבוה',
    body: 'אופטימיזציה ל-Core Web Vitals ולמדדי Lighthouse, כיעד בכל פרויקט.',
  },
  {
    title: 'זמן טעינה מהיר',
    body: 'תמונות ופונטים חכמים, קוד מפוצל נכון ופחות עבודה במסך הראשון.',
  },
  {
    title: 'מבנה קוד נקי',
    body: 'רכיבים ברורים, קונבנציות עקביות וקוד שאפשר להרחיב ולתחזק עם העסק.',
  },
] as const

const cardClass =
  'rounded-2xl border border-white/10 bg-white/5 p-4 text-right backdrop-blur-md ring-1 ring-white/[0.06] md:p-5'

/** אמון מקצועי בלי עדויות לקוחות, מקרה לדוגמה, עקרונות ונתונים טכניים */
export function HowIBuildSitesSection() {
  return (
    <section
      className="pointer-events-none shrink-0 px-3 pb-10 pt-2 text-white md:px-4 md:pb-14 md:pt-4"
      dir="rtl"
      lang="he"
      aria-labelledby="how-build-sites-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="how-build-sites-heading"
          className="mb-6 text-balance text-center text-lg font-semibold tracking-tight text-white md:mb-8 md:text-2xl"
        >
          איך אני בונה אתרים שעובדים
        </h2>

        <div className={`${cardClass} mb-8 md:mb-10`}>
          <h3 className="mb-3 text-base font-semibold text-white md:text-lg">{caseStudy.title}</h3>
          <dl className="space-y-3 text-sm leading-relaxed text-slate-300 md:text-base">
            <div>
              <dt className="font-medium text-slate-200">מה הייתה הבעיה</dt>
              <dd className="mt-0.5">{caseStudy.problem}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-200">מה שופר</dt>
              <dd className="mt-0.5">{caseStudy.improved}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-200">איך זה נראה היום</dt>
              <dd className="mt-0.5">{caseStudy.today}</dd>
            </div>
          </dl>
          <div className="mt-4 flex justify-center md:justify-start">
            <Link
              to={caseStudy.href}
              className="pointer-events-auto inline-flex min-h-[44px] items-center justify-center rounded-full border border-cyan-400/35 bg-slate-950/60 px-5 py-2.5 text-sm font-medium text-cyan-200 ring-1 ring-white/10 transition hover:border-cyan-400/50 hover:bg-slate-900/70 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 md:text-base"
            >
              לקריאת מקרה הבוחן המלא
            </Link>
          </div>
        </div>

        <h3 className="mb-4 text-center text-sm font-semibold text-white/95 md:mb-5 md:text-base">
          עקרונות עבודה
        </h3>
        <div className="mb-8 grid grid-cols-2 gap-3 md:mb-10 md:grid-cols-4 md:gap-4">
          {principles.map((p) => (
            <div key={p.title} className={cardClass}>
              <h4 className="mb-1.5 text-xs font-semibold text-white md:text-sm">{p.title}</h4>
              <p className="text-[11px] leading-snug text-slate-400 md:text-xs md:leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-4 text-center text-sm font-semibold text-white/95 md:mb-5 md:text-base">
          נתונים טכניים (ככיוון עבודה בכל פרויקט)
        </h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {technical.map((t) => (
            <div key={t.title} className={cardClass}>
              <h4 className="mb-1.5 text-sm font-semibold text-white">{t.title}</h4>
              <p className="text-xs leading-relaxed text-slate-400 md:text-sm">{t.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-10 md:mt-12 md:gap-4 md:pt-12">
          <p className="max-w-lg text-balance text-center text-sm leading-relaxed text-slate-300 md:text-base">
            אם זה נשמע כמו מה שהעסק שלכם צריך, בואו נבדוק התאמה בלי התחייבות.
          </p>
          <Link
            to="/apply#contact"
            className="pointer-events-auto inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-l from-cyan-400 via-violet-500 to-fuchsia-500 px-6 py-3 text-base font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.3)] ring-1 ring-white/15 transition hover:opacity-95 hover:shadow-[0_0_32px_rgba(34,211,238,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80 md:px-8 md:py-3.5 md:text-lg"
            onClick={() =>
              trackEvent('cta_click', {
                cta_location: 'how_build_section',
                link_url: '/apply#contact',
              })
            }
          >
            שיחת התאמה חינם
          </Link>
        </div>
      </div>
    </section>
  )
}
