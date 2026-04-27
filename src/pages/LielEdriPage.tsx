import { Seo } from '../components/Seo'
import { ProjectCaseStudy } from '../components/ProjectCaseStudy'
import { lielEdriLiveUrl, lielEdriOgImage } from '../data/clientOgImages'

const heroImage = lielEdriOgImage

const workItems = [
  'מיתוג ויזואלי וטיפוגרפיה עדינה',
  'ניווט פשוט ותפריט מתוקים בולט',
  'כפתורי פנייה, וואטסאפ ואינסטגרם',
  'התאמה למובייל ואופטימיזציה לתמונות',
] as const

export function LielEdriPage() {
  return (
    <div className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]">
      <Seo
        title="מקרה בוחן: Liel Edri, The Witch"
        description="אתר לקינוחי בוטיק ביתיים: מיתוג עדין, פנייה בוואטסאפ ואינסטגרם, והתאמה מלאה למובייל."
        path="/projects/liel-edri"
      />
      <ProjectCaseStudy
        title="Liel Edri"
        eyebrow="פרויקט לקוח: מותג בוטיק ביתי"
        subtitle="Homemade Baking"
        description="אתר לקינוחי בוטיק ביתיים, שנבנה כדי לשדר טריות, עדינות ואמון, ולהוביל לפנייה מהירה בוואטסאפ ובאינסטגרם."
        image={heroImage}
        imageAlt="אתר Liel Edri, קינוחי בוטיק ביתיים"
        problem="היה צורך באתר שישדר בוטיק, אמון וטריות, ויוביל בקלות לפניות ולהזמנות בלי חיכוך ובלי רעש ויזואלי."
        solution="נבנה אתר נקי ואלגנטי עם צילום מזון חזק, היררכיה ברורה ואינטגרציה מהירה לוואטסאפ ולאינסטגרם."
        result="אתר שמחזק אמון במותג ומגדיל פניות והזמנות דרך הערוצים הדיגיטליים."
        workItems={workItems}
        ctaLocation="liel_edri_case_study"
        liveSiteUrl={lielEdriLiveUrl}
      />
    </div>
  )
}
