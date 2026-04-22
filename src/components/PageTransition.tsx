import { usePageTransition } from '../context/PageTransitionContext'

/**
 * שכבת fade בין דפים — רק opacity + CSS transition, ללא framer-motion.
 * pointer-events-none כדי לא לחסום גלילה או אינטראקציה עם שכבות אחרות.
 */
export function PageTransition() {
  const { covered } = usePageTransition()

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[9990] bg-[#020617] transition-opacity duration-[380ms] ease-out motion-reduce:transition-none ${
        covered ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: covered
          ? 'radial-gradient(ellipse 120% 80% at 50% 20%, rgba(34, 211, 238, 0.06), transparent 55%), radial-gradient(ellipse 90% 60% at 80% 70%, rgba(167, 139, 250, 0.05), transparent 50%)'
          : undefined,
      }}
    />
  )
}
