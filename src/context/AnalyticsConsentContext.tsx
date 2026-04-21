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
  readConsent,
  scheduleInjectGoogleAnalytics,
  writeConsent,
  type AnalyticsConsentStored,
} from '../lib/analytics'

export type AnalyticsConsentUi = 'unknown' | AnalyticsConsentStored

type Ctx = {
  consent: AnalyticsConsentUi
  accept: () => void
  decline: () => void
}

const AnalyticsConsentContext = createContext<Ctx | null>(null)

function initialConsent(): AnalyticsConsentUi {
  const r = readConsent()
  return r ?? 'unknown'
}

export function AnalyticsConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<AnalyticsConsentUi>(initialConsent)

  useEffect(() => {
    if (consent === 'granted') scheduleInjectGoogleAnalytics()
  }, [consent])

  const accept = useCallback(() => {
    writeConsent('granted')
    setConsent('granted')
  }, [])

  const decline = useCallback(() => {
    writeConsent('denied')
    setConsent('denied')
  }, [])

  const value = useMemo(() => ({ consent, accept, decline }), [consent, accept, decline])

  return <AnalyticsConsentContext.Provider value={value}>{children}</AnalyticsConsentContext.Provider>
}

export function useAnalyticsConsent(): Ctx {
  const v = useContext(AnalyticsConsentContext)
  if (!v) throw new Error('useAnalyticsConsent must be used within AnalyticsConsentProvider')
  return v
}
