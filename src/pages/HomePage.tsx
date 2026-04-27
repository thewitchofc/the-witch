import { CosmicField } from '../components/CosmicField'
import { Hero, HeroSpline } from '../components/Hero'
import { HowIBuildSitesSection } from '../components/HowIBuildSitesSection'
import { Seo } from '../components/Seo'
import { SeoContent } from '../components/SeoContent'
import WhyMe from '../components/WhyMe'

/** דף הבית — גלילה רק על מסמך (body/html), בלי scrollport כפול */
export function HomePage() {
  return (
    <div className="relative flex min-h-[100svh] w-full min-w-0 flex-col bg-[#020617] supports-[min-height:100dvh]:min-h-[100dvh]">
      <Seo
        title="The Witch, בניית אתרים שמביאים לקוחות"
        description="The Witch בונה אתרים בקוד מלא לעסקים שרוצים אתר מהיר, מדויק וממיר: אסטרטגיה, עיצוב, פיתוח וחוויית משתמש שמובילה לפנייה."
        path="/"
      />
      {/* CosmicField מתחת; Spline (נקודות/נבולה אינטראקטיבית) מעל — שני הברים היו z-0 ולכן ה-Cosmic כיסה את ה-iframe */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <CosmicField />
      </div>
      <HeroSpline src="https://my.spline.design/particlenebula-yMPUIhRUYftCj8iVtsWaBcG6/" />
      <div className="pointer-events-none relative z-[10] flex min-h-[100svh] min-w-0 flex-1 flex-col supports-[min-height:100dvh]:min-h-[100dvh]">
        <Hero layout="stacked" showCosmicField={false} />
        <WhyMe variant="stacked" />
        <HowIBuildSitesSection />
        <SeoContent />
      </div>
    </div>
  )
}
