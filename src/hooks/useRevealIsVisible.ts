import { type RefObject, useEffect } from 'react'

const DEFAULT_IO: IntersectionObserverInit = {
  root: null,
  rootMargin: '-56px 0px -8% 0px',
  threshold: 0.12,
}

let sharedObserver: IntersectionObserver | null = null

function getRevealObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        const t = e.target
        t.classList.add('is-visible')
        sharedObserver?.unobserve(t)
      }
    }, DEFAULT_IO)
  }
  return sharedObserver
}

/**
 * מוסיף את המחלקה `is-visible` לאלמנט כשנכנס ל-viewport (פעם אחת).
 * האנימציה עצמה ב-CSS על בסיס `.is-visible`.
 *
 * משתמש ב-IntersectionObserver יחיד לכל הרכיבים; אחרי reveal מבצעים `unobserve`
 * כדי להקטין עבודה של ה-IO.
 */
export function useRevealIsVisible(ref: RefObject<Element | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = getRevealObserver()
    if (!obs) {
      el.classList.add('is-visible')
      return
    }

    obs.observe(el)
    return () => {
      obs.unobserve(el)
    }
  }, [ref])
}
