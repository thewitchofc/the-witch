import { lazy, Suspense } from 'react'
import { CosmicField } from '../components/CosmicField'
import { LazySplineBackground } from '../components/LazySplineBackground'
import { Seo } from '../components/Seo'
import { WhyItWorksDifferent } from '../components/WhyItWorksDifferent'

const LeadForm = lazy(() =>
  import('../components/LeadForm').then((m) => ({ default: m.LeadForm })),
)

export function ApplyPage() {
  return (
    <div
      className="relative isolate flex min-h-[100svh] w-full flex-col items-center justify-start overflow-x-clip bg-[#020617] pb-12 pt-20 text-white touch-manipulation md:justify-center md:pb-20 lg:pb-24 supports-[min-height:100dvh]:min-h-[100dvh]"
      dir="rtl"
      lang="he"
    >
      <h1 className="sr-only">בדיקת התאמה לפרויקט, שליחת פרטים, The Witch</h1>
      <Seo
        title="הגשת בקשה לפרויקט, The Witch"
        description="מלאו טופס קצר לבדיקת התאמה: סוג העסק, יעדים ואתר קיים. אחזור אליכם עם המשך צעדים והערכת היקף."
        path="/apply"
      />
      <CosmicField />
      <LazySplineBackground
        rootClassName="apply-page-spline-bg"
        src="https://my.spline.design/particleaibrain-LcC5GIbOSWChW6OLPMzjZN2h/"
      />
      <div className="relative z-10 flex w-full flex-col items-center">
        <WhyItWorksDifferent />
        <div
          id="contact"
          className="mx-auto w-full max-w-xl scroll-mt-24 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:pl-[max(1.5rem,env(safe-area-inset-left,0px))] sm:pr-[max(1.5rem,env(safe-area-inset-right,0px))] md:max-w-2xl md:pl-[max(2rem,env(safe-area-inset-left,0px))] md:pr-[max(2rem,env(safe-area-inset-right,0px))] lg:max-w-3xl"
        >
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
      </div>
    </div>
  )
}
