import { LeadForm } from '../components/LeadForm'
import { CosmicField } from '../components/CosmicField'

export function ApplyPage() {
  return (
    <div
      className="relative isolate flex min-h-[100svh] w-full flex-col items-center justify-start overflow-x-clip bg-[#020617] pb-12 pt-20 text-white touch-manipulation md:justify-center md:pb-20 lg:pb-24 supports-[min-height:100dvh]:min-h-[100dvh]"
      dir="rtl"
      lang="he"
    >
      <CosmicField />
      <div
        id="contact"
        className="relative z-10 mx-auto w-full max-w-xl scroll-mt-24 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] md:max-w-2xl sm:pl-[max(1.5rem,env(safe-area-inset-left,0px))] sm:pr-[max(1.5rem,env(safe-area-inset-right,0px))]"
      >
        <LeadForm />
      </div>
    </div>
  )
}
