import { Helmet } from 'react-helmet-async'
import { absoluteOgImage, DEFAULT_OG_IMAGE, siteCanonicalUrl } from '../seo/site'

type SeoProps = {
  title: string
  description: string
  /** נתיב React Router, למשל `/` או `/about` */
  path: string
  /** כתובת מלאה או נתיב יחסי לתמונת OG, יומר ל־URL מוחלט */
  ogImage?: string
}

export function Seo({ title, description, path, ogImage = DEFAULT_OG_IMAGE }: SeoProps) {
  const canonical = siteCanonicalUrl(path)
  const ogImageUrl = absoluteOgImage(ogImage)
  const ogIsDefaultCard = ogImageUrl === DEFAULT_OG_IMAGE

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      {ogIsDefaultCard ? <meta property="og:image:width" content="1200" /> : null}
      {ogIsDefaultCard ? <meta property="og:image:height" content="630" /> : null}
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="he_IL" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  )
}
