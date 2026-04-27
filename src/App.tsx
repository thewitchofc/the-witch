import { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { GlobalJsonLd } from './components/GlobalJsonLd'
import { PageTransition } from './components/PageTransition'
import { Navbar } from './components/Navbar'
import { SiteFooter } from './components/SiteFooter'
import {
  AboutPage,
  ApplyPage,
  FAQ,
  HamachshefaArticleClientsPage,
  HamachshefaPage,
  LielEdriPage,
  PortfolioPage,
  PrivacyPage,
  ProcessPage,
  RoyalFruitPage,
  SabGlassPage,
  SachiRamenPage,
  TermsPage,
} from './lazyRoutePages'
import { HomePage } from './pages/HomePage'

function RouteFallback() {
  return (
    <div
      className="flex min-h-[30vh] min-w-0 w-full max-w-full items-center justify-center bg-[#020617] px-4 text-sm text-slate-500"
      aria-busy="true"
      aria-live="polite"
    >
      טוען…
    </div>
  )
}

function RouteScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.startsWith('#') ? hash.slice(1) : hash
      if (!id) return
      const node = document.getElementById(id)
      if (node) {
        node.scrollIntoView({ block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <div className="flex min-h-[100svh] w-full min-w-0 flex-col bg-[#020617] supports-[min-height:100dvh]:min-h-[100dvh]">
      <GlobalJsonLd />
      <RouteScrollManager />
      <a
        href="#main-content"
        className="sr-only left-4 top-4 z-[10001] rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg ring-2 ring-cyan-400/60 focus:not-sr-only focus:fixed focus:outline-none"
      >
        דלג לתוכן הראשי
      </a>
      <Navbar />
      <main id="main-content" className="min-w-0 w-full max-w-full flex-1">
        <PageTransition />
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
            <Route path="/projects/sachi-ramen" element={<SachiRamenPage />} />
            <Route path="/order" element={<Navigate to="/apply#contact" replace />} />
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
    </div>
  )
}

export default App
