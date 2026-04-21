/**
 * תאימות לאחור, הלוגיקה המרכזית ב־`heavyEffectsGuard.ts`.
 */

import {
  parseHeavyEffectsFromSearch,
  shouldBlockHeavyEffects,
} from './heavyEffectsGuard'

/** @deprecated השתמש ב-shouldBlockHeavyEffects */
export function isSplineBlockedForAutomatedAudits(): boolean {
  return shouldBlockHeavyEffects()
}

/** @deprecated השתמש ב-shouldBlockHeavyEffects */
export function isAutomatedLabEnvironment(): boolean {
  return shouldBlockHeavyEffects()
}

/** רק פרמטרי URL (psi / nospline) */
export function isSplineBlockedByUrlSearch(search: string): boolean {
  return parseHeavyEffectsFromSearch(search)
}
