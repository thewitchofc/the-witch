import { FAQ_ITEMS } from '../data/faqContent'
import { blogArticlePath, getPublishedBlogPosts, type BlogPost } from '../data/blogPosts'
import { SITE_ORIGIN } from './site'

const ORG_ID = `${SITE_ORIGIN}/#organization`
const PERSON_ID = `${SITE_ORIGIN}/#person`
const SERVICE_ID = `${SITE_ORIGIN}/#service`
const WEBSITE_ID = `${SITE_ORIGIN}/#website`

/** לוגו מרובע מהמותג, לתוצאות חיפוש ו־Knowledge Panel */
const LOGO_URL = `${SITE_ORIGIN}/favicon-192.png`

function faqAnswerPlainText(answer: string): string {
  return answer.replace(/\s+/g, ' ').trim()
}

/** Organization + Person + Service + WebSite, לכל האתר */
export function buildGlobalSchemaGraph(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'The Witch',
        url: SITE_ORIGIN,
        logo: {
          '@type': 'ImageObject',
          url: LOGO_URL,
        },
        inLanguage: 'he-IL',
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'The Witch',
        url: SITE_ORIGIN,
        jobTitle: 'מפתחת אתרים',
        description: 'בניית אתרים בקוד מלא, מהירות, המרות וחוויית משתמש לעסקים.',
        worksFor: { '@id': ORG_ID },
      },
      {
        '@type': 'Service',
        '@id': SERVICE_ID,
        name: 'בניית אתרים',
        serviceType: 'Web development',
        description:
          'פיתוח אתרים מותאמים אישית בקוד מלא: ביצועים, SEO בסיסי, חוויית משתמש והנעה לפעולה, לעסקים שמחפשים פניות ולקוחות, לא רק תדמית.',
        provider: { '@id': ORG_ID },
        areaServed: {
          '@type': 'Country',
          name: 'Israel',
        },
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: `${SITE_ORIGIN}/apply`,
        },
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_ORIGIN,
        name: 'The Witch',
        inLanguage: 'he-IL',
        publisher: { '@id': ORG_ID },
      },
    ],
  }
}

/** FAQPage, לדף /faq בלבד; התוכן תואם ל־FAQ_ITEMS בדף */
export function buildFaqPageJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqAnswerPlainText(item.answer),
      },
    })),
  }
}

/** Blog — דף /blog */
export function buildBlogListingJsonLd(): Record<string, unknown> {
  const posts = getPublishedBlogPosts()

  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'בלוג The Witch',
    description: 'תובנות על בניית אתרים, המרות וחשיבה עסקית.',
    url: `${SITE_ORIGIN}/blog`,
    inLanguage: 'he-IL',
    publisher: { '@id': ORG_ID },
    author: { '@id': PERSON_ID },
    blogPost: posts.map((post) => blogPostingSummary(post)),
  }
}

/** BlogPosting — דף מאמר בודד */
export function buildBlogArticleJsonLd(post: BlogPost): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: 'he-IL',
    url: `${SITE_ORIGIN}${blogArticlePath(post.slug)}`,
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: `${SITE_ORIGIN}${blogArticlePath(post.slug)}`,
  }
}

function blogPostingSummary(post: BlogPost): Record<string, unknown> {
  return {
    '@type': 'BlogPosting',
    headline: post.title,
    url: `${SITE_ORIGIN}${blogArticlePath(post.slug)}`,
    datePublished: post.publishedAt,
  }
}
