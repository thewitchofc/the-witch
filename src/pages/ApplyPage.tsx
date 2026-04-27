import { lazy, Suspense, useState } from 'react'
import { Seo } from '../components/Seo'
import { WhyItWorksDifferent } from '../components/WhyItWorksDifferent'

const LeadForm = lazy(() =>
  import('../components/LeadForm').then((m) => ({ default: m.LeadForm })),
)

const applyHighlights = [
  { title: 'פחות מדקה', body: 'טופס קצר שמספיק כדי להבין את כיוון הפרויקט.' },
  { title: 'בלי התחייבות', body: 'אם אין התאמה, אגיד את זה ברור. בלי למשוך זמן.' },
  { title: 'מענה ממוקד', body: 'אחזור עם המשך צעדים או שאלות מדויקות.' },
] as const

export function ApplyPage() {
  const [formStep, setFormStep] = useState(0)
  const showIntroCard = formStep === 0

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
          className={`mx-auto grid w-full scroll-mt-24 items-start gap-8 px-4 py-10 transition-[max-width] duration-300 sm:px-6 md:px-8 md:py-14 ${
            showIntroCard ? 'max-w-6xl md:grid-cols-[0.9fr_1.1fr] lg:gap-10' : 'max-w-3xl'
          }`}
          aria-labelledby="apply-heading"
        >
          <div
            className={`rounded-3xl border border-white/10 bg-slate-950/35 p-6 text-center shadow-[0_0_46px_rgba(139,92,246,0.12)] ring-1 ring-white/[0.04] backdrop-blur-xl transition-[opacity,transform] duration-300 md:p-7 md:text-right ${
              showIntroCard ? '' : 'hidden'
            }`}
          >
            <p className="mx-auto mb-4 w-fit rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-xs font-medium text-cyan-100 md:mx-0">
              בדיקת התאמה
            </p>
            <h2
              id="apply-heading"
              className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl"
            >
              בואו נראה אם האתר הבא שלך מתאים לבנייה איתי.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-300 md:mx-0 md:text-lg">
              כמה שאלות קצרות יעזרו להבין את העסק, המטרה והשלב שבו אתם נמצאים. אם יש התאמה, נתקדם לשיחה ממוקדת.
            </p>

            <div className="mt-7 grid gap-3">
              {applyHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-right ring-1 ring-white/[0.03]"
                >
                  <h3 className="text-sm font-semibold text-white md:text-base">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-2xl border border-violet-300/15 bg-violet-500/[0.07] p-4 text-center md:text-right">
              <p className="text-sm font-medium leading-relaxed text-violet-100 md:text-base">
                אני לא מוכרת זמן. אני מוכרת תוצאה, ולכן הבדיקה הזו קיימת.
              </p>
            </div>
          </div>

          <div className="w-full min-w-0">
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
                <LeadForm onStepChange={setFormStep} />
              </Suspense>
            </div>
          </div>
        </section>

        <div className="w-full">
          <WhyItWorksDifferent />
        </div>
      </div>
    </div>
  )
}
