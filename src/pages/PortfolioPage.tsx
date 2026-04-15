import { CosmicField } from '../components/CosmicField'
import { PortfolioGrid } from '../components/Portfolio'

export function PortfolioPage() {
  return (
    <div className="relative isolate min-h-[100svh] w-full overflow-x-clip bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]">
      <CosmicField />
      <main
        id="portfolio"
        className="relative z-10 mx-auto min-h-[100svh] max-w-6xl px-6 pb-24 pt-20 supports-[min-height:100dvh]:min-h-[100dvh] md:pb-32"
        dir="rtl"
        lang="he"
        aria-labelledby="portfolio-page-heading"
      >
        <h2
          id="portfolio-page-heading"
          className="mb-16 text-center text-2xl font-semibold tracking-tight text-white md:mb-20 md:text-4xl"
        >
          פרויקטים שבנויים להביא תוצאות
        </h2>

        <PortfolioGrid />
      </main>
    </div>
  )
}
