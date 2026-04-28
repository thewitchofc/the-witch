import { lazy } from 'react'

/**
 * דפים מחוץ לבית — כל `import()` נפרד = chunk נפרד (Vite + React.lazy).
 * דף הבית נטען מ-App.tsx בלי lazy כדי להקטין את ה־entry הראשוני.
 */
export const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
export const ApplyPage = lazy(() =>
  import('./pages/ApplyPage').then((m) => ({ default: m.ApplyPage })),
)
export const PortfolioPage = lazy(() =>
  import('./pages/PortfolioPage').then((m) => ({ default: m.PortfolioPage })),
)
export const LielEdriPage = lazy(() =>
  import('./pages/LielEdriPage').then((m) => ({ default: m.LielEdriPage })),
)
export const RoyalFruitPage = lazy(() =>
  import('./pages/RoyalFruitPage').then((m) => ({ default: m.RoyalFruitPage })),
)
export const SabGlassPage = lazy(() =>
  import('./pages/SabGlassPage').then((m) => ({ default: m.SabGlassPage })),
)
export const SachiRamenPage = lazy(() =>
  import('./pages/SachiRamenPage').then((m) => ({ default: m.SachiRamenPage })),
)
export const ProcessPage = lazy(() =>
  import('./pages/Process').then((m) => ({ default: m.ProcessPage })),
)
export const FAQ = lazy(() => import('./pages/FAQ'))
export const PrivacyPage = lazy(() =>
  import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })),
)
export const TermsPage = lazy(() =>
  import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })),
)
export const ThankYouPage = lazy(() =>
  import('./pages/ThankYouPage').then((m) => ({ default: m.ThankYouPage })),
)
export const HamachshefaPage = lazy(() => import('./pages/HamachshefaPage'))
export const HamachshefaArticleClientsPage = lazy(
  () => import('./pages/HamachshefaArticleClientsPage'),
)
