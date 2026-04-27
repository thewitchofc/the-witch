import { type RefObject, useEffect } from 'react'

const DEFAULT_IO: IntersectionObserverInit = {
  root: null,
  rootMargin: '-56px 0px -8% 0px',
  /** 0.01 — אלמנטים קטנים/חתוכים בקצה (לוגו מובייל + overflow ב-Hero) עדיין מקבלים is-visible */
  threshold: 0.01,
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
    let fallbackId: ReturnType<typeof setTimeout> | undefined

    const revealNow = () => {
      el.classList.add('is-visible')
    }

    const obs = getRevealObserver()
    if (!obs) {
      revealNow()
      return
    }

    // Fallback: במקרים נדירים IO לא יורה (למשל race בזמן hydration/HMR).
    // לא משאירים את האלמנט שקוף לנצח.
    fallbackId = window.setTimeout(revealNow, 700)
    obs.observe(el)
    return () => {
      if (fallbackId !== undefined) window.clearTimeout(fallbackId)
      obs.unobserve(el)
    }
  }, [ref])
}
