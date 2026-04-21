import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { trackEvent } from '../lib/analytics'
import { CosmicField } from '../components/CosmicField'
import { Seo } from '../components/Seo'
import { sabGlassOgImage } from '../data/clientOgImages'

/** תמונת ירו בדף, OG אחיד לכל האתר (`DEFAULT_OG_IMAGE` ב־Seo) */
const heroImage = sabGlassOgImage
const LIVE_SITE = 'https://sabglass.co.il/'

const workItems = [
  'UX שמוביל לפנייה',
  'מבנה דפים שמותאם להמרות',
  'SEO בסיסי נכון',
  'טעינה מהירה מאוד',
  'התאמה מלאה למובייל',
] as const

function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-white/[0.06] px-6 py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-white md:mb-5 md:text-2xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

export function SabGlassPage() {
  return (
    <div className="relative isolate min-h-[100svh] w-full overflow-x-clip bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]">
      <Seo
        title="מקרה בוחן: SAB Glass, The Witch"
        description="אתר למקלחוני זכוכית בהתאמה אישית: UX להמרות, מבנה דפים, SEO בסיסי וטעינה מהירה. תוצאות ולא רק תדמית."
        path="/projects/sab-glass"
      />
      <CosmicField />
      <main
        className="relative z-10 pb-24 pt-20 supports-[min-height:100dvh]:min-h-[100dvh] md:pb-32"
        dir="rtl"
        lang="he"
      >
        {/* 1. Hero */}
        <section className="relative flex min-h-[min(60vh,520px)] items-center justify-center overflow-hidden px-6 py-16 md:min-h-[62vh] md:py-24">
          <img
            src={heroImage}
            alt="אתר SAB Glass, מקלחוני זכוכית בהתאמה אישית"
            className="absolute inset-0 h-full w-full object-cover object-center"
            width={1600}
            height={900}
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/55 md:bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-slate-950/30" />
          <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
            <h1 className="text-balance text-2xl font-semibold leading-snug tracking-tight text-white md:text-4xl md:leading-snug lg:text-5xl">
              SAB Glass, אתר שמביא פניות, לא רק נראה טוב
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-100 md:mt-6 md:text-lg">
              מקלחוני זכוכית בהתאמה אישית עם אתר שבנוי להביא לקוחות חדשים מגוגל ולהמיר אותם לפניות.
            </p>
            <a
              href={LIVE_SITE}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="צפייה באתר SAB Glass החי (נפתח בלשונית חדשה)"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-full bg-white/10 px-8 py-3 text-base font-medium text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-white/15 hover:ring-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 md:mt-10"
            >
              צפה באתר →
            </a>
          </div>
        </section>

        <Section id="problem" title="הבעיה">
          <p className="text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
            העסק היה צריך נוכחות דיגיטלית שמייצרת פניות אמיתיות, לא עוד אתר תדמית שלא מביא תוצאות.
          </p>
        </Section>

        <Section id="solution" title="הפתרון">
          <p className="text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
            בניתי אתר מותאם אישית בקוד מלא, עם דגש על ביצועים, חוויית משתמש והנעה לפעולה. כל אלמנט נבנה מתוך מטרה אחת, להפוך מבקרים ללקוחות.
          </p>
        </Section>

        <Section id="work" title="מה עשיתי בפועל">
          <ul className="space-y-3 text-base leading-relaxed text-slate-300 md:text-lg">
            {workItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/80"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="result" title="התוצאה">
          <p className="text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
            האתר התחיל להביא פניות חדשות ולהגדיל את הנוכחות של העסק בגוגל.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            (אם בעתיד יש נתונים, ניתן להוסיף כאן)
          </p>
        </Section>

        <section className="border-t border-white/[0.06] px-6 py-14 md:py-20">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-950/50 px-6 py-10 text-center ring-1 ring-white/[0.04] md:px-10 md:py-12">
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              רוצה תוצאה כזו?
            </h2>
            <Link
              to="/apply"
              aria-label="בדיקת התאמה לפרויקט, מעבר לטופס"
              className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-slate-950/80 px-8 py-3 text-base font-medium text-white ring-1 ring-white/15 transition hover:bg-slate-900/90 hover:ring-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
              onClick={() => trackEvent('cta_click', { cta_location: 'sab_glass_footer', link_url: '/apply' })}
            >
              בדיקת התאמה לפרויקט
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
