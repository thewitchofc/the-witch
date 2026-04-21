import { Link, NavLink } from 'react-router-dom'
import { trackEvent } from '../lib/analytics'

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
          <ul className="flex flex-wrap items-center justify-center gap-3 md:flex-nowrap md:gap-6 lg:gap-8">
            <li className="order-first flex w-full basis-full justify-center md:order-none md:w-auto md:basis-auto md:justify-end">
              <Link
                to="/apply"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-l from-cyan-400 via-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] ring-1 ring-white/15 transition hover:opacity-95 hover:shadow-[0_0_28px_rgba(34,211,238,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80 md:px-6 md:text-base"
                onClick={() =>
                  trackEvent('cta_click', {
                    cta_location: 'navbar_primary',
                    link_url: '/apply',
                  })
                }
              >
                שיחת התאמה חינם
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
