import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { AnalyticsListener } from './components/AnalyticsListener'
import { BootSplash } from './components/BootSplash'
import { CookieBanner } from './components/CookieBanner'
import { HeavyEffectsDomSync } from './components/HeavyEffectsDomSync'
import { AnalyticsConsentProvider } from './context/AnalyticsConsentContext'
import { HeavyEffectsReadyProvider } from './context/HeavyEffectsReadyContext'
import { PageTransitionProvider } from './context/PageTransitionContext'
import { applyHeavyEffectsDomFlag } from './lib/heavyEffectsGuard'
import { installOverflowAudit } from './dev/overflowAudit'
import './index.css'
import App from './App.tsx'

applyHeavyEffectsDomFlag()
const stopOverflowAudit = installOverflowAudit()
if (import.meta.hot) {
  import.meta.hot.dispose(() => stopOverflowAudit())
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <HeavyEffectsReadyProvider>
          <PageTransitionProvider>
            <HeavyEffectsDomSync />
            <AnalyticsConsentProvider>
              <BootSplash>
                <AnalyticsListener />
                <App />
              </BootSplash>
              <CookieBanner />
            </AnalyticsConsentProvider>
          </PageTransitionProvider>
        </HeavyEffectsReadyProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
