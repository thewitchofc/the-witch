/**
 * מאמרי הבלוג — מקור האמת לכל התוכן.
 *
 * איך לפרסם מאמר חדש:
 * 1. הוסיפי אובייקט ל-BLOG_POSTS (published: true, body עם blocks)
 * 2. הוסיפי נתיב prerender ב-scripts/prerender-routes.mjs → BLOG_ARTICLE_PRERENDER_ROUTES
 * 3. הוסיפי URL ל-public/sitemap.xml
 */

export type BlogPostBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'list'; ordered?: boolean; items: readonly string[] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'callout'; title?: string; text: string }

export type BlogPost = {
  /** נתיב ייחודי — /blog/{slug} */
  slug: string
  title: string
  /** תיאור SEO + OG (עד ~160 תווים) */
  description: string
  /** תקציר לכרטיס ברשימת המאמרים */
  excerpt: string
  /** תאריך פרסום — YYYY-MM-DD */
  publishedAt: string
  updatedAt?: string
  tags?: readonly string[]
  /** false = טיוטה — לא יוצג באתר */
  published: boolean
  ogImage?: string
  body: readonly BlogPostBlock[]
}

/** מאמרים */
export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: 'kama-ole-bniyat-atar-la-esek-2026',
    title: 'כמה עולה בניית אתר לעסק ב 2026?',
    description:
      'כששואלים אותי כמה עולה אתר, אין תשובה אחת. מה שבאמת קובע את המחיר, ולמה לא כדאי להסתכל רק על הסכום.',
    excerpt:
      'אין מחיר אחד לבניית אתר. זה תלוי במי בונה, איך בונים, ומה באמת צריך. וזו טעות גדולה לחשוב שאתר זה רק עיצוב.',
    publishedAt: '2026-05-23',
    published: true,
    tags: ['מחיר אתר', 'בניית אתרים'],
    body: [
      {
        type: 'paragraph',
        text: 'כששואלים אותי כמה עולה אתר, התשובה הראשונה שלי היא שאין תשובה אחת.',
      },
      {
        type: 'paragraph',
        text: 'אתר יכול לעלות 2,000 ש"ח, 5,000 ש"ח, 10,000 ש"ח ואפילו 20,000 ש"ח ויותר. וזה לא סתם טווח רחב. זה באמת מה שאני רואה בשטח.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'במה תלוי המחיר?',
      },
      {
        type: 'paragraph',
        text: 'המחיר תלוי בהרבה גורמים, ואלה הדברים שאני תמיד שואלת עליהם לפני שאפילו מתחילים לדבר על מספר:',
      },
      {
        type: 'list',
        items: [
          'מי בונה את האתר?',
          'באיזה פלטפורמה בונים את האתר?',
          'האם מדובר באתר תבנית או אתר בקוד מותאם אישית?',
          'כמה עמודים יש באתר?',
          'האם זה דף נחיתה, אתר תדמית, אתר מכירתי או חנות?',
          'האם יש בלוג ומאמרים?',
          'האם יש סליקה?',
          'האם יש אינטגרציות?',
          'האם יש SEO?',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'הטעות של להסתכל רק על המחיר.',
      },
      {
        type: 'paragraph',
        text: 'אחת הטעויות הכי גדולות של בעלי עסקים, לדעתי, היא להסתכל רק על המחיר.',
      },
      {
        type: 'paragraph',
        text: 'אני רואה הרבה בעלי עסקים שמשקיעים מאות אלפי שקלים בעסק שלהם, בציוד, במקום, בפרסום, בהכשרות, אבל דווקא באתר מנסים לחסוך, כי הם חושבים שזה רק עיצוב.',
      },
      {
        type: 'paragraph',
        text: 'בפועל, האתר הוא אחד הנכסים החשובים ביותר בעסק. זה המקום שאנשים מגיעים אליו, שואלים שאלות, משווים, ומחליטים אם לפנות.',
      },
      {
        type: 'paragraph',
        text: 'כשמשווים אתר ב 2,500 ש"ח לאתר ב 10,000 ש"ח, צריך להבין שלא תמיד משווים את אותו הדבר. לפעמים משווים דף אחד מול חמישה עמודים. לפעמים תבנית מול קוד. לפעמים "נראה יפה" מול אתר שבנוי לעבוד.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'AI לא מחליף את מה שקורה מאחורי הקלעים.',
      },
      {
        type: 'paragraph',
        text: 'היום כל אחד יכול לבנות אתר תוך דקות בעזרת AI. אני לא מתעלמת מזה. אני משתמשת בכלים האלה בעצמי.',
      },
      {
        type: 'paragraph',
        text: 'אבל אתר הוא הרבה יותר מעיצוב. יש נגישות, SEO, חוויית משתמש, מהירות, התאמות טכניות, מבנה נכון, ועוד הרבה דברים שרוב האנשים בכלל לא רואים, כי הם פשוט עובדים ברקע.',
      },
      {
        type: 'paragraph',
        text: 'AI הוא כלי מדהים, אבל בסוף צריך מישהו שיודע לרדת לפרטים הקטנים, להבין מה צריך לשנות ומה צריך לשפר. זה מה שאני עושה כשאני בונה אתר. לא רק "לעשות יפה", אלא לבדוק שכל דבר עובד כמו שצריך.',
      },
      {
        type: 'heading',
        level: 2,
        text: '"אתר פשוט", שלא תמיד פשוט.',
      },
      {
        type: 'paragraph',
        text: 'הרבה אנשים אומרים לי שהם צריכים "אתר פשוט".',
      },
      {
        type: 'paragraph',
        text: 'ואז, כשמתחילים לפרט, הם מבקשים:',
      },
      {
        type: 'list',
        items: [
          'חנות',
          'סליקה',
          'טפסים',
          'SEO',
          'בלוג',
          'אוטומציות',
          'חיבור לוואטסאפ',
          'עיצוב מיוחד',
          'מעל ל500 מוצרים באתר',
        ],
      },
      {
        type: 'paragraph',
        text: 'ואז מגלים שזה כבר לא אתר פשוט. וזה בסדר. רק חשוב להיות כנים לגבי מה באמת צריך, כדי שהמחיר והציפיות יתאימו.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'מאחורי כל כפתור יש עבודה.',
      },
      {
        type: 'paragraph',
        text: 'חשוב לי להסביר: אתר לא נבנה בלחיצת כפתור.',
      },
      {
        type: 'paragraph',
        text: 'מאחורי כל כפתור, כל טופס, כל עמוד וכל אנימציה יש תכנון, מחשבה ועבודה. כשמישהו לוחץ "שלח" בטופס, מישהו חיבר אותו, בדק שהוא עובד, ודאג שהפנייה מגיעה למקום הנכון. זה לא קורה לבד.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'לסיכום: מה אני באמת חושבת?',
      },
      {
        type: 'paragraph',
        text: 'אני לא אומרת שצריך לשלם את הסכום הכי גבוה. אני אומרת שכדאי לשאול מה באמת מקבלים, ולא לצפות שאתר "פשוט" יעשה הכל.',
      },
      {
        type: 'paragraph',
        text: 'כשאני בונה אתר, אני לא מסתכלת רק על איך זה נראה. אני מסתכלת על מה קורה כשמישהו נכנס, גולל, לוחץ, ומחליט אם לפנות. שם ההבדל בין אתר שיושב באינטרנט לבין אתר שעובד בשביל העסק.',
      },
    ],
  },
]

export function getPublishedBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS]
    .filter((post) => post.published)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function getPublishedBlogPostBySlug(slug: string): BlogPost | undefined {
  const post = getBlogPostBySlug(slug)
  if (!post?.published) return undefined
  return post
}

export function blogArticlePath(slug: string): `/blog/${string}` {
  return `/blog/${slug}`
}

export function formatBlogDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  if (!year || !month || !day) return isoDate
  return new Intl.DateTimeFormat('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jerusalem',
  }).format(new Date(year, month - 1, day))
}

export function estimateReadingMinutes(body: readonly BlogPostBlock[]): number {
  const words = body
    .map((block) => {
      if (block.type === 'list') return block.items.join(' ')
      if (block.type === 'heading' || block.type === 'paragraph' || block.type === 'quote') {
        return block.text
      }
      if (block.type === 'callout') {
        return [block.title, block.text].filter(Boolean).join(' ')
      }
      return ''
    })
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.ceil(words / 180))
}
