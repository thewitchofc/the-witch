import { useHeavyEffectsBlocked } from './useHeavyEffectsBlocked'

/**
 * האם מותר לטעון Spline, false כש-shouldBlockHeavyEffects (רשת חלשה, מובייל צר, וכו׳).
 */
export function useSplineWebGLEmbedAllowed(): boolean {
  return !useHeavyEffectsBlocked()
}
