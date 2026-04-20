import { Route, Routes } from 'react-router-dom'
import { GlobalJsonLd } from './components/GlobalJsonLd'
import { Navbar } from './components/Navbar'
import { SiteFooter } from './components/SiteFooter'
import { AboutPage } from './pages/AboutPage'
import { ApplyPage } from './pages/ApplyPage'
import { HomePage } from './pages/HomePage'
import { PortfolioPage } from './pages/PortfolioPage'
import { LielEdriPage } from './pages/LielEdriPage'
import { RoyalFruitPage } from './pages/RoyalFruitPage'
import { SabGlassPage } from './pages/SabGlassPage'
import { ProcessPage } from './pages/Process'
import FAQ from './pages/FAQ'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'

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
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  )
}

export default App
