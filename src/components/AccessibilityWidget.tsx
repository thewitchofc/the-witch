import { useEffect, useId, useRef, useState } from 'react'
import { CustomLink } from './CustomLink'
import { useAccessibility } from '../context/AccessibilityContext'
import { useAnalyticsConsent } from '../context/AnalyticsConsentContext'
import { shouldShowCookieBanner } from '../lib/analytics'

function AccessibilityIcon() {
  return (
    <picture>
      <source srcSet="/icons/accessibility.webp" type="image/webp" />
      <img
        src="/icons/accessibility.png"
        alt=""
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 rounded-full object-cover"
        aria-hidden
        decoding="async"
      />
    </picture>
  )
}

type ToggleRowProps = {
  label: string
  description: string
  pressed: boolean
  onToggle: () => void
}

function ToggleRow({ label, description, pressed, onToggle }: ToggleRowProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={pressed}
      onClick={onToggle}
      className={`flex w-full min-h-[40px] items-start justify-between gap-2 rounded-lg border px-2.5 py-2 text-right transition touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80 ${
        pressed
          ? 'border-cyan-400/45 bg-cyan-500/15 text-white'
          : 'border-white/12 bg-slate-900/50 text-slate-200 hover:border-white/20 hover:bg-slate-900/70'
      }`}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium leading-snug">{label}</span>
        <span className="mt-0.5 block text-[11px] leading-snug text-slate-400">{description}</span>
      </span>
      <span
        aria-hidden
        className={`mt-0.5 inline-flex h-5 w-9 shrink-0 rounded-full p-0.5 transition ${
          pressed ? 'bg-cyan-400' : 'bg-slate-600'
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white shadow transition ${pressed ? '-translate-x-4' : 'translate-x-0'}`}
        />
      </span>
    </button>
  )
}

/** כפתור צף + תפריט התאמות נגישות (נשמר ב-localStorage) */
export function AccessibilityWidget() {
  const panelId = useId()
  const titleId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const {
    prefs,
    increaseFont,
    decreaseFont,
    toggleHighContrast,
    toggleUnderlineLinks,
    toggleReduceMotion,
    toggleRelaxedLineHeight,
    toggleReadableFont,
    resetPreferences,
  } = useAccessibility()

  const { consent, preferencesOpen } = useAnalyticsConsent()
  const cookieBannerVisible =
    (shouldShowCookieBanner() && consent === 'unknown') || preferencesOpen
  const [allowBottomTransition, setAllowBottomTransition] = useState(false)

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setAllowBottomTransition(true))
    return () => window.cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (!open) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    panelRef.current?.focus()
  }, [open])

  return (
    <div
      className={`pointer-events-none fixed left-0 z-[10002] pl-[max(0.75rem,env(safe-area-inset-left))] ${
        allowBottomTransition ? 'transition-[bottom] duration-200' : ''
      } ${
        cookieBannerVisible
          ? 'bottom-[min(42vh,15.5rem)] pb-[max(0.75rem,env(safe-area-inset-bottom))]'
          : 'bottom-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]'
      }`}
    >
      <div className="relative pointer-events-none">
        {open ? (
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="false"
            aria-labelledby={titleId}
            tabIndex={-1}
            dir="rtl"
            lang="he"
            className="pointer-events-auto absolute bottom-full left-0 mb-2 w-[min(calc(100vw-1.25rem),16.5rem)] max-h-[min(70svh,22.5rem)] overflow-y-auto overscroll-contain rounded-xl border border-white/12 bg-slate-950/95 p-3 text-white shadow-[0_10px_32px_rgba(0,0,0,0.42)] backdrop-blur-md [scrollbar-width:thin]"
          >
          <div className="mb-2 flex items-start justify-between gap-2">
            <h2 id={titleId} className="text-sm font-semibold text-white">
              התאמות נגישות
            </h2>
            <button
              type="button"
              className="rounded-md px-1.5 py-0.5 text-[11px] text-slate-400 transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80"
              onClick={() => {
                setOpen(false)
                buttonRef.current?.focus()
              }}
            >
              סגור
            </button>
          </div>

          <div className="space-y-1.5">
            <div className="rounded-lg border border-white/10 bg-slate-900/40 p-2.5">
              <p className="mb-1.5 text-xs font-medium text-white">גודל טקסט</p>
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-md border border-white/15 bg-slate-900/70 text-base font-semibold text-white transition hover:border-cyan-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80 disabled:opacity-40"
                  onClick={decreaseFont}
                  disabled={prefs.fontScale === 0}
                  aria-label="הקטנת טקסט"
                >
                  A−
                </button>
                <span className="text-xs text-slate-300" aria-live="polite">
                  {prefs.fontScale === 0
                    ? 'רגיל'
                    : prefs.fontScale === 1
                      ? 'גדול'
                      : prefs.fontScale === 2
                        ? 'גדול יותר'
                        : 'הכי גדול'}
                </span>
                <button
                  type="button"
                  className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-md border border-white/15 bg-slate-900/70 text-base font-semibold text-white transition hover:border-cyan-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80 disabled:opacity-40"
                  onClick={increaseFont}
                  disabled={prefs.fontScale === 3}
                  aria-label="הגדלת טקסט"
                >
                  A+
                </button>
              </div>
            </div>

            <ToggleRow
              label="ניגודיות גבוהה"
              description="טקסט בהיר על רקע כהה, גבולות ברורים יותר"
              pressed={prefs.highContrast}
              onToggle={toggleHighContrast}
            />
            <ToggleRow
              label="הדגשת קישורים"
              description="קו תחתון לכל הקישורים"
              pressed={prefs.underlineLinks}
              onToggle={toggleUnderlineLinks}
            />
            <ToggleRow
              label="עצירת אנימציות"
              description="מפחית תנועה ואפקטים חזותיים"
              pressed={prefs.reduceMotion}
              onToggle={toggleReduceMotion}
            />
            <ToggleRow
              label="ריווח שורות מוגבר"
              description="קריאות טובה יותר לטקסט ארוך"
              pressed={prefs.relaxedLineHeight}
              onToggle={toggleRelaxedLineHeight}
            />
            <ToggleRow
              label="גופן קריא"
              description="גופן מערכת פשוט וברור"
              pressed={prefs.readableFont}
              onToggle={toggleReadableFont}
            />

            <button
              type="button"
              className="mt-0.5 w-full min-h-[40px] rounded-lg border border-white/15 bg-transparent px-2.5 py-2 text-xs font-medium text-slate-200 transition hover:border-white/25 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80"
              onClick={resetPreferences}
            >
              איפוס לברירת מחדל
            </button>

            <CustomLink
              to="/accessibility"
              className="block pt-0.5 text-center text-[11px] text-cyan-300 underline-offset-2 hover:text-cyan-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80"
              onClick={() => setOpen(false)}
            >
              הצהרת נגישות
            </CustomLink>
          </div>
          </div>
        ) : null}

        <button
          ref={buttonRef}
          type="button"
          className="pointer-events-auto relative z-[1] inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white p-0 shadow-[0_3px_12px_rgba(0,0,0,0.2)] ring-1 ring-black/10 transition hover:scale-105 hover:shadow-[0_4px_16px_rgba(0,0,0,0.26)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/90"
          aria-label="פתיחת תפריט נגישות"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          onClick={() => setOpen((v) => !v)}
        >
          <AccessibilityIcon />
        </button>
      </div>
    </div>
  )
}
