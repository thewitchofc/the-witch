import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/royal-fruit-hero.png?url'
import { CosmicField } from '../components/CosmicField'

const workItems = [
  'עיצוב ממשק משתמש (UI) נקי ורענן',
  'מערכת קטלוג מוצרים ידידותית',
  'אינטגרציה מלאה להזמנות בוואטסאפ',
  'אופטימיזציה של תמונות לטעינה מהירה',
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

export function RoyalFruitPage() {
  return (
    <div className="relative isolate min-h-[100svh] w-full overflow-x-clip bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]">
      <CosmicField />
      <main
        className="relative z-10 pb-24 pt-20 supports-[min-height:100dvh]:min-h-[100dvh] md:pb-32"
        dir="rtl"
        lang="he"
      >
        <section className="flex min-h-[min(52vh,480px)] flex-col items-stretch justify-end px-0 pb-14 pt-8 md:min-h-[56vh] md:pb-20 md:pt-12">
          <div className="w-full overflow-hidden border-y border-white/[0.07] bg-slate-950">
            <img
              src={heroImage}
              alt="Royal Fruit — לוגו ומיתוג האתר"
              className="h-[min(42vh,420px)] w-full object-cover object-center md:h-[min(48vh,480px)]"
              width={1200}
              height={630}
              decoding="async"
            />
          </div>
          <div className="relative z-10 mx-auto mt-10 w-full max-w-4xl px-6 text-center md:mt-12">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Royal Fruit
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-pretty text-base leading-relaxed text-slate-200 md:mt-4 md:text-lg">
              פירות וירקות טריים עד הבית, איכות גבוהה ואספקה יומית
            </p>
          </div>
        </section>

        <Section id="problem" title="הבעיה">
          <p className="text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
            הלקוח היה זקוק לפלטפורמה דיגיטלית שתאפשר הזמנה נוחה של תוצרת חקלאית טרייה ישירות לבית הלקוח, תוך שמירה על תדמית של איכות וטריות.
          </p>
        </Section>

        <Section id="solution" title="הפתרון">
          <p className="text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
            הקמת אתר מכירות (E-commerce) מעוצב עם חוויית משתמש פשוטה, חיבור ישיר לוואטסאפ להזמנות מהירות, ודגש ויזואלי על טריות המוצרים.
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
            אתר שמגדיל את כמות ההזמנות היומיות ומחזק את המותג כספק פרימיום של פירות וירקות.
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
