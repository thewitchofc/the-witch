import { CosmicField } from '../components/CosmicField'
import { Seo } from '../components/Seo'

export function PrivacyPage() {
  return (
    <div className="relative isolate min-h-[100svh] w-full overflow-x-clip bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]">
      <Seo
        title="מדיניות פרטיות, The Witch"
        description="איסוף מידע, עוגיות, Google Analytics והעברת מידע לצדדים שלישיים, מדיניות פרטיות לאתר The Witch."
        path="/privacy"
      />
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <CosmicField />
      </div>
      <main
        className="relative z-10 mx-auto max-w-3xl px-4 pb-28 pt-24 text-pretty md:px-6 md:pb-32 md:pt-28"
        dir="rtl"
        lang="he"
      >
        <h1 className="mb-8 text-3xl font-semibold tracking-tight text-white md:text-4xl">מדיניות פרטיות</h1>
        <div className="space-y-6 text-sm leading-relaxed text-slate-300 md:text-base">
          <p>
            מסמך זה מתאר כיצד נאסף, נשמר ומעובד מידע בעת שימוש באתר The Witch (להלן: «האתר»). השימוש באתר מהווה הסכמה
            לעקרונות המפורטים כאן, ככל שלא נקבע אחרת בחוק החל.
          </p>
          <section aria-labelledby="privacy-controller">
            <h2 id="privacy-controller" className="mb-3 text-xl font-semibold text-white">
              מפעיל האתר
            </h2>
            <p>
              האתר מופעל על־ידי The Witch לצורך הצגת שירותים, תיק עבודות ויצירת קשר. לפניות בנושא פרטיות ניתן לפנות דרך
              טופס ההתאמה באתר או בערוצי הקשר שמופיעים בו.
            </p>
          </section>
          <section aria-labelledby="privacy-data">
            <h2 id="privacy-data" className="mb-3 text-xl font-semibold text-white">
              איזה מידע נאסף
            </h2>
            <ul className="list-inside list-disc space-y-2 marker:text-violet-400">
              <li>מידע שתמסרו במילוי טפסים (למשל שם, טלפון, פרטי עסק), לצורך תקשורת ובדיקת התאמה לפרויקט.</li>
              <li>נתוני טכניקה בסיסיים הנאספים אוטומטית בגלישה (כגון סוג דפדפן, מערכת הפעלה ומזהי עוגיות), לצורך אבטחה,
                תפקוד ושיפור חוויית המשתמש.</li>
            </ul>
          </section>
          <section aria-labelledby="privacy-cookies">
            <h2 id="privacy-cookies" className="mb-3 text-xl font-semibold text-white">
              עוגיות (Cookies)
            </h2>
            <p>
              האתר עשוי להשתמש בעוגיות לצורך שמירת העדפות, תפקוד טכני וניתוח תנועה. תוכלו לנהל הסכמה לעוגיות לא
              חיוניות באמצעות באנר ההסכמה שמופיע בביקור ראשון. דחייה תמנע טעינה של Google Analytics.
            </p>
          </section>
          <section aria-labelledby="privacy-ga">
            <h2 id="privacy-ga" className="mb-3 text-xl font-semibold text-white">
              Google Analytics
            </h2>
            <p>
              בהסכמתכם, נטען שירות Google Analytics (GA4) של Google LLC לצורך סטטיסטיקות שימוש אנונימיות ומצומצמות. מדיניות
              Google חלה על עיבוד המידע בצד Google. ניתן לבטל הסכמה בכל עת על־ידי מחיקת נתוני האתר בדפדפן או שינוי
              הגדרות פרטיות, עד לביקור חוזר ייתכן שוב באנר הסכמה.
            </p>
          </section>
          <section aria-labelledby="privacy-retention">
            <h2 id="privacy-retention" className="mb-3 text-xl font-semibold text-white">
              שמירה ואבטחה
            </h2>
            <p>
              נשמרים רק נתונים הנדרשים למטרות המפורטות לעיל. ננקטים אמצעים סבירים להגנה על מידע מפני גישה בלתי מורשית,
              אך אין אבטחה מוחלטת ברשת.
            </p>
          </section>
          <section aria-labelledby="privacy-rights">
            <h2 id="privacy-rights" className="mb-3 text-xl font-semibold text-white">
              זכויותיכם
            </h2>
            <p>
              בהתאם לדין החל, עשויות לחול עליכם זכויות עיון, תיקון ומחיקה בנוגע למידע האישי. לבקשות ניתן לפנות דרך
              האתר.
            </p>
          </section>
          <p className="text-xs text-slate-400">עודכן לאחרונה: אפריל 2026. מסמך זה אינו ייעוץ משפטי.</p>
        </div>
      </main>
    </div>
  )
}
