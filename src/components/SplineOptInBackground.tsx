import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSplineWebGLEmbedAllowed } from '../hooks/useSplineWebGLEmbedAllowed'
import { trackEvent } from '../lib/analytics'
import { isHomePath } from '../lib/cosmicFieldAllowlist'

const DEFAULT_ACTIVATE_LABEL = 'הפעל אפקט'

export type SplineOptInBackgroundProps = {
  src: string
  /** למשל `home-spline-bg`, `apply-page-spline-bg` */
  rootClassName: string
  activateLabel?: string
  /** כש־true: טוען את ה־iframe מיד בכניסה (אם `useSplineWebGLEmbedAllowed`), בלי כפתור */
  autoActivate?: boolean
}

/** רקע סטטי (גרדיאנטים) במקום Spline כשאפקטים כבדים חסומים או לפני opt-in */
function SplineStaticBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      aria-hidden
    >
      <div className="absolute -top-[42%] inset-x-0 h-[92%] w-full overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.58] blur-[76px] will-change-[transform,filter]"
          style={{
            background: [
              'radial-gradient(ellipse 72% 58% at 50% 0%, rgba(167, 139, 250, 0.38) 0%, transparent 56%)',
              'radial-gradient(ellipse 58% 48% at 72% 42%, rgba(34, 211, 238, 0.2) 0%, transparent 54%)',
              'radial-gradient(ellipse 52% 44% at 22% 52%, rgba(244, 114, 182, 0.16) 0%, transparent 50%)',
            ].join(', '),
          }}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_88%,rgba(15,23,42,0.55),transparent_62%)] opacity-90" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[4px] will-change-[transform,filter]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            'radial-gradient(1.5px 1.5px at 18% 28%, rgba(255,255,255,0.45), transparent), radial-gradient(1px 1px at 78% 62%, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 44% 84%, rgba(196,181,253,0.35), transparent)',
          backgroundSize: '100% 100%',
        }}
      />
    </div>
  )
}

/**
 * רקע Spline: placeholder (רקע, blur, glow) עד הפעלה.
 * `autoActivate` — טעינת iframe בכניסה כשמותר WebGL; אחרת כפתור ״הפעל אפקט״.
 * כשאפקטים כבדים חסומים: רק fallback סטטי, בלי iframe וללא כפתור.
 */
export function SplineOptInBackground({
  src,
  rootClassName,
  activateLabel = DEFAULT_ACTIVATE_LABEL,
  autoActivate = false,
}: SplineOptInBackgroundProps) {
  const { pathname } = useLocation()
  const splineAllowed = useSplineWebGLEmbedAllowed()
  const [activated, setActivated] = useState(false)
  const autoActivationLogged = useRef(false)
  const isHome = isHomePath(pathname)

  useEffect(() => {
    if (!isHome || !autoActivate || !splineAllowed) return
    const id = window.requestAnimationFrame(() => {
      setActivated(true)
      if (!autoActivationLogged.current) {
        autoActivationLogged.current = true
        trackEvent('spline_opt_in_activate', { surface: rootClassName, activation: 'auto' })
      }
    })
    return () => window.cancelAnimationFrame(id)
  }, [isHome, autoActivate, splineAllowed, rootClassName])

  const onActivate = useCallback(() => {
    trackEvent('spline_opt_in_activate', { surface: rootClassName, activation: 'click' })
    setActivated(true)
  }, [rootClassName])

  if (!isHome) {
    return null
  }

  const showStaticBackdrop = !activated

  return (
    <>
      <div className={`spline-lazy-root ${rootClassName}`.trim()}>
        {showStaticBackdrop ? <SplineStaticBackdrop /> : null}

        {splineAllowed && activated ? (
          <iframe
            src={src}
            loading="eager"
            fetchPriority="high"
            width="100%"
            height="100%"
            title="אפקט רקע תלת־ממדי"
            frameBorder={0}
          />
        ) : null}
      </div>

      {splineAllowed && !activated && !autoActivate ? (
        <div
          className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom,0px))] z-40 flex justify-center px-4"
          role="presentation"
        >
          <div className="flex w-full max-w-md justify-center">
            <button
              type="button"
              onClick={onActivate}
              className="pointer-events-auto touch-manipulation rounded-full border border-white/20 bg-slate-950/75 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(139,92,246,0.25),0_0_48px_rgba(34,211,238,0.12)] ring-1 ring-inset ring-white/10 backdrop-blur-md transition hover:border-cyan-400/35 hover:bg-slate-900/85 hover:shadow-[0_0_28px_rgba(139,92,246,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80 active:opacity-95 md:px-6 md:py-3 md:text-base"
              aria-label="הפעלת אפקט רקע תלת־ממדי (נטען תוכן כבד)"
            >
              {activateLabel}
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
