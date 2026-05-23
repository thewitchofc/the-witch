import { Seo } from '../components/Seo'

export function AccessibilityPage() {
  return (
    <div className="relative isolate min-h-[100svh] w-full bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]">
      <Seo
        title="הצהרת נגישות, The Witch"
        description="מידע על נגישות האתר, התאמות זמינות, תאימות לתקן ודרכי יצירת קשר לדיווח על בעיות נגישות."
        path="/accessibility"
      />
      <main
        className="relative z-10 mx-auto max-w-3xl px-4 pb-28 pt-24 text-pretty md:px-6 md:pb-32 md:pt-28"
        dir="rtl"
        lang="he"
      >
        <h1 className="mb-8 text-3xl font-semibold tracking-tight text-white md:text-4xl">הצהרת נגישות</h1>
        <div className="space-y-6 text-sm leading-relaxed text-slate-300 md:text-base">
          <p>
            The Witch מחויבת להנגיש את האתר לכלל האוכלוסייה, כולל אנשים עם מוגבלות. אנו פועלים לשיפור מתמיד של חוויית
            הגלישה, התאמת התוכן והכלים הטכנולוגיים, בהתאם לעקרונות{' '}
            <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.1 ברמת AA, ככל שניתן.
          </p>

          <section aria-labelledby="a11y-measures">
            <h2 id="a11y-measures" className="mb-3 text-xl font-semibold text-white">
              אמצעי נגישות באתר
            </h2>
            <ul className="list-inside list-disc space-y-2 marker:text-violet-400">
              <li>כפתור נגישות קבוע בפינה השמאלית התחתונה של המסך (אייקון נגישות).</li>
              <li>הגדלה והקטנה של גודל הטקסט (ארבע רמות).</li>
              <li>מצב ניגודיות גבוהה לשיפור קריאות.</li>
              <li>הדגשת קישורים בקו תחתון.</li>
              <li>עצירת אנימציות והפחתת אפקטים חזותיים.</li>
              <li>ריווח שורות מוגבר לטקסט ארוך.</li>
              <li>מעבר לגופן מערכת קריא יותר.</li>
              <li>קישור «דלג לתוכן הראשי» למקלדת ולקוראי מסך.</li>
              <li>שמירת העדפות הנגישות בדפדפן (localStorage) לביקורים הבאים.</li>
              <li>מבנה כותרות, תוויות לטפסים ותמיכה בניווט מקלדת בדפים המרכזיים.</li>
            </ul>
          </section>

          <section aria-labelledby="a11y-tech">
            <h2 id="a11y-tech" className="mb-3 text-xl font-semibold text-white">
              טכנולוגיה ותאימות
            </h2>
            <p>
              האתר נבנה ב־React עם HTML5 ו־CSS3. הנגישות נבדקת בדפדפנים מודרניים (Chrome, Firefox, Safari, Edge)
              ובשילוב עם קוראי מסך נפוצים. ייתכן שחלק מהתוכן החיצוני (למשל תצוגות תלת־ממד או סרטונים מוטמעים) אינו
              בשליטתנו המלאה; אנו ממשיכים לשפר את החלופות והטקסט החלופי.
            </p>
          </section>

          <section aria-labelledby="a11y-known">
            <h2 id="a11y-known" className="mb-3 text-xl font-semibold text-white">
              מגבלות ידועות
            </h2>
            <p>
              ייתכן שחלק מהאנימציות והאפקטים הוויזואליים המורכבים אינם מותאמים באופן מלא לכל צורכי הנגישות. במצב
              «עצירת אנימציות» בתפריט הנגישות מופחתים משמעותית אפקטים אלו. אנו ממשיכים לעבוד על שיפור נגישות
              הרכיבים הדינמיים.
            </p>
          </section>

          <section aria-labelledby="a11y-contact">
            <h2 id="a11y-contact" className="mb-3 text-xl font-semibold text-white">
              משוב, בקשות והתאמות
            </h2>
            <p>
              נתקלתם בבעיית נגישות? נשמח לעזור. ניתן לפנות אלינו דרך{' '}
              <a
                href="/apply#contact"
                className="text-cyan-300 underline-offset-2 hover:text-cyan-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80"
              >
                טופס יצירת הקשר
              </a>{' '}
              באתר, לציין «נגישות» בפנייה, ולפרט את כתובת הדף והבעיה. נשתדל להגיב ולטפל בפנייה בהקדם האפשרי.
            </p>
          </section>

          <section aria-labelledby="a11y-updates">
            <h2 id="a11y-updates" className="mb-3 text-xl font-semibold text-white">
              עדכון ההצהרה
            </h2>
            <p>
              הצהרה זו עודכנה לאחרונה במאי 2026. אנו ממשיכים לבחון ולשפר את נגישות האתר בהתאם להתפתחות התקן
              והמשוב מהגולשים.
            </p>
          </section>

          <p className="text-xs text-slate-400">
            מסמך זה נועד לספק מידע על מאמצי הנגישות באתר ואינו מהווה ייעוץ משפטי.
          </p>
        </div>
      </main>
    </div>
  )
}
