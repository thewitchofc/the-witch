import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  applyHeavyEffectsDomFlag,
  subscribeHeavyEffectsRelevantChanges,
} from '../lib/heavyEffectsGuard'

/** מסנכרן `data-block-heavy-effects` אחרי ניווט SPA ואחרי resize / רשת / reduced-motion */
export function HeavyEffectsDomSync() {
  const { search } = useLocation()

  useEffect(() => {
    applyHeavyEffectsDomFlag(search)
  }, [search])

  useEffect(() => {
    return subscribeHeavyEffectsRelevantChanges(() => {
      applyHeavyEffectsDomFlag()
    })
  }, [])

  return null
}
