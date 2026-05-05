import { lazy, Suspense } from 'react'
import { CosmicField } from '../components/CosmicField'
import { Hero, HeroSpline } from '../components/Hero'
import { Seo } from '../components/Seo'

const WhyMe = lazy(() => import('../components/WhyMe'))
const HowIBuildSitesSection = lazy(() =>
  import('../components/HowIBuildSitesSection').then((m) => ({ default: m.HowIBuildSitesSection })),
)
const SeoContent = lazy(() => import('../components/SeoContent').then((m) => ({ default: m.SeoContent })))

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
        <Suspense fallback={null}>
          <WhyMe variant="stacked" />
        </Suspense>
        <Suspense fallback={null}>
          <HowIBuildSitesSection />
        </Suspense>
        <Suspense fallback={null}>
          <SeoContent />
        </Suspense>
      </div>
    </div>
  )
}
