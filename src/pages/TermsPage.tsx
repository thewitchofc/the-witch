import { CosmicField } from '../components/CosmicField'
import { Seo } from '../components/Seo'

export function TermsPage() {
  return (
    <div className="relative isolate min-h-[100svh] w-full overflow-x-clip bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]">
      <Seo
        title="תנאי שימוש — The Witch"
        description="תנאי שימוש באתר The Witch: שירותי מידע, קישורים חיצוניים, הגבלת אחריות וקניין רוחני."
        path="/terms"
      />
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <CosmicField />
      </div>
      <main
        className="relative z-10 mx-auto max-w-3xl px-4 pb-28 pt-24 text-pretty md:px-6 md:pb-32 md:pt-28"
        dir="rtl"
        lang="he"
      >
        <h1 className="mb-8 text-3xl font-semibold tracking-tight text-white md:text-4xl">תנאי שימוש</h1>
        <div className="space-y-6 text-sm leading-relaxed text-slate-300 md:text-base">
          <p>
            ברוכים הבאים לאתר The Witch. השימוש באתר כפוף לתנאים אלה. אם אינכם מסכימים לתנאים — הימנעו משימוש באתר.
          </p>
          <section aria-labelledby="terms-nature">
            <h2 id="terms-nature" className="mb-3 text-xl font-semibold text-white">
              מהות האתר
            </h2>
            <p>
              האתר מספק מידע כללי על שירותי בניית אתרים, תיק עבודות ודרכי קשר. אין במידע באתר התחייבות לתוצאה עסקית,
              ללוח זמנים או למחיר ללא הצעה מסודרת בכתב.
            </p>
          </section>
          <section aria-labelledby="terms-ip">
            <h2 id="terms-ip" className="mb-3 text-xl font-semibold text-white">
              קניין רוחני
            </h2>
            <p>
              כל התכנים באתר — לרבות טקסטים, עיצוב, לוגו, קוד ממשק ותמונות — מוגנים בזכויות יוצרים ובזכויות סמיכות
              למפעיל, אלא אם צוין אחרת. אין להעתיק, לשכפל או לעשות שימוש מסחרי ללא רשות מראש ובכתב.
            </p>
          </section>
          <section aria-labelledby="terms-links">
            <h2 id="terms-links" className="mb-3 text-xl font-semibold text-white">
              קישורים חיצוניים
            </h2>
            <p>
              האתר עשוי לכלול קישורים לאתרי צד שלישי. אין אחריות על תוכן, זמינות או מדיניות פרטיות של אתרים אלה.
            </p>
          </section>
          <section aria-labelledby="terms-liability">
            <h2 id="terms-liability" className="mb-3 text-xl font-semibold text-white">
              הגבלת אחריות
            </h2>
            <p>
              השימוש באתר הוא על אחריות המשתמש בלבד. במידה המרבית המותרת בדין, לא תחול אחריות על נזקים עקיפים,
              תוצאתיים או אובדן רווח הנובעים משימוש או מחוסר יכולת להשתמש באתר.
            </p>
          </section>
          <section aria-labelledby="terms-law">
            <h2 id="terms-law" className="mb-3 text-xl font-semibold text-white">
              דין ושיפוט
            </h2>
            <p>על תנאים אלה יחול הדין הישראלי, וסמכות השיפוט הבלעדית נתונה לבתי המשפט המוסמכים בישראל.</p>
          </section>
          <p className="text-xs text-slate-400">עודכן לאחרונה: אפריל 2026. מסמך זה אינו ייעוץ משפטי.</p>
        </div>
      </main>
    </div>
  )
}
