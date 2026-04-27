import { useSyncExternalStore } from 'react'

/**
 * `(prefers-reduced-motion: reduce)` — בלי framer-motion;
 * SSR: false (הידרציה), אחרי mount מתעדכן.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') return () => {}
      const m = window.matchMedia('(prefers-reduced-motion: reduce)')
      m.addEventListener('change', onStoreChange)
      return () => m.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )
}
