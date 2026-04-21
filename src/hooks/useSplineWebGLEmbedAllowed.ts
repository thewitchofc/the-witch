import { useMemo, useSyncExternalStore } from 'react'
import { useLocation } from 'react-router-dom'
import { isSplineBlockedByUrlSearch, isSplineBlockedForAutomatedAudits } from '../lib/splineLabBlocked'

const MOBILE_MQ = '(max-width: 767px)'
const REDUCE_MOTION_MQ = '(prefers-reduced-motion: reduce)'

/**
 * האם להטמיע Spline: לא במובייל / reduced-motion / חיסכון בנתונים,
 * ולא בזמן ביקורת Lighthouse/PageSpeed או כש־URL מבקש (`?psi=1`, `?nospline`).
 */
export function useSplineWebGLEmbedAllowed(): boolean {
  const { search } = useLocation()

  const labBlocked = useMemo(
    () => isSplineBlockedForAutomatedAudits() || isSplineBlockedByUrlSearch(search),
    [search],
  )

  const envOk = useSyncExternalStore(
    (onChange) => {
      const mobile = window.matchMedia(MOBILE_MQ)
      const reduce = window.matchMedia(REDUCE_MOTION_MQ)
      mobile.addEventListener('change', onChange)
      reduce.addEventListener('change', onChange)
      return () => {
        mobile.removeEventListener('change', onChange)
        reduce.removeEventListener('change', onChange)
      }
    },
    () => {
      if (window.matchMedia(MOBILE_MQ).matches) return false
      if (window.matchMedia(REDUCE_MOTION_MQ).matches) return false
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      if (conn?.saveData) return false
      return true
    },
    () => false,
  )

  return envOk && !labBlocked
}
