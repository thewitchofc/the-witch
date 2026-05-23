import { useEffect, useId, useRef, useState } from 'react'
import { CustomLink } from './CustomLink'
import { useAccessibility } from '../context/AccessibilityContext'

function AccessibilityIcon() {
  return (
    <img
      src="/icons/accessibility.png"
      alt=""
      width={44}
      height={44}
      className="h-11 w-11 shrink-0 rounded-full object-cover"
      aria-hidden
      decoding="async"
    />
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
      className={`flex w-full min-h-[44px] items-start justify-between gap-3 rounded-xl border px-3 py-2.5 text-right transition touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80 ${
        pressed
          ? 'border-cyan-400/45 bg-cyan-500/15 text-white'
          : 'border-white/12 bg-slate-900/50 text-slate-200 hover:border-white/20 hover:bg-slate-900/70'
      }`}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{label}</span>
        <span className="mt-0.5 block text-xs leading-snug text-slate-400">{description}</span>
      </span>
      <span
        aria-hidden
        className={`mt-0.5 inline-flex h-6 w-11 shrink-0 rounded-full p-0.5 transition ${
          pressed ? 'bg-cyan-400' : 'bg-slate-600'
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white shadow transition ${pressed ? '-translate-x-5' : 'translate-x-0'}`}
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
      className="pointer-events-none fixed bottom-0 left-0 z-[10002] flex flex-col items-start gap-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))]"
    >
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
          className="pointer-events-auto w-[min(calc(100vw-1.5rem),20rem)] rounded-2xl border border-white/12 bg-slate-950/95 p-4 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          <div className="mb-3 flex items-start justify-between gap-2">
            <h2 id={titleId} className="text-base font-semibold text-white">
              התאמות נגישות
            </h2>
            <button
              type="button"
              className="rounded-lg px-2 py-1 text-xs text-slate-400 transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80"
              onClick={() => {
                setOpen(false)
                buttonRef.current?.focus()
              }}
            >
              סגור
            </button>
          </div>

          <div className="space-y-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-3">
              <p className="mb-2 text-sm font-medium text-white">גודל טקסט</p>
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/15 bg-slate-900/70 text-lg font-semibold text-white transition hover:border-cyan-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80 disabled:opacity-40"
                  onClick={decreaseFont}
                  disabled={prefs.fontScale === 0}
                  aria-label="הקטנת טקסט"
                >
                  A−
                </button>
                <span className="text-sm text-slate-300" aria-live="polite">
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
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/15 bg-slate-900/70 text-lg font-semibold text-white transition hover:border-cyan-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80 disabled:opacity-40"
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
              className="mt-1 w-full min-h-[44px] rounded-xl border border-white/15 bg-transparent px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/25 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80"
              onClick={resetPreferences}
            >
              איפוס לברירת מחדל
            </button>

            <CustomLink
              to="/accessibility"
              className="block text-center text-xs text-cyan-300 underline-offset-2 hover:text-cyan-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80"
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
        className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white p-0 shadow-[0_3px_12px_rgba(0,0,0,0.2)] ring-1 ring-black/10 transition hover:scale-105 hover:shadow-[0_4px_16px_rgba(0,0,0,0.26)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/90"
        aria-label="פתיחת תפריט נגישות"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        <AccessibilityIcon />
      </button>
    </div>
  )
}
