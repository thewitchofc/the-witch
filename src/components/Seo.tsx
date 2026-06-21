import { Helmet } from 'react-helmet-async'
import { absoluteOgImage, DEFAULT_OG_IMAGE, siteCanonicalUrl } from '../seo/site'

type SeoProps = {
  title: string
  description: string
  /** נתיב React Router, למשל `/` או `/about` */
  path: string
  /** כתובת מלאה או נתיב יחסי לתמונת OG, יומר ל־URL מוחלט */
  ogImage?: string
  /** noindex,nofollow — לדפי 404 וכד׳ */
  noIndex?: boolean
  ogType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}

export function Seo({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  ogType = 'website',
  publishedTime,
  modifiedTime,
}: SeoProps) {
  const canonical = siteCanonicalUrl(path)
  const ogImageUrl = absoluteOgImage(ogImage)
  const ogIsDefaultCard = ogImageUrl === DEFAULT_OG_IMAGE

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      {ogIsDefaultCard ? <meta property="og:image:width" content="1200" /> : null}
      {ogIsDefaultCard ? <meta property="og:image:height" content="630" /> : null}
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="he_IL" />
      {publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}
      {modifiedTime ? <meta property="article:modified_time" content={modifiedTime} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  )
}
