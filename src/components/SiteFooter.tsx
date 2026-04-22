import { CustomLink } from './CustomLink'
import { trackEvent } from '../lib/analytics'

const GOOGLE_BUSINESS_REVIEW_URL =
  'https://g.page/r/CTT3x24u8dC2EBM/review' as const

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer
      className="relative z-10 border-t border-white/10 bg-slate-950/90 py-8 text-slate-300 backdrop-blur-sm"
      dir="rtl"
      lang="he"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col items-center justify-center gap-4 px-4 text-center text-sm md:flex-row md:flex-wrap md:justify-between md:text-left">
        <p className="order-2 text-slate-300 md:order-1">
          © {year} The Witch, כל הזכויות שמורות
        </p>
        <nav
          aria-label="קישורי תחתית"
          className="order-1 flex min-w-0 max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 md:order-2"
        >
          <CustomLink
            to="/apply"
            className="font-semibold text-cyan-200 underline-offset-2 transition hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
            onClick={() =>
              trackEvent('cta_click', {
                cta_location: 'footer',
                link_url: '/apply',
              })
            }
          >
            שיחת התאמה
          </CustomLink>
          <CustomLink
            to="/hamachshefa-bniyat-atarim"
            className="font-medium text-cyan-300/95 underline-offset-2 transition hover:text-cyan-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
            onClick={() =>
              trackEvent('cta_click', {
                cta_location: 'footer',
                link_url: '/hamachshefa-bniyat-atarim',
              })
            }
          >
            המכשפה לבניית אתרים
          </CustomLink>
          <a
            href={GOOGLE_BUSINESS_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-cyan-300/95 underline-offset-2 transition hover:text-cyan-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
            aria-label="השארת ביקורת ב-Google Business (נפתח בחלון חדש)"
            onClick={() =>
              trackEvent('cta_click', {
                cta_location: 'footer',
                link_url: GOOGLE_BUSINESS_REVIEW_URL,
                cta_type: 'google_business_review',
              })
            }
          >
            ביקורת בגוגל
          </a>
          <CustomLink
            to="/privacy"
            className="font-medium text-cyan-300/95 underline-offset-2 transition hover:text-cyan-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
          >
            מדיניות פרטיות
          </CustomLink>
          <CustomLink
            to="/terms"
            className="font-medium text-cyan-300/95 underline-offset-2 transition hover:text-cyan-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
          >
            תנאי שימוש
          </CustomLink>
        </nav>
      </div>
    </footer>
  )
}
