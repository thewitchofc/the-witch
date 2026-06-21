/**
 * נתיבי prerender למאמרי בלוג — מסונכרן עם src/data/blogPosts.ts
 * הוסיפי כאן כל slug חדש עם published: true
 */
export const BLOG_ARTICLE_PRERENDER_ROUTES = [
  {
    path: '/blog/kama-ole-bniyat-atar-la-esek-2026',
    title: 'כמה עולה בניית אתר לעסק ב 2026? | The Witch',
    titleIncludes: 'כמה עולה',
  },
]

export const PRERENDER_ROUTES = [
  { path: '/', title: 'The Witch, בניית אתרים שמביאים לקוחות', titleIncludes: 'בניית אתרים שמביאים לקוחות' },
  { path: '/about', title: 'אודות, The Witch', titleIncludes: 'אודות' },
  { path: '/portfolio', title: 'תיק עבודות, The Witch', titleIncludes: 'תיק עבודות' },
  { path: '/process', title: 'תהליך עבודה, The Witch', titleIncludes: 'תהליך עבודה' },
  { path: '/faq', title: 'שאלות נפוצות, The Witch', titleIncludes: 'שאלות נפוצות' },
  { path: '/blog', title: 'בלוג, The Witch', titleIncludes: 'בלוג' },
  { path: '/apply', title: 'הגשת בקשה לפרויקט, The Witch', titleIncludes: 'הגשת בקשה' },
  { path: '/hamachshefa-bniyat-atarim', title: 'המכשפה לבניית אתרים | The Witch', titleIncludes: 'המכשפה' },
  {
    path: '/hamachshefa-bniyat-atarim-eich-livchor-atar-shmevi-lakochot',
    title: 'המכשפה לבניית אתרים: איך לבחור אתר שמביא לקוחות? | The Witch',
    titleIncludes: 'איך לבחור',
  },
  { path: '/projects/sab-glass', title: 'מקרה בוחן: SAB Glass, The Witch', titleIncludes: 'SAB Glass' },
  { path: '/projects/royal-fruit', title: 'מקרה בוחן: Royal Fruit, The Witch', titleIncludes: 'Royal Fruit' },
  { path: '/projects/liel-edri', title: 'מקרה בוחן: Liel Edri, The Witch', titleIncludes: 'Liel Edri' },
  {
    path: '/projects/sachi-ramen',
    title: 'מקרה בוחן: Sachi Ramen & Sushi, The Witch',
    titleIncludes: 'Sachi Ramen',
  },
  { path: '/accessibility', title: 'הצהרת נגישות, The Witch', titleIncludes: 'הצהרת נגישות' },
  { path: '/privacy', title: 'מדיניות פרטיות, The Witch', titleIncludes: 'מדיניות פרטיות' },
  { path: '/terms', title: 'תנאי שימוש, The Witch', titleIncludes: 'תנאי שימוש' },
  ...BLOG_ARTICLE_PRERENDER_ROUTES,
]
