import { applyHeavyEffectsDomFlag } from './heavyEffectsGuard'

export type FontScaleLevel = 0 | 1 | 2 | 3

export type AccessibilityPreferences = {
  fontScale: FontScaleLevel
  highContrast: boolean
  underlineLinks: boolean
  reduceMotion: boolean
  relaxedLineHeight: boolean
  readableFont: boolean
}

export const A11Y_FONT_SCALES = [1, 1.125, 1.25, 1.375] as const

export const A11Y_STORAGE_KEY = 'the-witch-a11y-prefs'

export const DEFAULT_A11Y_PREFERENCES: AccessibilityPreferences = {
  fontScale: 0,
  highContrast: false,
  underlineLinks: false,
  reduceMotion: false,
  relaxedLineHeight: false,
  readableFont: false,
}

function clampFontScale(value: unknown): FontScaleLevel {
  const n = typeof value === 'number' ? value : Number(value)
  if (n <= 0) return 0
  if (n === 1) return 1
  if (n === 2) return 2
  return 3
}

export function readAccessibilityPreferences(): AccessibilityPreferences {
  if (typeof window === 'undefined') return DEFAULT_A11Y_PREFERENCES
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY)
    if (!raw) return DEFAULT_A11Y_PREFERENCES
    const parsed = JSON.parse(raw) as Partial<AccessibilityPreferences>
    return {
      fontScale: clampFontScale(parsed.fontScale),
      highContrast: parsed.highContrast === true,
      underlineLinks: parsed.underlineLinks === true,
      reduceMotion: parsed.reduceMotion === true,
      relaxedLineHeight: parsed.relaxedLineHeight === true,
      readableFont: parsed.readableFont === true,
    }
  } catch {
    return DEFAULT_A11Y_PREFERENCES
  }
}

export function writeAccessibilityPreferences(prefs: AccessibilityPreferences) {
  try {
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(prefs))
  } catch {
    /* ignore */
  }
}

/** מחיל העדפות על `<html>` — בטוח ל-SSR (no-op בלי window) */
export function applyAccessibilityPreferences(prefs: AccessibilityPreferences) {
  if (typeof document === 'undefined') return
  const root = document.documentElement

  root.dataset.a11yFont = String(prefs.fontScale)
  root.style.setProperty('--a11y-font-scale', String(A11Y_FONT_SCALES[prefs.fontScale] ?? 1))
  root.toggleAttribute('data-a11y-high-contrast', prefs.highContrast)
  root.toggleAttribute('data-a11y-underline-links', prefs.underlineLinks)
  root.toggleAttribute('data-a11y-reduce-motion', prefs.reduceMotion)
  root.toggleAttribute('data-a11y-relaxed-line-height', prefs.relaxedLineHeight)
  root.toggleAttribute('data-a11y-readable-font', prefs.readableFont)

  if (prefs.reduceMotion) {
    root.dataset.blockHeavyEffects = '1'
  } else {
    applyHeavyEffectsDomFlag()
  }
}

export function hydrateAccessibilityPreferences() {
  applyAccessibilityPreferences(readAccessibilityPreferences())
}
