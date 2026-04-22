import { About } from '../components/About'
import { CosmicField } from '../components/CosmicField'
import { Seo } from '../components/Seo'

export function AboutPage() {
  return (
    <div className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#020617] supports-[min-height:100dvh]:min-h-[100dvh]">
      <Seo
        title="אודות, The Witch"
        description="מי עומדת מאחורי The Witch, איך אני עובדת, ולמה אתרים בקוד מלא מביאים תוצאות אחרות. שקיפות, איכות והתמקדות בהמרות."
        path="/about"
      />
      <CosmicField />
      <div className="relative z-10 w-full min-w-0 max-w-full px-4 pt-20 pb-6 sm:px-6 md:px-10">
        <About />
      </div>
    </div>
  )
}
