import { Link, NavLink } from 'react-router-dom'
import { trackEvent } from '../lib/analytics'
import { primaryCtaInnerNavClass, primaryCtaOuterNavClass } from '../lib/primaryCtaClasses'

const navLinkBase =
  'max-md:text-xs md:text-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70'

function navLinkClassName({ isActive }: { isActive: boolean }): string {
  return `${navLinkBase} ${isActive ? 'text-white' : 'text-slate-300'}`
}

export function Navbar() {
  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 w-full border-b border-white/5 bg-slate-900/30 backdrop-blur-md"
      dir="rtl"
      lang="he"
    >
      <div className="mx-auto flex max-w-7xl justify-center px-4 py-3 md:px-6 md:py-4">
        <nav aria-label="ניווט ראשי">
          <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3 md:flex-nowrap md:gap-6 lg:gap-8">
            <li className="order-first shrink-0 md:order-none">
              <Link
                to="/apply"
                aria-label="שיחת התאמה חינם, מעבר לטופס יצירת קשר"
                className={primaryCtaOuterNavClass}
                onClick={() =>
                  trackEvent('cta_click', {
                    cta_location: 'navbar_primary',
                    link_url: '/apply',
                  })
                }
              >
                <span className={primaryCtaInnerNavClass}>
                  <span className="sm:hidden">התאמה חינם</span>
                  <span className="hidden sm:inline">שיחת התאמה חינם</span>
                </span>
              </Link>
            </li>
            <li>
              <NavLink to="/" end className={navLinkClassName}>
                דף הבית
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClassName}>
                אודות
              </NavLink>
            </li>
            <li>
              <NavLink to="/portfolio" className={navLinkClassName}>
                עבודות
              </NavLink>
            </li>
            <li>
              <NavLink to="/process" className={navLinkClassName}>
                תהליך עבודה
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" className={navLinkClassName}>
                שאלות נפוצות
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
