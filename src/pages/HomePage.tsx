import { CosmicField } from '../components/CosmicField'
import { Hero } from '../components/Hero'
import { LazySplineBackground } from '../components/LazySplineBackground'
import { Seo } from '../components/Seo'
import WhyMe from '../components/WhyMe'

/** דף הבית — כל התוכן במסך אחד, ממורכז, בלי גלילה אנכית. */
export function HomePage() {
  return (
    <div className="relative flex h-[100svh] max-h-[100svh] min-h-0 w-full flex-col overflow-x-hidden overflow-y-visible bg-[#020617] supports-[height:100dvh]:h-[100dvh] supports-[max-height:100dvh]:max-h-[100dvh]">
      <Seo
        title="The Witch — בניית אתרים שמביאים לקוחות"
        description="אתרים בקוד מלא שמייצרים פניות ולקוחות — מהירות, המרות וחוויית משתמש. בלי תבניות גנריות. בדיקת התאמה לפרויקט."
        path="/"
      />
      <LazySplineBackground
        rootClassName="home-spline-bg"
        src="https://my.spline.design/particlenebula-yMPUIhRUYftCj8iVtsWaBcG6/"
      />
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <CosmicField />
      </div>
      <div className="pointer-events-none relative z-[10] flex min-h-0 flex-1 flex-col">
        <Hero layout="stacked" showCosmicField={false} />
        <WhyMe variant="stacked" />
      </div>
    </div>
  )
}
