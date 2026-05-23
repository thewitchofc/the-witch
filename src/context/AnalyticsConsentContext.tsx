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
  applyConsentChoice,
  loadAnalyticsIfConsented,
  readConsent,
  type AnalyticsConsentStored,
} from '../lib/analytics'

export type AnalyticsConsentUi = 'unknown' | AnalyticsConsentStored

type Ctx = {
  consent: AnalyticsConsentUi
  preferencesOpen: boolean
  accept: () => void
  decline: () => void
  openPreferences: () => void
  closePreferences: () => void
}

const AnalyticsConsentContext = createContext<Ctx | null>(null)

function initialConsent(): AnalyticsConsentUi {
  const r = readConsent()
  return r ?? 'unknown'
}

export function AnalyticsConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<AnalyticsConsentUi>(initialConsent)
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  useEffect(() => {
    if (consent === 'granted') loadAnalyticsIfConsented()
  }, [consent])

  const accept = useCallback(() => {
    applyConsentChoice('granted')
    setConsent('granted')
  }, [])

  const decline = useCallback(() => {
    applyConsentChoice('denied')
    setConsent('denied')
  }, [])

  const openPreferences = useCallback(() => {
    setPreferencesOpen(true)
  }, [])

  const closePreferences = useCallback(() => {
    setPreferencesOpen(false)
  }, [])

  const value = useMemo(
    () => ({ consent, preferencesOpen, accept, decline, openPreferences, closePreferences }),
    [consent, preferencesOpen, accept, decline, openPreferences, closePreferences],
  )

  return <AnalyticsConsentContext.Provider value={value}>{children}</AnalyticsConsentContext.Provider>
}

export function useAnalyticsConsent(): Ctx {
  const v = useContext(AnalyticsConsentContext)
  if (!v) throw new Error('useAnalyticsConsent must be used within AnalyticsConsentProvider')
  return v
}
