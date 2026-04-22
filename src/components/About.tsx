import { CustomLink } from './CustomLink'
import { trackEvent } from '../lib/analytics'

const ABOUT_SPARKLE_COUNT = 12

const linkClass =
  'font-medium text-violet-300 underline decoration-violet-400/40 underline-offset-[5px] transition-colors hover:text-white hover:decoration-cyan-400/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70'

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 overflow-x-hidden bg-[#020617] py-10 text-white md:py-14"
      dir="rtl"
      lang="he"
      aria-labelledby="about-heading"
    >
      <div className="relative mx-auto w-full min-w-0 max-w-3xl py-8 sm:py-10 md:py-14">
        {/*
          טבעת מחוץ לכרטיס: רדיוס ≥ חצי רוחב max-w-3xl (48rem) + מרווח ברור מהמסגרת.
        */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 motion-reduce:hidden motion-safe:animate-[spin_44s_linear_infinite]"
          aria-hidden
        >
          {Array.from({ length: ABOUT_SPARKLE_COUNT }).map((_, i) => {
            const angle = (i * 360) / ABOUT_SPARKLE_COUNT
            const hue = i % 2 === 0 ? 'text-cyan-200/85' : 'text-violet-200/85'
            return (
              <span
                key={i}
                className={`absolute left-0 top-0 block origin-center text-[0.65rem] leading-none drop-shadow-[0_0_6px_rgba(167,139,250,0.55)] motion-safe:animate-[about-sparkle-twinkle_2.8s_ease-in-out_infinite] sm:text-xs md:text-sm ${hue}`}
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(-1 * (min(94vw, 48rem) * 0.5 + 4.5rem)))`,
                  animationDelay: `${i * 0.18}s`,
                }}
              >
                ✦
              </span>
            )
          })}
        </div>

        <div
          className="relative z-10 w-full min-w-0 max-w-full rounded-2xl border border-white/5 bg-slate-950/30 px-6 py-12 text-center shadow-[0_0_40px_rgba(139,92,246,0.08)] backdrop-blur-lg md:px-8 md:py-16"
        >
          <h1
            id="about-heading"
            className="min-w-0 max-w-full text-balance break-words text-3xl font-semibold leading-[1.15] tracking-tight text-white md:text-4xl md:leading-[1.12] lg:text-5xl"
          >
            לא כל עסק מתאים לעבוד איתי.
          </h1>

          <div className="mt-8 w-full min-w-0 max-w-full space-y-6 text-pretty text-base leading-relaxed text-slate-300 md:mt-10 md:text-lg md:leading-loose">
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

            <div className="mt-2 flex w-full min-w-0 justify-center">
              <div
                className="w-full max-w-fit min-w-0 rounded-xl border border-violet-400/15 bg-violet-500/[0.06] px-5 py-4 text-center shadow-[0_0_18px_-4px_rgba(255,255,255,0.12),0_0_28px_-6px_rgba(139,92,246,0.32),0_0_56px_-18px_rgba(34,211,238,0.1)] md:px-6 md:py-5"
                role="note"
              >
                <p className="text-base font-medium leading-relaxed text-white md:text-lg md:leading-loose">
                  אני לא מוכרת זמן.
                </p>
                <p className="mt-2 text-base font-medium leading-relaxed text-white md:mt-2.5 md:text-lg md:leading-loose">
                  אני מוכרת תוצאה.
                </p>
              </div>
            </div>

            <div className="flex w-full min-w-0 justify-center">
              <p className="inline-block max-w-full border-b border-violet-400/55 pb-1 text-center text-base font-medium text-white md:text-lg">
                ולכן אני לא עובדת עם כולם.
              </p>
            </div>

            <p>העבודה מתאימה לעסקים</p>
            <p>שמבינים את הערך של בנייה נכונה</p>
            <p>ולא מחפשים את הפתרון הזול ביותר.</p>

            <p>אם אתה מחפש אתר שרק יראה טוב -</p>
            <p>יש פתרונות אחרים.</p>

            <div className="space-y-3 border-t border-white/[0.06] pt-8 md:space-y-4 md:pt-10">
              <p className="font-medium text-white">אם אתה מחפש אתר שמביא לקוחות,</p>
              <p className="text-slate-300">
                <CustomLink
                  to="/apply#contact"
                  className={linkClass}
                  aria-label="מעבר לטופס בדיקת התאמה לפרויקט"
                  onClick={() =>
                    trackEvent('cta_click', { cta_location: 'about_inline', link_url: '/apply#contact' })
                  }
                >
                  תמלא את הטופס
                </CustomLink>{' '}
                ונבדוק התאמה.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
