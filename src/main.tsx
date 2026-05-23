import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { AccessibilityWidget } from './components/AccessibilityWidget'
import { AnalyticsListener } from './components/AnalyticsListener'
import { BootSplash } from './components/BootSplash'
import { CookieBanner } from './components/CookieBanner'
import { HeavyEffectsDomSync } from './components/HeavyEffectsDomSync'
import { AccessibilityProvider } from './context/AccessibilityContext'
import { AnalyticsConsentProvider } from './context/AnalyticsConsentContext'
import { HeavyEffectsReadyProvider } from './context/HeavyEffectsReadyContext'
import { PageTransitionProvider } from './context/PageTransitionContext'
import { hydrateAccessibilityPreferences } from './lib/accessibilityPreferences'
import { applyHeavyEffectsDomFlag } from './lib/heavyEffectsGuard'
import { installOverflowAudit } from './dev/overflowAudit'
import './index.css'
import App from './App.tsx'

hydrateAccessibilityPreferences()
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
              <AccessibilityProvider>
                <BootSplash>
                  <AnalyticsListener />
                  <App />
                </BootSplash>
                <CookieBanner />
                <AccessibilityWidget />
              </AccessibilityProvider>
            </AnalyticsConsentProvider>
          </PageTransitionProvider>
        </HeavyEffectsReadyProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
