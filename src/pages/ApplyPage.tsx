import { lazy, Suspense } from 'react'
import { Seo } from '../components/Seo'
import { WhyItWorksDifferent } from '../components/WhyItWorksDifferent'

const LeadForm = lazy(() =>
  import('../components/LeadForm').then((m) => ({ default: m.LeadForm })),
)

export function ApplyPage() {
  return (
    <div
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#020617] pb-12 pt-20 text-white touch-manipulation md:pb-20 lg:pb-24 supports-[min-height:100dvh]:min-h-[100dvh]"
      dir="rtl"
      lang="he"
    >
      <h1 className="sr-only">בדיקת התאמה לפרויקט, שליחת פרטים, The Witch</h1>
      <Seo
        title="הגשת בקשה לפרויקט, The Witch"
        description="מלאו טופס קצר לבדיקת התאמה: סוג העסק, יעדים ואתר קיים. אחזור אליכם עם המשך צעדים והערכת היקף."
        path="/apply"
      />
      <div
        className="pointer-events-none absolute -right-28 top-20 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-[32rem] h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.11),transparent_48%)]"
        aria-hidden
      />

      <div className="relative z-10 flex w-full flex-col items-center">
        <section
          id="contact"
          className="mx-auto w-full max-w-2xl scroll-mt-24 px-4 py-10 sm:px-6 md:px-8 md:py-14"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45 px-4 py-8 shadow-[0_0_48px_rgba(15,23,42,0.26)] ring-1 ring-white/[0.05] backdrop-blur-xl sm:px-6 md:px-8">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-cyan-300/70 to-transparent"
              aria-hidden
            />
            <Suspense
              fallback={
                <div
                  className="flex min-h-[280px] w-full items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-12 text-sm text-slate-400"
                  aria-busy="true"
                  aria-live="polite"
                >
                  טוען טופס…
                </div>
              }
            >
              <LeadForm />
            </Suspense>
          </div>
        </section>

        <div className="w-full">
          <WhyItWorksDifferent />
        </div>
      </div>
    </div>
  )
}
