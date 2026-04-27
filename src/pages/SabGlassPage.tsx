import { Seo } from '../components/Seo'
import { ProjectCaseStudy } from '../components/ProjectCaseStudy'
import { sabGlassOgImage } from '../data/clientOgImages'

/** תמונת ירו בדף, OG אחיד לכל האתר (`DEFAULT_OG_IMAGE` ב־Seo) */
const heroImage = sabGlassOgImage
const LIVE_SITE = 'https://sabglass.co.il/'

const workItems = [
  'UX שמוביל לפנייה',
  'מבנה דפים שמותאם להמרות',
  'SEO בסיסי נכון',
  'טעינה מהירה מאוד',
  'התאמה מלאה למובייל',
] as const

export function SabGlassPage() {
  return (
    <div className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]">
      <Seo
        title="מקרה בוחן: SAB Glass, The Witch"
        description="אתר למקלחוני זכוכית בהתאמה אישית: UX להמרות, מבנה דפים, SEO בסיסי וטעינה מהירה. תוצאות ולא רק תדמית."
        path="/projects/sab-glass"
      />
      <ProjectCaseStudy
        title="SAB Glass"
        eyebrow="פרויקט לקוח: אתר שמביא פניות"
        subtitle="מקלחוני זכוכית בהתאמה אישית"
        description="אתר שנבנה כדי להביא לקוחות חדשים מגוגל ולהמיר אותם לפניות, עם דגש על מהירות, SEO וחוויית משתמש ברורה."
        image={heroImage}
        imageAlt="אתר SAB Glass, מקלחוני זכוכית בהתאמה אישית"
        problem="העסק היה צריך נוכחות דיגיטלית שמייצרת פניות אמיתיות, לא עוד אתר תדמית שלא מביא תוצאות."
        solution="נבנה אתר מותאם אישית בקוד מלא, עם דגש על ביצועים, חוויית משתמש והנעה לפעולה בכל מסך."
        result="האתר התחיל להביא פניות חדשות ולהגדיל את הנוכחות של העסק בגוגל."
        workItems={workItems}
        ctaLocation="sab_glass_case_study"
        liveSiteUrl={LIVE_SITE}
        imageObjectClassName="object-cover object-[0%_50%]"
      />
    </div>
  )
}
