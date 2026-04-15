import { About } from '../components/About'
import { CosmicField } from '../components/CosmicField'

export function AboutPage() {
  return (
    <div className="relative isolate min-h-[100svh] w-full overflow-x-clip bg-[#020617] supports-[min-height:100dvh]:min-h-[100dvh]">
      <CosmicField />
      <div className="relative z-10 pt-20">
        <About />
      </div>
    </div>
  )
}
