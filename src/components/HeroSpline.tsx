import { SplineOptInBackground } from './SplineOptInBackground'

type HeroSplineProps = {
  src: string
}

/** רקע Spline לדף הבית — נטען אוטומטית בכניסה כשאפקטים כבדים מותרים (לא במובייל צר / Lighthouse וכו׳) */
export function HeroSpline({ src }: HeroSplineProps) {
  return <SplineOptInBackground src={src} rootClassName="home-spline-bg" autoActivate />
}
