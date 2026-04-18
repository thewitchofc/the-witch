import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { AboutPage } from './pages/AboutPage'
import { ApplyPage } from './pages/ApplyPage'
import { HomePage } from './pages/HomePage'
import { PortfolioPage } from './pages/PortfolioPage'
import { LielEdriPage } from './pages/LielEdriPage'
import { RoyalFruitPage } from './pages/RoyalFruitPage'
import { SabGlassPage } from './pages/SabGlassPage'
import { ProcessPage } from './pages/Process'
import FAQ from './pages/FAQ'

function App() {
  return (
    <>
      <Navbar />
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
      </Routes>
    </>
  )
}

export default App
