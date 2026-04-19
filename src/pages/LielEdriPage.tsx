import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CosmicField } from '../components/CosmicField'
import { lielEdriOgImage } from '../data/clientOgImages'

const heroImage = lielEdriOgImage

const workItems = [
  'מיתוג ויזואלי וטיפוגרפיה עדינה',
  'ניווט פשוט ותפריט מתוקים בולט',
  'כפתורי פנייה, וואטסאפ ואינסטגרם',
  'התאמה למובייל ואופטימיזציה לתמונות',
] as const

function Section({
  id,
  title,
  children,
}: {
  id?: string
  title: string
  children: ReactNode
}) {
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

export function LielEdriPage() {
  return (
    <div className="relative isolate min-h-[100svh] w-full overflow-x-clip bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]">
      <CosmicField />
      <main
        className="relative z-10 pb-24 pt-20 supports-[min-height:100dvh]:min-h-[100dvh] md:pb-32"
        dir="rtl"
        lang="he"
      >
        <section className="relative flex min-h-[min(52vh,480px)] items-end justify-center overflow-hidden px-6 pb-14 pt-8 md:min-h-[56vh] md:items-center md:pb-20 md:pt-12">
          <img
            src={heroImage}
            alt="אתר Liel Edri — קינוחי בוטיק ביתיים"
            className="absolute inset-0 h-full w-full object-cover"
            width={1600}
            height={900}
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-slate-950/82 to-slate-950/45" />
          <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">Liel Edri</h1>
            <p
              lang="en"
              dir="ltr"
              className="mt-2 text-lg font-light italic tracking-wide text-amber-100/90 md:text-2xl"
            >
              Homemade Baking
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-200 md:mt-5 md:text-lg">
              קינוחי בוטיק ביתיים בעבודת יד עם חומרי גלם הכי איכותיים וטריים בשבילכם.
            </p>
          </div>
        </section>

        <Section id="problem" title="הבעיה">
          <p className="text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
            היה צורך באתר שישדר בוטיק, אמון וטריות — ויוביל בקלות לפניות ולהזמנות בוואטסאפ, בלי חיכוך ובלי רעש ויזואלי.
          </p>
        </Section>

        <Section id="solution" title="הפתרון">
          <p className="text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
            נבנה אתר נקי ואלגנטי עם צילום מזון חזק, היררכיה ברורה ואינטגרציה מהירה לוואטסאפ ולאינסטגרם — כדי שהמבקר ירגיש מיד את איכות המותג.
          </p>
        </Section>

        <Section id="work" title="מה עשיתי בפועל">
          <ul className="list-inside list-disc space-y-2 text-base leading-relaxed text-slate-300 marker:text-violet-400/80 md:text-lg">
            {workItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section id="result" title="התוצאה">
          <p className="text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
            אתר שמחזק אמון במותג ומגדיל פניות והזמנות דרך הערוצים הדיגיטליים.
          </p>
        </Section>

        <section className="px-6 pb-4 pt-8 md:pt-12">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-950/50 px-6 py-10 text-center ring-1 ring-white/[0.04] md:px-10 md:py-12">
            <p className="text-lg font-medium text-white md:text-xl">גם אתה רוצה אתר כזה?</p>
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
