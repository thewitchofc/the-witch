import { Link } from 'react-router-dom'
import { trackEvent } from '../lib/analytics'

const linkClass =
  'font-medium text-violet-300 underline decoration-violet-400/40 underline-offset-[5px] transition-colors hover:text-white hover:decoration-cyan-400/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70'

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-[#020617] py-10 text-white md:py-14"
      dir="rtl"
      lang="he"
      aria-labelledby="about-heading"
    >
      <div
        className="mx-auto max-w-3xl rounded-2xl border border-white/5 bg-slate-950/30 px-6 py-12 text-center shadow-[0_0_40px_rgba(139,92,246,0.08)] backdrop-blur-lg md:px-8 md:py-16"
      >
        <h1
          id="about-heading"
          className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-white md:text-4xl md:leading-[1.12] lg:text-5xl"
        >
          לא כל עסק מתאים לעבוד איתי.
        </h1>

        <div className="mt-8 space-y-6 text-pretty text-base leading-relaxed text-slate-300 md:mt-10 md:text-lg md:leading-loose">
          <p>אני מפתחת אתרים עם מטרה אחת.</p>
          <p>להביא תוצאות.</p>

          <p>לא עוד אתר יפה.</p>
          <p>אלא מערכת מדויקת.</p>
          <p>שמובילה אנשים לפעולה</p>
          <p>והופכת מבקרים ללקוחות.</p>

          <p>כל פרויקט נבנה מאפס, בקוד מלא.</p>
          <p>בלי תבניות.</p>
          <p>בלי מגבלות.</p>
          <p>ובלי קיצורי דרך.</p>

          <p>אני לא עובדת עם וויקס, שופיפיי או וורדפרס.</p>
          <p>כי כשבונים נכון,</p>
          <p>אין סיבה להתפשר.</p>

          <p>האתרים שאני בונה מתמקדים בדבר אחד:</p>
          <p className="font-medium text-white">ביצועים, חוויית משתמש, והמרות.</p>

          <p>מהירות, נגישות, דיוק בפרטים הקטנים.</p>
          <p>כל מה שגורם לאתר באמת לעבוד עבור העסק.</p>

          <div
            className="mx-auto mt-2 w-fit max-w-full rounded-xl border border-violet-400/15 bg-violet-500/[0.06] px-5 py-4 shadow-[0_0_18px_-4px_rgba(255,255,255,0.12),0_0_28px_-6px_rgba(139,92,246,0.32),0_0_56px_-18px_rgba(34,211,238,0.1)] md:px-6 md:py-5"
            role="note"
          >
            <p className="text-base font-medium leading-relaxed text-white md:text-lg md:leading-loose">
              אני לא מוכרת זמן.
            </p>
            <p className="mt-2 text-base font-medium leading-relaxed text-white md:mt-2.5 md:text-lg md:leading-loose">
              אני מוכרת תוצאה.
            </p>
          </div>

          <p className="mx-auto inline-block max-w-full border-b border-violet-400/55 pb-1 text-base font-medium text-white md:text-lg">
            ולכן אני לא עובדת עם כולם.
          </p>

          <p>העבודה מתאימה לעסקים</p>
          <p>שמבינים את הערך של בנייה נכונה</p>
          <p>ולא מחפשים את הפתרון הזול ביותר.</p>

          <p>אם אתה מחפש אתר שרק יראה טוב -</p>
          <p>יש פתרונות אחרים.</p>

          <div className="space-y-3 border-t border-white/[0.06] pt-8 md:space-y-4 md:pt-10">
            <p className="font-medium text-white">אם אתה מחפש אתר שמביא לקוחות,</p>
            <p className="text-slate-300">
              <Link
                to="/apply#contact"
                className={linkClass}
                aria-label="מעבר לטופס בדיקת התאמה לפרויקט"
                onClick={() =>
                  trackEvent('cta_click', { cta_location: 'about_inline', link_url: '/apply#contact' })
                }
              >
                תמלא את הטופס
              </Link>{' '}
              ונבדוק התאמה.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
