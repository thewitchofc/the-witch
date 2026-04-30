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

/** גלילת viewport — ב־Safari/iOS לעיתים `scroll` לא נשלח ל־documentElement; `window` אמין */
function scrollListenerTargets(scroller: Element | Window): EventTarget[] {
  if (scroller instanceof Window) return [window]
  if (scroller === document.documentElement || scroller === document.body) {
    return [window]
  }
  return [scroller]
}

function isViewportScroller(scroller: Element | Window): boolean {
  return (
    scroller instanceof Window ||
    scroller === document.documentElement ||
    scroller === document.body
  )
}

/**
 * כשגוללים מטה, רקע + טקסט ב-Hero נעלמים בהדרגה — הלוגו מחוץ לשכבות אלה כדי להישאר בבהירות מלאה (opacity לא "עוברת" לילדים).
 */
export function useHeroScrollFade(
  sectionRef: RefObject<HTMLElement | null>,
  backdropFadeRef: RefObject<HTMLElement | null>,
  foregroundFadeRef?: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    const section = sectionRef.current
    const backdropLayer = backdropFadeRef.current
    const foregroundLayer = foregroundFadeRef?.current ?? null
    if (!section || !backdropLayer) return
    const layers = foregroundLayer ? [backdropLayer, foregroundLayer] : [backdropLayer]

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const root = getScrollParent(section)
    const fadeRangePx = 200

    let raf = 0

    const apply = () => {
      const top = section.getBoundingClientRect().top
      const t = Math.max(0, Math.min(1, -top / fadeRangePx))
      const opacity = String(1 - t)
      const transform = `translate3d(0, ${-40 * t}px, 0)`
      for (const layer of layers) {
        layer.style.opacity = opacity
        layer.style.transform = transform
      }
    }

    const schedule = () => {
      if (raf !== 0) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        apply()
      })
    }

    apply()
    const scrollTargets = scrollListenerTargets(root)
    for (const target of scrollTargets) {
      target.addEventListener('scroll', schedule, { passive: true })
    }
    window.addEventListener('resize', schedule, { passive: true })

    const viewportScroll = isViewportScroller(root)
    const vv = window.visualViewport

    /** במומנטום (במיוחד iOS) אירועי scroll נדירים — IO + visualViewport + scrollend מחדדים סיום */
    const io = new IntersectionObserver(schedule, {
      root: null,
      threshold: Array.from({ length: 33 }, (_, i) => i / 32),
    })
    io.observe(section)

    if (viewportScroll) {
      document.addEventListener('scrollend', schedule, { passive: true })
      vv?.addEventListener('scroll', schedule, { passive: true })
      vv?.addEventListener('resize', schedule, { passive: true })
    } else if (root instanceof Element) {
      root.addEventListener('scrollend', schedule, { passive: true })
    }

    return () => {
      io.disconnect()
      for (const target of scrollTargets) {
        target.removeEventListener('scroll', schedule)
      }
      window.removeEventListener('resize', schedule)
      if (viewportScroll) {
        document.removeEventListener('scrollend', schedule)
        vv?.removeEventListener('scroll', schedule)
        vv?.removeEventListener('resize', schedule)
      } else if (root instanceof Element) {
        root.removeEventListener('scrollend', schedule)
      }
      if (raf !== 0) window.cancelAnimationFrame(raf)
      for (const layer of layers) {
        layer.style.removeProperty('opacity')
        layer.style.removeProperty('transform')
      }
    }
  }, [sectionRef, backdropFadeRef, foregroundFadeRef])
}
