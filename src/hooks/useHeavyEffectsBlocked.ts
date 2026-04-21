import { useSyncExternalStore } from 'react'
import { useLocation } from 'react-router-dom'
import {
  shouldBlockHeavyEffects,
  subscribeHeavyEffectsRelevantChanges,
} from '../lib/heavyEffectsGuard'

/**
 * ערך עדכני של shouldBlockHeavyEffects — מגיב ל-resize, רשת, reduced-motion וניווט (search).
 */
export function useHeavyEffectsBlocked(): boolean {
  const { search } = useLocation()

  return useSyncExternalStore(
    (onStoreChange) => subscribeHeavyEffectsRelevantChanges(onStoreChange),
    () => shouldBlockHeavyEffects(search),
    () => false,
  )
}
