import { Seo } from '../components/Seo'
import { ProjectCaseStudy } from '../components/ProjectCaseStudy'
import { sachiRamenHeroImage, sachiRamenLiveUrl } from '../data/clientOgImages'

const workItems = [
  'מבנה שמוביל להזמנה מהירה',
  'חוויית מובייל ברורה ומהירה',
  'הדגשת מנות ותפריט בצורה ויזואלית',
  'כפתורי פעולה שמקצרים את הדרך להזמנה',
] as const

export function SachiRamenPage() {
  return (
    <div className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]">
      <Seo
        title="מקרה בוחן: Sachi Ramen & Sushi, The Witch"
        description="אתר למסעדת ראמן וסושי: חוויית מובייל, תפריט ברור והובלה מהירה להזמנה. אתר שנבנה כדי להפוך רעב לפעולה."
        path="/projects/sachi-ramen"
      />
      <ProjectCaseStudy
        title="Sachi Ramen & Sushi"
        eyebrow="פרויקט לקוח: מסעדה והזמנות"
        subtitle="אתר שמוביל להזמנה מהר"
        description="אתר למסעדת ראמן וסושי שנבנה סביב חוויית מובייל, תפריט ברור, ותנועה מהירה מהחשק הראשוני להזמנה."
        image={sachiRamenHeroImage}
        imageAlt="אתר Sachi Ramen & Sushi, ראמן, סושי וקריאה להזמנה"
        problem="המסעדה הייתה צריכה אתר שמציג את האוכל בצורה מגרה וברורה, ומקצר את הדרך של הלקוח להזמנה."
        solution="נבנה אתר עם היררכיה פשוטה, תצוגת מנות בולטת, חוויית מובייל מדויקת וכפתורי פעולה שמובילים להזמנה בלי חיכוך."
        result="אתר שמחזק את החשק להזמין ומעביר את המבקר במהירות מהתפריט לפעולה."
        workItems={workItems}
        ctaLocation="sachi_ramen_case_study"
        liveSiteUrl={sachiRamenLiveUrl}
      />
    </div>
  )
}
