import { useEffect, useRef, useState } from 'react'
import { useSplineWebGLEmbedAllowed } from '../hooks/useSplineWebGLEmbedAllowed'

const MIN_VIEWPORT_PX = 768

type LazySplineBackgroundProps = {
  src: string
  /** Classes for the fixed wrapper (e.g. home-spline-bg, process-page-spline-bg). */
  rootClassName: string
}

/**
 * Desktop-only Spline embed: no iframe src until the block intersects the viewport,
 * then defers network/work to idle time. Placeholder is CSS (::before on .spline-lazy-root).
 */
export function LazySplineBackground({ src, rootClassName }: LazySplineBackgroundProps) {
  const splineEmbedAllowed = useSplineWebGLEmbedAllowed()
  const [showIframe, setShowIframe] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const scheduledRef = useRef(false)

  useEffect(() => {
    if (!splineEmbedAllowed) return

    const root = rootRef.current
    if (!root) return

    const mq = window.matchMedia(`(min-width: ${MIN_VIEWPORT_PX}px)`)
    let observer: IntersectionObserver | undefined
    let idleHandle: number | undefined

    const clearIdle = () => {
      if (idleHandle === undefined) return
      if (typeof cancelIdleCallback !== 'undefined') {
        cancelIdleCallback(idleHandle)
      } else {
        window.clearTimeout(idleHandle)
      }
      idleHandle = undefined
    }

    const scheduleShow = () => {
      if (scheduledRef.current) return
      scheduledRef.current = true
      const run = () => {
        if (!mq.matches) return
        setShowIframe(true)
      }
      if (typeof requestIdleCallback !== 'undefined') {
        idleHandle = requestIdleCallback(run, { timeout: 1200 })
      } else {
        idleHandle = window.setTimeout(run, 400)
      }
    }

    const applyMode = () => {
      clearIdle()
      scheduledRef.current = false
      observer?.disconnect()
      observer = undefined

      if (!mq.matches) {
        setShowIframe(false)
        return
      }

      observer = new IntersectionObserver(
        (entries) => {
          if (!mq.matches) return
          const visible = entries.some((e) => e.isIntersecting)
          if (!visible) return
          observer?.disconnect()
          observer = undefined
          scheduleShow()
        },
        { root: null, rootMargin: '120px 0px 120px 0px', threshold: 0.01 },
      )
      observer.observe(root)
    }

    applyMode()
    mq.addEventListener('change', applyMode)
    return () => {
      mq.removeEventListener('change', applyMode)
      observer?.disconnect()
      clearIdle()
    }
  }, [src, splineEmbedAllowed])

  return (
    <div ref={rootRef} className={`spline-lazy-root ${rootClassName}`.trim()} aria-hidden>
      {splineEmbedAllowed && showIframe ? (
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
