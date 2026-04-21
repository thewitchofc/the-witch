import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { AnalyticsListener } from './components/AnalyticsListener'
import { BootSplash } from './components/BootSplash'
import { CookieBanner } from './components/CookieBanner'
import { HeavyEffectsDomSync } from './components/HeavyEffectsDomSync'
import { AnalyticsConsentProvider } from './context/AnalyticsConsentContext'
import { applyHeavyEffectsDomFlag } from './lib/heavyEffectsGuard'
import './index.css'
import App from './App.tsx'

applyHeavyEffectsDomFlag()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <HeavyEffectsDomSync />
        <AnalyticsConsentProvider>
          <BootSplash>
            <AnalyticsListener />
            <App />
          </BootSplash>
          <CookieBanner />
        </AnalyticsConsentProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
