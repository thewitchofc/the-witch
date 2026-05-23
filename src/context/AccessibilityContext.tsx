/* eslint-disable react-refresh/only-export-components -- Provider + hook באותו מודול */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  applyAccessibilityPreferences,
  DEFAULT_A11Y_PREFERENCES,
  readAccessibilityPreferences,
  writeAccessibilityPreferences,
  type AccessibilityPreferences,
  type FontScaleLevel,
} from '../lib/accessibilityPreferences'

type AccessibilityContextValue = {
  prefs: AccessibilityPreferences
  setFontScale: (level: FontScaleLevel) => void
  increaseFont: () => void
  decreaseFont: () => void
  toggleHighContrast: () => void
  toggleUnderlineLinks: () => void
  toggleReduceMotion: () => void
  toggleRelaxedLineHeight: () => void
  toggleReadableFont: () => void
  resetPreferences: () => void
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null)

function persist(next: AccessibilityPreferences) {
  writeAccessibilityPreferences(next)
  applyAccessibilityPreferences(next)
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<AccessibilityPreferences>(() =>
    typeof window === 'undefined' ? DEFAULT_A11Y_PREFERENCES : readAccessibilityPreferences(),
  )

  useEffect(() => {
    applyAccessibilityPreferences(prefs)
  }, [prefs])

  const update = useCallback((patch: Partial<AccessibilityPreferences>) => {
    setPrefs((current) => {
      const next = { ...current, ...patch }
      persist(next)
      return next
    })
  }, [])

  const setFontScale = useCallback(
    (level: FontScaleLevel) => update({ fontScale: level }),
    [update],
  )

  const increaseFont = useCallback(() => {
    setPrefs((current) => {
      const nextScale = Math.min(3, current.fontScale + 1) as FontScaleLevel
      const next = { ...current, fontScale: nextScale }
      persist(next)
      return next
    })
  }, [])

  const decreaseFont = useCallback(() => {
    setPrefs((current) => {
      const nextScale = Math.max(0, current.fontScale - 1) as FontScaleLevel
      const next = { ...current, fontScale: nextScale }
      persist(next)
      return next
    })
  }, [])

  const toggleHighContrast = useCallback(() => {
    setPrefs((current) => {
      const next = { ...current, highContrast: !current.highContrast }
      persist(next)
      return next
    })
  }, [])

  const toggleUnderlineLinks = useCallback(() => {
    setPrefs((current) => {
      const next = { ...current, underlineLinks: !current.underlineLinks }
      persist(next)
      return next
    })
  }, [])

  const toggleReduceMotion = useCallback(() => {
    setPrefs((current) => {
      const next = { ...current, reduceMotion: !current.reduceMotion }
      persist(next)
      return next
    })
  }, [])

  const toggleRelaxedLineHeight = useCallback(() => {
    setPrefs((current) => {
      const next = { ...current, relaxedLineHeight: !current.relaxedLineHeight }
      persist(next)
      return next
    })
  }, [])

  const toggleReadableFont = useCallback(() => {
    setPrefs((current) => {
      const next = { ...current, readableFont: !current.readableFont }
      persist(next)
      return next
    })
  }, [])

  const resetPreferences = useCallback(() => {
    setPrefs(DEFAULT_A11Y_PREFERENCES)
    persist(DEFAULT_A11Y_PREFERENCES)
  }, [])

  const value = useMemo(
    () => ({
      prefs,
      setFontScale,
      increaseFont,
      decreaseFont,
      toggleHighContrast,
      toggleUnderlineLinks,
      toggleReduceMotion,
      toggleRelaxedLineHeight,
      toggleReadableFont,
      resetPreferences,
    }),
    [
      prefs,
      setFontScale,
      increaseFont,
      decreaseFont,
      toggleHighContrast,
      toggleUnderlineLinks,
      toggleReduceMotion,
      toggleRelaxedLineHeight,
      toggleReadableFont,
      resetPreferences,
    ],
  )

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>
}

export function useAccessibility(): AccessibilityContextValue {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider')
  return ctx
}
