import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CosmicField } from '../components/CosmicField'

const heroImage = '/portfolio/sab-glass-hero.png'
const LIVE_SITE = 'https://sabglass.co.il/'

const workItems = [
  'UX שמוביל לפנייה',
  'מבנה דפים שמותאם להמרות',
  'SEO בסיסי נכון',
  'טעינה מהירה מאוד',
  'התאמה מלאה למובייל',
] as const

function Section({
  id,
  title,
  children,
  wide,
}: {
  id?: string
  title: string
  children: ReactNode
  wide?: boolean
}) {
  return (
    <section id={id} className="border-t border-white/[0.06] px-6 py-14 md:py-20">
      <div className={wide ? 'mx-auto max-w-5xl' : 'mx-auto max-w-3xl'}>
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
            alt="אתר SAB Glass — מקלחוני זכוכית בהתאמה אישית"
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
              SAB Glass — אתר שמביא פניות, לא רק נראה טוב
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-100 md:mt-6 md:text-lg">
              מקלחוני זכוכית בהתאמה אישית עם אתר שבנוי להביא לקוחות חדשים מגוגל ולהמיר אותם לפניות.
            </p>
            <a
              href={LIVE_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-full bg-white/10 px-8 py-3 text-base font-medium text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-white/15 hover:ring-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 md:mt-10"
            >
              צפה באתר →
            </a>
          </div>
        </section>

        <Section id="problem" title="הבעיה">
          <p className="text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
            העסק היה צריך נוכחות דיגיטלית שמייצרת פניות אמיתיות — לא עוד אתר תדמית שלא מביא תוצאות.
          </p>
        </Section>

        <Section id="solution" title="הפתרון">
          <p className="text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
            בניתי אתר מותאם אישית בקוד מלא, עם דגש על ביצועים, חוויית משתמש והנעה לפעולה. כל אלמנט נבנה מתוך מטרה אחת — להפוך מבקרים ללקוחות.
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
            (אם בעתיד יש נתונים — ניתן להוסיף כאן)
          </p>
        </Section>

        <Section id="visuals" title="ויזואל" wide>
          <p className="mb-8 text-pretty text-sm leading-relaxed text-slate-400 md:text-base">
            מבט על האתר בדסקטופ ובמובייל — אותו מותג, חוויה עקבית בכל מסך.
          </p>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 ring-1 ring-white/[0.04]">
              <img
                src={heroImage}
                alt="SAB Glass — תצוגת דסקטופ"
                width={1200}
                height={720}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover object-top"
              />
              <figcaption className="border-t border-white/5 px-4 py-3 text-center text-xs text-slate-400 md:text-sm">
                דסקטופ
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 ring-1 ring-white/[0.04]">
              <div className="w-full max-w-[280px] p-4 md:max-w-[320px]">
                <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-slate-900 shadow-xl ring-4 ring-slate-950/80">
                  <img
                    src={heroImage}
                    alt="SAB Glass — תצוגת מובייל"
                    width={720}
                    height={1280}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[9/16] w-full object-cover object-[center_8%]"
                  />
                </div>
              </div>
              <figcaption className="mt-auto w-full border-t border-white/5 px-4 py-3 text-center text-xs text-slate-400 md:text-sm">
                מובייל
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 ring-1 ring-white/[0.04] md:col-span-2">
              <img
                src={heroImage}
                alt="SAB Glass — מבט רחב על דף הבית"
                width={1600}
                height={640}
                loading="lazy"
                decoding="async"
                className="aspect-[21/9] w-full object-cover object-[center_25%] md:aspect-[24/9]"
              />
              <figcaption className="border-t border-white/5 px-4 py-3 text-center text-xs text-slate-400 md:text-sm">
                מבט רחב על הירו והמסרים
              </figcaption>
            </figure>
          </div>
        </Section>

        <section className="border-t border-white/[0.06] px-6 py-14 md:py-20">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-950/50 px-6 py-10 text-center ring-1 ring-white/[0.04] md:px-10 md:py-12">
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              רוצה תוצאה כזו?
            </h2>
            <Link
              to="/apply"
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
