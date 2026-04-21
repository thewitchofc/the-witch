import { useSyncExternalStore } from 'react'

const MOBILE_MQ = '(max-width: 767px)'

/** התאמות ביצועים למובייל (אותה נקודת שבירה כמו Spline וכו׳) */
export function useIsMobileViewport(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(MOBILE_MQ)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(MOBILE_MQ).matches,
    () => false,
  )
}
