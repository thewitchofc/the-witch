import { CustomLink } from './CustomLink'
import { useAnalyticsConsent } from '../context/AnalyticsConsentContext'

/** באנר הסכמה לעוגיות ול־Google Analytics, טעינת GA רק אחרי «אישור» */
export function CookieBanner() {
  const { consent, accept, decline } = useAnalyticsConsent()

  if (consent !== 'unknown') return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="הסכמה לשימוש בעוגיות ולמדידת תנועה"
      className="fixed bottom-0 left-0 right-0 z-[8000] border-t border-white/10 bg-slate-950/95 px-4 py-4 text-slate-200 shadow-[0_-8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md md:px-6 md:py-5"
      dir="rtl"
      lang="he"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <p className="text-pretty text-sm leading-relaxed text-slate-300 md:text-base">
          האתר משתמש בעוגיות לצורך תפקוד בסיסי ולשיפור החוויה. עם אישורך נטעין גם{' '}
          <span className="text-white">Google Analytics</span> למדידת תנועה אנונימית. פרטים במדיניות הפרטיות.
        </p>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
          <CustomLink
            to="/privacy"
            className="text-center text-sm font-medium text-cyan-300 underline-offset-2 hover:text-cyan-200 hover:underline"
          >
            מדיניות פרטיות
          </CustomLink>
          <div className="flex gap-2 sm:gap-3">
            <button
              type="button"
              className="min-h-[44px] flex-1 touch-manipulation rounded-xl border border-white/15 bg-slate-900/60 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/25 hover:bg-slate-800/80 sm:min-w-[7rem] sm:flex-none"
              onClick={decline}
            >
              דחייה
            </button>
            <button
              type="button"
              className="min-h-[44px] flex-1 touch-manipulation rounded-xl bg-gradient-to-l from-cyan-500 via-violet-500 to-fuchsia-500 px-4 py-2.5 text-sm font-medium text-white shadow-md transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80 sm:min-w-[7rem] sm:flex-none"
              onClick={accept}
            >
              אישור ומדידה
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
