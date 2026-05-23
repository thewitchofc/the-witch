import { useEffect } from 'react'
import { CustomLink } from './CustomLink'
import { useAnalyticsConsent } from '../context/AnalyticsConsentContext'
import { shouldShowCookieBanner } from '../lib/analytics'

/** באנר ראשון או «ניהול עוגיות» מהפוטר — אישור/דחייה נשמרים ב-localStorage */
export function CookieBanner() {
  const { consent, preferencesOpen, accept, decline, closePreferences } = useAnalyticsConsent()

  const isFirstVisit = shouldShowCookieBanner() && consent === 'unknown'
  const visible = isFirstVisit || preferencesOpen

  useEffect(() => {
    if (!preferencesOpen) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        closePreferences()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [preferencesOpen, closePreferences])

  if (!visible) return null

  const isManaging = preferencesOpen && consent !== 'unknown'

  function handleAccept() {
    accept()
    closePreferences()
  }

  function handleDecline() {
    decline()
    closePreferences()
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={isManaging ? 'ניהול העדפות עוגיות' : 'הסכמה לעוגיות ולתנאי שימוש'}
      className="fixed bottom-0 left-0 right-0 z-[10001] border-t border-white/10 bg-slate-950/95 px-4 py-4 text-slate-200 shadow-[0_-8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md md:px-6 md:py-5"
      dir="rtl"
      lang="he"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-start justify-between gap-3">
            <p className="text-base font-semibold text-white md:text-lg">
              {isManaging ? 'ניהול עוגיות' : 'יצא חם מהתנור'}
            </p>
            {isManaging ? (
              <button
                type="button"
                className="shrink-0 rounded-lg px-2 py-1 text-xs text-slate-400 transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80"
                onClick={closePreferences}
              >
                סגור
              </button>
            ) : null}
          </div>
          {isManaging ? (
            <p className="mb-2 text-sm font-medium text-cyan-200/90">
              {consent === 'granted'
                ? 'מצב נוכחי: עוגיות אנליטיות מאושרות'
                : 'מצב נוכחי: עוגיות אנליטיות כבויות'}
            </p>
          ) : null}
          <p className="text-pretty text-sm leading-relaxed text-slate-300 md:text-base">
            האתר משתמש בעוגיות לתפקוד ולשיפור החוויה. באישורך נטעין גם{' '}
            <span className="text-white">Google Analytics</span> ו־<span className="text-white">Meta Pixel</span>{' '}
            למדידת תנועה. הפרטים ב
            <CustomLink
              to="/privacy"
              className="font-medium text-cyan-300 underline-offset-2 hover:text-cyan-200 hover:underline"
            >
              מדיניות הפרטיות
            </CustomLink>{' '}
            וב
            <CustomLink
              to="/terms"
              className="font-medium text-cyan-300 underline-offset-2 hover:text-cyan-200 hover:underline"
            >
              תנאי השימוש
            </CustomLink>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
          <div className="flex gap-2 sm:gap-3">
            <button
              type="button"
              className="min-h-[44px] flex-1 touch-manipulation rounded-xl border border-white/15 bg-slate-900/60 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/25 hover:bg-slate-800/80 sm:min-w-[7rem] sm:flex-none"
              onClick={handleDecline}
            >
              בלי עוגיות, תודה
            </button>
            <button
              type="button"
              className="min-h-[44px] flex-1 touch-manipulation rounded-xl bg-gradient-to-l from-cyan-500 via-violet-500 to-fuchsia-500 px-4 py-2.5 text-sm font-medium text-white shadow-md transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80 sm:min-w-[11rem] sm:flex-none"
              onClick={handleAccept}
            >
              קראתי ומאשר/ת
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
