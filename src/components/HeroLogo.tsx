import type { CSSProperties } from 'react'
import {
  SITE_LOGO_ASPECT_CLASS,
  SITE_LOGO_HEIGHT,
  SITE_LOGO_SRC,
  SITE_LOGO_WIDTH,
} from '../lib/siteLogo'

const logoFilterStyle: CSSProperties = {
  filter: [
    'brightness(0)',
    'invert(1)',
    'drop-shadow(0 0 12px rgba(255, 255, 255, 0.32))',
    'drop-shadow(0 0 36px rgba(248, 250, 252, 0.14))',
  ].join(' '),
  imageRendering: 'auto',
}

type HeroLogoProps = {
  stacked?: boolean
  /** BootSplash — גובה קבוע יחסית ל-viewport */
  splash?: boolean
  alt?: string
}

/** מיכל aspect-ratio + לוגו — מונע קפיצת layout בטעינת SVG */
export function HeroLogo({
  stacked = false,
  splash = false,
  alt = 'The Witch logo',
}: HeroLogoProps) {
  const widthClass = splash
    ? 'w-[min(72vw,280px)] sm:w-[min(68vw,320px)]'
    : stacked
      ? 'w-[min(88vw,272px)] md:w-[min(52vw,440px)] lg:w-[min(46vw,500px)]'
      : 'w-[min(90vw,300px)] sm:w-[min(88vw,320px)] md:w-[min(52vw,480px)]'

  return (
    <div className={`mx-auto shrink-0 ${SITE_LOGO_ASPECT_CLASS} ${widthClass}`}>
      <img
        src={SITE_LOGO_SRC}
        alt={alt}
        width={SITE_LOGO_WIDTH}
        height={SITE_LOGO_HEIGHT}
        decoding="sync"
        fetchPriority="high"
        className="h-full w-full object-contain object-center select-none brightness-0 invert"
        style={logoFilterStyle}
      />
    </div>
  )
}
