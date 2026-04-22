import { type RefObject, useEffect } from 'react'

function getScrollParent(el: HTMLElement): Element | Window {
  let node: HTMLElement | null = el.parentElement
  for (; node; node = node.parentElement) {
    const { overflowY } = getComputedStyle(node)
    if (overflowY !== 'auto' && overflowY !== 'scroll' && overflowY !== 'overlay') continue
    if (node.scrollHeight > node.clientHeight + 1) return node
  }
  return window
}

/**
 * כשגוללים מטה, תוכן ה-Hero נעלם בהדרגה (opacity + translateY) למעבר חלק לסקשנים מתחת.
 * עדכון ישיר ל-DOM ב־rAF — בלי Framer Motion ובלי setState בכל גלילה.
 */
export function useHeroScrollFade(
  sectionRef: RefObject<HTMLElement | null>,
  fadeLayerRef: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    const section = sectionRef.current
    const layer = fadeLayerRef.current
    if (!section || !layer) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const root = getScrollParent(section)
    const fadeRangePx = 200

    let raf = 0

    const apply = () => {
      const top = section.getBoundingClientRect().top
      const t = Math.max(0, Math.min(1, -top / fadeRangePx))
      layer.style.opacity = String(1 - t)
      layer.style.transform = `translate3d(0, ${-40 * t}px, 0)`
    }

    const schedule = () => {
      if (raf !== 0) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        apply()
      })
    }

    apply()
    const scrollTarget: EventTarget = root instanceof Window ? window : root
    scrollTarget.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })

    return () => {
      scrollTarget.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf !== 0) window.cancelAnimationFrame(raf)
      layer.style.removeProperty('opacity')
      layer.style.removeProperty('transform')
    }
  }, [sectionRef, fadeLayerRef])
}
