import { Hero } from '../components/Hero'

/** דף הבית — גלילה דרך html/body; גובה מינימלי מסך בלי נעילת overflow. */
export function HomePage() {
  return (
    <div className="flex min-h-[100svh] w-full flex-col pt-20 supports-[min-height:100dvh]:min-h-[100dvh]">
      <Hero />
    </div>
  )
}
