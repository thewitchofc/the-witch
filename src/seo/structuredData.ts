import { FAQ_ITEMS } from '../data/faqContent'
import { SITE_ORIGIN } from './site'

const ORG_ID = `${SITE_ORIGIN}/#organization`
const PERSON_ID = `${SITE_ORIGIN}/#person`
const SERVICE_ID = `${SITE_ORIGIN}/#service`
const WEBSITE_ID = `${SITE_ORIGIN}/#website`

/** לוגו מלא — PNG לתאימות טובה יותר לתוצאות עשירות */
const LOGO_URL = `${SITE_ORIGIN}/logo.png`

function faqAnswerPlainText(answer: string): string {
  return answer.replace(/\s+/g, ' ').trim()
}

/** Organization + Person + Service + WebSite — לכל האתר */
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
        description: 'בניית אתרים בקוד מלא — מהירות, המרות וחוויית משתמש לעסקים.',
        worksFor: { '@id': ORG_ID },
      },
      {
        '@type': 'Service',
        '@id': SERVICE_ID,
        name: 'בניית אתרים',
        serviceType: 'Web development',
        description:
          'פיתוח אתרים מותאמים אישית בקוד מלא: ביצועים, SEO בסיסי, חוויית משתמש והנעה לפעולה — לעסקים שמחפשים פניות ולקוחות, לא רק תדמית.',
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

/** FAQPage — לדף /faq בלבד; התוכן תואם ל־FAQ_ITEMS בדף */
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
