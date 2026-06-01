import { useId, useState } from 'react'
import { CustomLink } from './CustomLink'
import { trackCtaClick } from '../lib/analytics'

const HEADING_ID = 'seo-home-witch-heading'

/**
 * בלוק טקסט SEO לדף הבית — מינימלי, נפתח ב־useState (בלי display:none על התוכן).
 */
export function SeoContent() {
  const [open, setOpen] = useState(false)
  const uid = useId().replace(/:/g, '')
  const regionId = `seo-home-expand-${uid}`

  return (
    <section
      className="pointer-events-auto relative z-[11] border-t border-white/[0.08] bg-[#020617]/55 py-8 text-white shadow-[0_-12px_32px_rgba(2,6,23,0.35)] backdrop-blur-2xl backdrop-saturate-150 motion-reduce:bg-[#020617]/95 motion-reduce:shadow-none motion-reduce:backdrop-blur-none sm:py-9"
      dir="rtl"
      lang="he"
      aria-labelledby={HEADING_ID}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2
          id={HEADING_ID}
          className="text-lg font-semibold tracking-tight text-white sm:text-xl"
        >
          המכשפה לבניית אתרים
        </h2>
        <p className="mt-2 text-pretty text-sm leading-snug text-white/70 sm:mt-2.5 sm:text-[15px] sm:leading-relaxed">
          <CustomLink
            to="/hamachshefa-bniyat-atarim"
            className="font-medium text-cyan-200/95 underline decoration-cyan-400/35 underline-offset-2 transition hover:text-cyan-100 hover:decoration-cyan-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
            onClick={() => trackCtaClick('seo_content_home_intro', '/hamachshefa-bniyat-atarim')}
          >
            המכשפה לבניית אתרים
          </CustomLink>{' '}
          מתמחה ביצירת אתרים שמביאים לקוחות אמיתיים עם דגש על מהירות, חוויית משתמש ו-SEO מתקדם.
        </p>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={regionId}
          className="mt-3 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-cyan-200/95 shadow-sm ring-1 ring-white/[0.04] transition hover:border-cyan-400/25 hover:bg-white/[0.07] hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 active:opacity-90 sm:mt-3.5"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'סגור' : 'קרא עוד'}
        </button>

        <div
          id={regionId}
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out motion-reduce:transition-none ${
            open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!open}
        >
          <div className="mt-4 space-y-3 border-t border-white/[0.06] pt-4 text-pretty text-sm leading-relaxed text-white/65 sm:text-[15px] sm:leading-relaxed">
            <p>
              בניית אתרים מקצועית היום היא הרבה מעבר לעיצוב יפה, מדובר ביצירת מערכת שמביאה תוצאות בפועל. המכשפה
              לבניית אתרים מתמקדת בהמרות, חוויית משתמש ודיוק אסטרטגי.
            </p>
            <p>
              עסקים שבוחרים לעבוד עם המכשפה נהנים מאתרים מהירים, מדויקים, ומותאמים למנועי חיפוש, מה שמוביל ליותר
              פניות ויותר לקוחות.
            </p>
            <p>אם אתם מחפשים פתרון אמיתי לבניית אתר שעובד, המכשפה היא הבחירה הנכונה.</p>
            <p className="text-white/60">
              <CustomLink
                to="/hamachshefa-bniyat-atarim"
                className="font-medium text-cyan-200/95 underline decoration-cyan-400/35 underline-offset-2 transition hover:text-cyan-100 hover:decoration-cyan-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
                onClick={() => trackCtaClick('seo_content_home_expanded', '/hamachshefa-bniyat-atarim')}
              >
                המכשפה לבניית אתרים
              </CustomLink>
              {' — '}
              עמוד ייעודי עם פירוט נוסף על הגישה והשירות.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
