import { CosmicField } from '../components/CosmicField'
import { Hero, HeroSpline } from '../components/Hero'
import { HowIBuildSitesSection } from '../components/HowIBuildSitesSection'
import { Seo } from '../components/Seo'
import { SeoContent } from '../components/SeoContent'
import WhyMe from '../components/WhyMe'

/** דף הבית, גלילה אנכית כשיש סקשנים מתחת ל-Hero */
export function HomePage() {
  return (
    <div className="relative flex min-h-[100svh] w-full flex-col overflow-x-hidden overflow-y-auto bg-[#020617] supports-[min-height:100dvh]:min-h-[100dvh]">
      <Seo
        title="The Witch, בניית אתרים שמביאים לקוחות"
        description="אתרים בקוד מלא שמביאים פניות, לא רק ביקורים. שיחת התאמה חינם ללא התחייבות: טופס קצר."
        path="/"
      />
      <HeroSpline src="https://my.spline.design/particlenebula-yMPUIhRUYftCj8iVtsWaBcG6/" />
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <CosmicField />
      </div>
      <div className="pointer-events-none relative z-[10] flex min-h-[100svh] flex-1 flex-col supports-[min-height:100dvh]:min-h-[100dvh]">
        <Hero layout="stacked" showCosmicField={false} />
        <WhyMe variant="stacked" />
        <HowIBuildSitesSection />
        <SeoContent />
      </div>
    </div>
  )
}
