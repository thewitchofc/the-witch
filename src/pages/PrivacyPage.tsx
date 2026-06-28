import { Seo } from '../components/Seo'

const PRIVACY_EMAIL = 'thewitchofc.il@gmail.com'

export function PrivacyPage() {
  return (
    <div className="relative isolate min-h-[100svh] w-full bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]">
      <Seo
        title="מדיניות פרטיות, The Witch"
        description="מדיניות פרטיות לאתר The Witch: עוגיות, Google Analytics, Meta Pixel, טפסים, Formspree ושירותים נוספים."
        path="/privacy"
      />
      <div
        className="relative z-10 mx-auto max-w-3xl px-4 pb-28 pt-24 text-pretty md:px-6 md:pb-32 md:pt-28"
        dir="rtl"
        lang="he"
      >
        <h1 className="mb-8 text-3xl font-semibold tracking-tight text-white md:text-4xl">מדיניות פרטיות</h1>
        <div className="space-y-6 text-sm leading-relaxed text-slate-300 md:text-base">
          <p>
            מסמך זה מתאר כיצד נאסף, נשמר ומעובד מידע בעת שימוש באתר The Witch (thewitch.co.il). השימוש באתר מהווה
            הסכמה לעקרונות המפורטים כאן, ככל שלא נקבע אחרת בדין החל.
          </p>

          <section aria-labelledby="privacy-controller">
            <h2 id="privacy-controller" className="mb-3 text-xl font-semibold text-white">
              מפעיל האתר
            </h2>
            <p>
              האתר מופעל על ידי <strong className="font-medium text-white">המכשפה, בניית אתרים</strong> (מותג: The
              Witch), לצורך הצגת שירותים, תיק עבודות ויצירת קשר.
            </p>
            <p className="mt-2">
              לפניות בנושא פרטיות:{' '}
              <a
                href={`mailto:${PRIVACY_EMAIL}`}
                className="font-medium text-cyan-300 underline-offset-2 hover:text-cyan-200 hover:underline"
              >
                {PRIVACY_EMAIL}
              </a>{' '}
              או דרך{' '}
              <a href="/apply#contact" className="font-medium text-cyan-300 underline-offset-2 hover:text-cyan-200 hover:underline">
                טופס ההתאמה
              </a>{' '}
              באתר.
            </p>
          </section>

          <section aria-labelledby="privacy-data">
            <h2 id="privacy-data" className="mb-3 text-xl font-semibold text-white">
              איזה מידע נאסף
            </h2>
            <ul className="list-inside list-disc space-y-2 marker:text-violet-400">
              <li>
                <strong className="font-medium text-slate-200">טפסים:</strong> שם, טלפון, פרטי עסק, קישורים לרשתות,
                מטרות, הערות וכל מידע שתמסרו ביוזמתכם בטופס ההתאמה.
              </li>
              <li>
                <strong className="font-medium text-slate-200">טכני:</strong> סוג דפדפן, מערכת הפעלה, כתובת IP (בשירותי
                צד שלישי), מזהי עוגיות, דפים שביקרתם בהם, אירועי לחיצה וגלילה, רק בהסכמתכם לעוגיות אנליטיות.
              </li>
              <li>
                <strong className="font-medium text-slate-200">העדפות מקומיות:</strong> בחירת הסכמה לעוגיות והעדפות
                נגישות, נשמרות ב-localStorage בדפדפן שלכם.
              </li>
            </ul>
          </section>

          <section aria-labelledby="privacy-forms">
            <h2 id="privacy-forms" className="mb-3 text-xl font-semibold text-white">
              שליחת טפסים ושירותי צד שלישי
            </h2>
            <ul className="list-inside list-disc space-y-2 marker:text-violet-400">
              <li>
                <strong className="font-medium text-slate-200">Formspree</strong> (formspree.io): קבלת פניות מהטופס
                בדוא״ל. המידע שתמסרו בטופס מועבר ל-Formspree לצורך משלוח ההודעה. חלים תנאי השימוש ומדיניות הפרטיות של
                Formspree.
              </li>
              <li>
                <strong className="font-medium text-slate-200">Google Sheets / Apps Script</strong> (אופציונלי): אם
                מוגדר, עותק של נתוני הטופס עשוי להישמר ב-Google Sheets לצורך ניהול פניות. חלים תנאי Google.
              </li>
              <li>
                <strong className="font-medium text-slate-200">WhatsApp</strong> (Meta): בחלק מהזרימות ניתן לפתוח
                שיחה ב-WhatsApp עם פרטים שמילאתם. מעבר ל-WhatsApp כפוף למדיניות Meta.
              </li>
            </ul>
          </section>

          <section aria-labelledby="privacy-cookies">
            <h2 id="privacy-cookies" className="mb-3 text-xl font-semibold text-white">
              עוגיות (Cookies) ו-localStorage
            </h2>
            <p>
              האתר משתמש בעוגיות וב-localStorage לשמירת העדפות, תפקוד טכני וניתוח תנועה. באנר «יצא חם מהתנור» מאפשר
              לבחור אם לאשר עוגיות אנליטיות. <strong className="font-medium text-slate-200">דחייה</strong> תמנע טעינה
              של Google Analytics ו-Meta Pixel. <strong className="font-medium text-slate-200">אישור</strong> יאפשר
              את שני השירותים.
            </p>
            <p className="mt-2">ב-localStorage נשמרים בין היתר:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 marker:text-violet-400">
              <li>בחירת הסכמה לעוגיות (`the-witch-analytics-consent`)</li>
              <li>העדפות נגישות (`the-witch-a11y-prefs`)</li>
              <li>סימון שהטופס נשלח מהמכשיר (`the-witch:lead-form-submitted`)</li>
            </ul>
          </section>

          <section aria-labelledby="privacy-ga">
            <h2 id="privacy-ga" className="mb-3 text-xl font-semibold text-white">
              Google Analytics (GA4)
            </h2>
            <p>
              בהסכמתכם, נטען שירות Google Analytics 4 של Google LLC (דרך googletagmanager.com) לצורך סטטיסטיקות
              שימוש, צפיות בדפים, אירועי CTA, שליחת טפסים ועומק גלילה. מופעל עם{' '}
              <code className="rounded bg-slate-800/80 px-1.5 py-0.5 text-xs text-slate-200">anonymize_ip</code>.
              מדיניות Google חלה על עיבוד המידע בצד Google.
            </p>
          </section>

          <section aria-labelledby="privacy-meta">
            <h2 id="privacy-meta" className="mb-3 text-xl font-semibold text-white">
              Meta Pixel (Facebook)
            </h2>
            <p>
              בהסכמתכם, נטען Meta Pixel של Meta Platforms (דרך connect.facebook.net) למדידת תנועה, PageView, Lead,
              Contact, Schedule ואירועי מעורבות (כגון גלילה לעומק 50%/90%). Meta עשויה לקשר מידע לחשבון Facebook/Instagram
              שלכם אם אתם מחוברים. מדיניות Meta חלה על עיבוד המידע בצד Meta.
            </p>
          </section>

          <section aria-labelledby="privacy-other">
            <h2 id="privacy-other" className="mb-3 text-xl font-semibold text-white">
              שירותים נוספים (ללא אנליטיקה מותנית הסכמה)
            </h2>
            <ul className="list-inside list-disc space-y-2 marker:text-violet-400">
              <li>
                <strong className="font-medium text-slate-200">Google Fonts</strong>: גופן Heebo נטען מ-servers של
                Google (fonts.googleapis.com / fonts.gstatic.com). Google עשויה לקבל את כתובת ה-IP שלכם בעת טעינת
                הגופן.
              </li>
              <li>
                <strong className="font-medium text-slate-200">Spline</strong>: בחלק מהדפים מוטמע רקע תלת ממדי מ-my.spline.design.
                Spline עשויה לאסוף נתונים טכניים לפי מדיניותה.
              </li>
              <li>
                <strong className="font-medium text-slate-200">Google Search Console</strong>: אימות בעלות על הדומיין
                בלבד; אין איסוף מידע אישי דרך האתר עצמו.
              </li>
              <li>
                <strong className="font-medium text-slate-200">קישורים חיצוניים</strong>: אתרי לקוחות, Google Business,
                WhatsApp ורשתות חברתיות. מעבר אליהם כפוף למדיניות של אותם אתרים.
              </li>
            </ul>
          </section>

          <section aria-labelledby="privacy-retention">
            <h2 id="privacy-retention" className="mb-3 text-xl font-semibold text-white">
              שמירה, אבטחה והעברה
            </h2>
            <p>
              נשמרים רק נתונים הנדרשים למטרות המפורטות לעיל. נתוני טפסים נשמרים אצל Formspree, Google (אם מוגדר) ו/או
              בדוא״ל העסקי. נתוני אנליטיקה נשמרים אצל Google ו-Meta לפי מדיניותם. האתר מאוחסן על תשתית אחסון אתרים
              (Render). ננקטים אמצעים סבירים להגנה על מידע, אך אין אבטחה מוחלטת ברשת.
            </p>
          </section>

          <section aria-labelledby="privacy-rights">
            <h2 id="privacy-rights" className="mb-3 text-xl font-semibold text-white">
              זכויותיכם וביטול הסכמה
            </h2>
            <p>
              בהתאם לדין החל, עשויות לחול עליכם זכויות עיון, תיקון ומחיקה. לבקשות פנו אל{' '}
              <a
                href={`mailto:${PRIVACY_EMAIL}`}
                className="font-medium text-cyan-300 underline-offset-2 hover:text-cyan-200 hover:underline"
              >
                {PRIVACY_EMAIL}
              </a>
              . ניתן לבטל הסכמה לעוגיות אנליטיות בכל עת על ידי מחיקת נתוני האתר (localStorage ועוגיות) בדפדפן; בביקור
              חוזר יוצג שוב באנר ההסכמה.
            </p>
          </section>

          <p className="text-xs text-slate-400">עודכן לאחרונה: מאי 2026. מסמך זה אינו ייעוץ משפטי.</p>
        </div>
      </div>
    </div>
  )
}
