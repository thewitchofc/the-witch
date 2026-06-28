import { CustomLink, CustomNavLink } from './CustomLink'
import { trackCtaClick } from '../lib/analytics'
import { primaryCtaInnerNavClass, primaryCtaOuterNavClass } from '../lib/primaryCtaClasses'

const navLinkBase =
  'whitespace-nowrap text-sm transition-colors hover:text-white max-md:inline-flex max-md:min-h-[44px] max-md:items-center max-md:rounded-md max-md:px-2.5 max-md:py-2 max-md:active:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70'

function navLinkClassName({ isActive }: { isActive: boolean }): string {
  return `${navLinkBase} ${isActive ? 'text-white' : 'text-slate-300'}`
}

export function Navbar() {
  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 w-full min-w-0 max-w-full border-b border-white/5 bg-slate-900/30 backdrop-blur-md"
      dir="rtl"
      lang="he"
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-3.5 md:px-6 md:py-4">
        <nav aria-label="ניווט ראשי">
          <div className="-mx-4 min-w-0 overflow-x-auto overflow-y-visible overscroll-x-contain px-4 pb-1 [scrollbar-width:none] md:mx-0 md:overflow-visible md:pb-0 md:[scrollbar-width:auto] [&::-webkit-scrollbar]:hidden">
            <ul className="flex w-max min-w-full items-center gap-x-3 pe-1 md:mx-auto md:w-auto md:min-w-0 md:max-w-full md:flex-wrap md:justify-center md:gap-x-6 md:gap-y-2 md:pe-0 lg:gap-x-8">
              <li>
                <CustomNavLink to="/" end className={navLinkClassName}>
                  דף הבית
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/about" className={navLinkClassName}>
                  אודות
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/portfolio" className={navLinkClassName}>
                  עבודות
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/process" className={navLinkClassName}>
                  תהליך עבודה
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/faq" className={navLinkClassName}>
                  שאלות נפוצות
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/blog" className={navLinkClassName}>
                  בלוג
                </CustomNavLink>
              </li>
              <li className="shrink-0 ps-2 md:ps-3">
                <CustomLink
                  to="/apply#contact"
                  className={primaryCtaOuterNavClass}
                  onClick={() => trackCtaClick('navbar', '/apply#contact')}
                >
                  <span className={primaryCtaInnerNavClass}>טופס בדיקת התאמה</span>
                </CustomLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}
