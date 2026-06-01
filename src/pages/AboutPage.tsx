import { About } from '../components/About'
import { Seo } from '../components/Seo'

export function AboutPage() {
  return (
    <div className="relative isolate min-h-[100svh] w-full min-w-0 bg-[#020617] supports-[min-height:100dvh]:min-h-[100dvh]">
      <Seo
        title="אודות, The Witch"
        description="מי עומדת מאחורי The Witch, איך אני עובדת, ולמה אתרים בקוד מלא מביאים תוצאות אחרות. שקיפות, איכות והתמקדות בהמרות."
        path="/about"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.11),transparent_48%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-16 h-80 w-80 translate-x-1/4 rounded-full bg-violet-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-0 top-[28rem] h-96 w-96 -translate-x-1/4 rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden
      />
      <div className="relative z-10 w-full min-w-0 max-w-full px-4 pt-20 pb-6 sm:px-6 md:px-10">
        <About />
      </div>
    </div>
  )
}
