import { CustomLink } from '../components/CustomLink'
import { Seo } from '../components/Seo'
import { primaryCtaInnerClass, primaryCtaOuterClass } from '../lib/primaryCtaClasses'

const ARTICLE_PATH = '/hamachshefa-bniyat-atarim-eich-livchor-atar-shmevi-lakochot' as const

export default function HamachshefaArticleClientsPage() {
  return (
    <>
      <Seo
        title="המכשפה לבניית אתרים – איך לבחור אתר שמביא לקוחות? | The Witch"
        description="המכשפה לבניית אתרים: איך לבחור אתר שמביא לקוחות — המרות, מהירות, SEO וקוד נקי. פחות עיצוב ריק, יותר תוצאות."
        path={ARTICLE_PATH}
      />

      <div
        className="relative isolate min-h-[100svh] w-full bg-[#020617] supports-[min-height:100dvh]:min-h-[100dvh]"
        dir="rtl"
        lang="he"
      >
        <article className="mx-auto max-w-3xl px-6 pb-20 pt-24 text-white md:pt-28">
          <p className="mb-8 text-center text-sm text-white/50">
            <CustomLink
              to="/hamachshefa-bniyat-atarim"
              className="font-medium text-cyan-300/90 underline-offset-2 transition hover:text-cyan-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
            >
              המכשפה לבניית אתרים
            </CustomLink>
            <span aria-hidden> · </span>
            מאמר
          </p>

          <h1 className="mb-10 text-balance text-center text-3xl font-semibold leading-tight sm:text-4xl">
            המכשפה לבניית אתרים – איך לבחור אתר שמביא לקוחות?
          </h1>

          <div className="space-y-6 text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
            <p>
              המכשפה לבניית אתרים מתמקדת ביצירת אתרים שמביאים תוצאות אמיתיות לעסקים. רוב האתרים היום נראים טוב,
              אבל לא מייצרים פניות — וזה ההבדל המרכזי.
            </p>

            <p>
              כאשר בונים אתר, חשוב להבין שהמטרה היא לא רק עיצוב, אלא יצירת חוויית משתמש שגורמת ללקוח לפעול. המכשפה
              לבניית אתרים מתמקדת בדיוק בנקודה הזו — איך להפוך מבקר ללקוח.
            </p>

            <p>
              עוד טעות נפוצה היא להתעלם ממהירות ו-SEO. אתר איטי או לא מותאם למנועי חיפוש פשוט לא יביא תנועה. לכן,
              בניית אתרים מקצועית חייבת לשלב קוד נקי, ביצועים גבוהים, וחשיבה שיווקית.
            </p>

            <p>
              אם אתם מחפשים פתרון אמיתי — המכשפה לבניית אתרים מציעה גישה שונה: פחות עיצוב ריק, יותר תוצאות.
            </p>
          </div>

          <p className="mt-12 text-center">
            <CustomLink
              to="/apply"
              className={primaryCtaOuterClass}
            >
              <span className={primaryCtaInnerClass}>בדיקת התאמה לפרויקט</span>
            </CustomLink>
          </p>
        </article>
      </div>
    </>
  )
}
