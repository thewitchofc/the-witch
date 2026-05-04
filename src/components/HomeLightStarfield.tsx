/**
 * כוכבים קלים ב-CSS בלבד — מוצג בדף הבית כשאפקטים כבדים חסומים (מובייל צר וכו׳),
 * במקום חלקיקי ה-CosmicField המלאים.
 */
function unitRand(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

const STAR_COUNT = 22

export function HomeLightStarfield() {
  return (
    <div className="home-light-starfield pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      {Array.from({ length: STAR_COUNT }, (_, i) => {
        const r = (k: number) => unitRand(i * 7919 + k)
        const left = r(1) * 100
        const top = r(2) * 100
        const size = 1.1 + r(3) * 2.35
        const dur = 18 + r(4) * 26
        const delay = r(5) * 10
        const dx = (r(6) - 0.5) * 18
        const dy = (r(7) - 0.5) * 14
        const lo = 0.12 + r(8) * 0.22
        const hi = 0.42 + r(9) * 0.48

        return (
          <span
            key={i}
            className="home-light-star home-light-star--drift"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              ['--hs-dur' as string]: `${dur}s`,
              ['--hs-delay' as string]: `${delay}s`,
              ['--hs-dx' as string]: `${dx}px`,
              ['--hs-dy' as string]: `${dy}px`,
              ['--hs-lo' as string]: String(lo),
              ['--hs-hi' as string]: String(hi),
            }}
          />
        )
      })}
    </div>
  )
}
