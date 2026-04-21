import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { GlobalJsonLd } from './components/GlobalJsonLd'
import { Navbar } from './components/Navbar'
import { SiteFooter } from './components/SiteFooter'
import { HomePage } from './pages/HomePage'

const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const ApplyPage = lazy(() =>
  import('./pages/ApplyPage').then((m) => ({ default: m.ApplyPage })),
)
const PortfolioPage = lazy(() =>
  import('./pages/PortfolioPage').then((m) => ({ default: m.PortfolioPage })),
)
const LielEdriPage = lazy(() =>
  import('./pages/LielEdriPage').then((m) => ({ default: m.LielEdriPage })),
)
const RoyalFruitPage = lazy(() =>
  import('./pages/RoyalFruitPage').then((m) => ({ default: m.RoyalFruitPage })),
)
const SabGlassPage = lazy(() =>
  import('./pages/SabGlassPage').then((m) => ({ default: m.SabGlassPage })),
)
const ProcessPage = lazy(() =>
  import('./pages/Process').then((m) => ({ default: m.ProcessPage })),
)
const FAQ = lazy(() => import('./pages/FAQ'))
const PrivacyPage = lazy(() =>
  import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })),
)
const TermsPage = lazy(() =>
  import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })),
)
const HamachshefaPage = lazy(() => import('./pages/HamachshefaPage'))
const HamachshefaArticleClientsPage = lazy(() => import('./pages/HamachshefaArticleClientsPage'))

function RouteFallback() {
  return (
    <div
      className="flex min-h-[30vh] items-center justify-center bg-[#020617] px-4 text-sm text-slate-500"
      aria-busy="true"
      aria-live="polite"
    >
      טוען…
    </div>
  )
}

function App() {
  return (
    <>
      <GlobalJsonLd />
      <a
        href="#main-content"
        className="sr-only left-4 top-4 z-[10001] rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg ring-2 ring-cyan-400/60 focus:not-sr-only focus:fixed focus:outline-none"
      >
        דלג לתוכן הראשי
      </a>
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/projects/sab-glass" element={<SabGlassPage />} />
            <Route path="/projects/royal-fruit" element={<RoyalFruitPage />} />
            <Route path="/projects/liel-edri" element={<LielEdriPage />} />
            <Route path="/apply" element={<ApplyPage />} />
            <Route path="/hamachshefa-bniyat-atarim" element={<HamachshefaPage />} />
            <Route
              path="/hamachshefa-bniyat-atarim-eich-livchor-atar-shmevi-lakochot"
              element={<HamachshefaArticleClientsPage />}
            />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}

export default App
