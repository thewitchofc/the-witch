import { CustomLink } from '../components/CustomLink'
import { Seo } from '../components/Seo'
import { primaryCtaInnerClass, primaryCtaOuterClass } from '../lib/primaryCtaClasses'

export function ThankYouPage() {
  return (
    <div
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#020617] px-4 py-24 text-white supports-[min-height:100dvh]:min-h-[100dvh]"
      dir="rtl"
      lang="he"
    >
      <Seo
        title="הפרטים התקבלו, The Witch"
        description="תודה, הפרטים התקבלו. אעבור עליהם ואחזור עם המשך צעדים או שאלות ממוקדות."
        path="/thank-you"
      />
      <div
        className="pointer-events-none absolute -right-28 top-20 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-72 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden
      />

      <main className="relative z-10 mx-auto flex min-h-[calc(100svh-12rem)] max-w-3xl items-center justify-center">
        <section className="w-full rounded-3xl border border-violet-300/15 bg-gradient-to-l from-violet-500/[0.12] via-slate-950/75 to-cyan-500/[0.08] px-6 py-12 text-center shadow-[0_0_54px_rgba(139,92,246,0.14)] ring-1 ring-white/[0.05] backdrop-blur-xl md:px-10 md:py-16">
          <p className="mx-auto mb-4 w-fit rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-xs font-medium text-cyan-100">
            הבקשה נשלחה
          </p>
          <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            תודה, הפרטים התקבלו.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
            אעבור עליהם ואחזור אליך עם המשך צעדים או שאלות ממוקדות. אם יש התאמה, נתקדם לשיחה קצרה.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CustomLink to="/" className={primaryCtaOuterClass}>
              <span className={primaryCtaInnerClass}>חזרה לדף הבית</span>
            </CustomLink>
            <CustomLink
              to="/portfolio"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/15 bg-white/[0.035] px-6 py-3 text-sm font-medium text-slate-200 ring-1 ring-white/[0.06] transition hover:border-cyan-300/35 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 md:text-base"
            >
              לראות עבודות
            </CustomLink>
          </div>
        </section>
      </main>
    </div>
  )
}
