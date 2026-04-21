import { SplineOptInBackground } from './SplineOptInBackground'

type HeroSplineProps = {
  src: string
}

/** רקע Spline לדף הבית — טעינת iframe רק אחרי לחיצה על ״הפעל אפקט״ */
export function HeroSpline({ src }: HeroSplineProps) {
  return <SplineOptInBackground src={src} rootClassName="home-spline-bg" />
}
