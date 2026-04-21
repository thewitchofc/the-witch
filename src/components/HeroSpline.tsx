import { useEffect, useRef, useState } from 'react'
import { useSplineWebGLEmbedAllowed } from '../hooks/useSplineWebGLEmbedAllowed'

type HeroSplineProps = {
  src: string
}

/** טעינת iframe רק אחרי כניסה ל־viewport + idle — בלי setState ב־effect של הורה כש־Spline כבוי */
function HeroSplineActive({ src }: HeroSplineProps) {
  const [showSpline, setShowSpline] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let idleCbId = 0
    let fallbackTimeout: ReturnType<typeof setTimeout> | undefined
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        observer.disconnect()
        const mount = () => setShowSpline(true)
        if (typeof window.requestIdleCallback === 'function') {
          idleCbId = window.requestIdleCallback(mount, { timeout: 2800 })
        } else {
          fallbackTimeout = window.setTimeout(mount, 500)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px 120px 0px' },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (idleCbId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleCbId)
      }
      if (fallbackTimeout !== undefined) {
        window.clearTimeout(fallbackTimeout)
      }
    }
  }, [])

  return (
    <div ref={ref} className="absolute inset-0">
      {showSpline ? (
        <iframe
          src={src}
          loading="lazy"
          fetchPriority="low"
          width="100%"
          height="100%"
          title=""
          frameBorder={0}
        />
      ) : null}
    </div>
  )
}

/**
 * רקע Spline לדף הבית: בלי iframe במובייל / reduced-motion / חיסכון בנתונים /
 * ביקורת Lighthouse–PageSpeed (מונע קריסות) או `?psi=1` / `?nospline`.
 */
export function HeroSpline({ src }: HeroSplineProps) {
  const splineAllowed = useSplineWebGLEmbedAllowed()

  return (
    <div className="home-spline-bg spline-lazy-root" aria-hidden>
      {splineAllowed ? <HeroSplineActive src={src} /> : null}
    </div>
  )
}
