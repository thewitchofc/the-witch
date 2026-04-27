import { PortfolioGrid } from '../components/Portfolio'
import { Seo } from '../components/Seo'
import { WhyItWorksDifferent } from '../components/WhyItWorksDifferent'

export function PortfolioPage() {
  return (
    <div className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]">
      <Seo
        title="תיק עבודות, The Witch"
        description="פרויקטים שבנויים להביא תוצאות: אתרים למסעדות, חנויות, מותגי בוטיק ועסקים מקומיים. עיצוב, קוד ומהירות טעינה."
        path="/portfolio"
      />
      <div
        className="pointer-events-none absolute -right-28 top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-28 top-72 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden
      />
      <main
        id="portfolio"
        className="relative z-10 mx-auto min-h-[100svh] max-w-6xl px-4 pb-24 pt-20 supports-[min-height:100dvh]:min-h-[100dvh] md:px-6 md:pb-32"
        dir="rtl"
        lang="he"
        aria-labelledby="portfolio-page-heading"
      >
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="mx-auto mb-4 w-fit rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1 text-xs font-medium text-cyan-100">
            עבודות שמראות תוצאה
          </p>
          <h1
            id="portfolio-page-heading"
            className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl"
          >
            לא רק איך האתר נראה. מה הוא גורם לאנשים לעשות.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
            כל פרויקט כאן נבנה סביב מטרה ברורה: אמון, פעולה ופנייה. העיצוב הוא רק חלק מהמערכת.
          </p>
          <p className="mx-auto mt-5 w-fit rounded-full border border-cyan-300/25 bg-cyan-300/[0.08] px-5 py-2.5 text-sm font-semibold leading-relaxed text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.10)] ring-1 ring-white/[0.05] md:text-base">
            לחוויה המלאה מומלץ לצפות באתרים דרך מחשב.
          </p>
        </header>

        <PortfolioGrid />

        <WhyItWorksDifferent />
      </main>
    </div>
  )
}
