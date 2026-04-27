import { CustomLink } from '../components/CustomLink'
import { Seo } from '../components/Seo'
import { primaryCtaInnerClass, primaryCtaOuterClass } from '../lib/primaryCtaClasses'

export default function HamachshefaPage() {
  return (
    <>
      <Seo
        title="המכשפה לבניית אתרים | The Witch"
        description="המכשפה לבניית אתרים – שירות פרימיום לבניית אתרים שמביאים לקוחות, עם דגש על מהירות, המרות ו-SEO."
        path="/hamachshefa-bniyat-atarim"
      />

      <div
        className="relative isolate min-h-[100svh] w-full bg-[#020617] supports-[min-height:100dvh]:min-h-[100dvh]"
        dir="rtl"
        lang="he"
      >
        <main className="mx-auto max-w-3xl px-6 pb-20 pt-24 text-center text-white md:pt-28">
          <h1 className="mb-6 text-4xl font-semibold">המכשפה לבניית אתרים</h1>

          <p className="mb-10 leading-relaxed text-white/80">
            המכשפה לבניית אתרים היא שירות פרימיום לבניית אתרי תדמית ואתרים עסקיים שמביאים תוצאות אמיתיות — יותר
            פניות, יותר לקוחות ויותר מכירות.
          </p>

          <h2 className="mb-4 text-2xl font-semibold">מה מיוחד בגישה של המכשפה?</h2>

          <p className="mb-10 leading-relaxed text-white/70">
            בניית אתרים היום היא הרבה מעבר לעיצוב. המכשפה מתמקדת בהמרות, חוויית משתמש מדויקת, ומהירות גבוהה —
            כדי להפוך את האתר שלך לכלי שמייצר תוצאות ולא רק נראה טוב.
          </p>

          <h2 className="mb-4 text-2xl font-semibold">למי זה מתאים?</h2>

          <p className="mb-10 leading-relaxed text-white/70">
            עסקים שרוצים אתר שלא רק נראה טוב — אלא מביא לקוחות בפועל, משקף את המותג שלהם ומייצר יתרון אמיתי מול
            מתחרים.
          </p>

          <CustomLink
            to="/apply"
            className={primaryCtaOuterClass}
          >
            <span className={primaryCtaInnerClass}>בדיקת התאמה לפרויקט</span>
          </CustomLink>
        </main>
      </div>
    </>
  )
}
