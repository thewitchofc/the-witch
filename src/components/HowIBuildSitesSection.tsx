import { useRef } from 'react'
import { CustomLink } from './CustomLink'
import { trackEvent } from '../lib/analytics'
import { useRevealIsVisible } from '../hooks/useRevealIsVisible'
import { primaryCtaInnerClass, primaryCtaOuterClass } from '../lib/primaryCtaClasses'
import { lielEdriLiveUrl } from '../data/clientOgImages'

const caseStudy = {
  title: 'מקרה לדוגמה: Liel Edri — Homemade Baking',
  problem:
    'היה צורך באתר שישדר בוטיק, אמון וטריות, ויוביל בקלות לפניות בוואטסאפ בלי חיכוך ורעש ויזואלי.',
  improved:
    'אתר נקי ואלגנטי, צילום מזון, היררכיה ברורה ואינטגרציה לוואטסאפ ואינסטגרם, כדי שהמבקר ירגיש מיד את איכות המותג.',
  today: 'מותג אישי שמחזק אמון ומייצר פניות והזמנות דרך הערוצים הדיגיטליים.',
  href: '/projects/liel-edri',
  liveUrl: lielEdriLiveUrl,
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
  const sectionCtaRef = useRef<HTMLAnchorElement>(null)
  useRevealIsVisible(sectionCtaRef)

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
          <div className="mt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start md:gap-4">
            <CustomLink
              to={caseStudy.href}
              className="pointer-events-auto inline-flex min-h-[44px] items-center justify-center rounded-full border border-cyan-400/35 bg-slate-950/60 px-5 py-2.5 text-sm font-medium text-cyan-200 ring-1 ring-white/10 transition hover:border-cyan-400/50 hover:bg-slate-900/70 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 md:text-base"
            >
              לקריאת מקרה הבוחן המלא
            </CustomLink>
            <a
              href={caseStudy.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/15 bg-transparent px-5 py-2.5 text-sm font-medium text-slate-200 ring-1 ring-white/10 transition hover:border-white/25 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 md:text-base"
              onClick={() =>
                trackEvent('cta_click', {
                  cta_location: 'how_build_case_study_live_site',
                  link_url: caseStudy.liveUrl,
                })
              }
            >
              לצפייה באתר החי
            </a>
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
          <CustomLink
            ref={sectionCtaRef}
            to="/apply#contact"
            className={`hero-cta-reveal pointer-events-auto z-10 ${primaryCtaOuterClass}`}
            onClick={() =>
              trackEvent('cta_click', {
                cta_location: 'how_build_section',
                link_url: '/apply#contact',
              })
            }
          >
            <span className={`${primaryCtaInnerClass} md:py-3.5 md:text-lg`}>שיחת התאמה חינם</span>
          </CustomLink>
        </div>
      </div>
    </section>
  )
}
