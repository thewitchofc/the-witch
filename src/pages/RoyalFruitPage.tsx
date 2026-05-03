import heroImage from '../assets/royal-fruit-hero.webp?url'
import { ProjectCaseStudy } from '../components/ProjectCaseStudy'
import { Seo } from '../components/Seo'

const workItems = [
  'עיצוב ממשק משתמש (UI) נקי ורענן',
  'מערכת קטלוג מוצרים ידידותית',
  'אינטגרציה מלאה להזמנות בוואטסאפ',
  'אופטימיזציה של תמונות לטעינה מהירה',
] as const

export function RoyalFruitPage() {
  return (
    <div className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]">
      <Seo
        title="מקרה בוחן: Royal Fruit, The Witch"
        description="אתר למסחר פירות וירקות טריים: קטלוג, הזמנות בוואטסאפ וחוויית קנייה נקייה. דגש על טריות ואמון."
        path="/projects/royal-fruit"
      />
      <ProjectCaseStudy
        title="Royal Fruit"
        eyebrow="פרויקט לקוח: אתר מכירתי"
        subtitle="פירות וירקות טריים עד הבית"
        description="אתר מכירתי שנבנה כדי להציג תוצרת טרייה בצורה ברורה, לחזק אמון, ולהוביל להזמנות מהירות דרך וואטסאפ."
        image={heroImage}
        imageAlt="Royal Fruit, לוגו ומיתוג האתר"
        problem="הלקוח היה זקוק לפלטפורמה דיגיטלית שתאפשר הזמנה נוחה של תוצרת חקלאית טרייה ישירות לבית הלקוח, תוך שמירה על תדמית של איכות וטריות."
        solution="הוקם אתר מכירות מעוצב עם חוויית משתמש פשוטה, חיבור ישיר לוואטסאפ להזמנות מהירות, ודגש ויזואלי על טריות המוצרים."
        result="אתר שמגדיל את כמות ההזמנות היומיות ומחזק את המותג כספק פרימיום של פירות וירקות."
        workItems={workItems}
        ctaLocation="royal_fruit_case_study"
        liveSiteUrl="https://royalfruit.co.il/"
        imageObjectClassName="object-cover object-[42%_62%]"
        imageSizeClassName="h-[280px] md:h-[360px]"
      />
    </div>
  )
}
