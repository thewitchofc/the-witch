import { CustomNavLink } from './CustomLink'

const navLinkBase =
  'max-md:text-xs md:text-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70'

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
      <div className="mx-auto flex w-full min-w-0 max-w-7xl justify-center px-4 py-3 md:px-6 md:py-4">
        <nav aria-label="ניווט ראשי">
          <ul className="flex min-w-0 max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3 md:flex-nowrap md:gap-6 lg:gap-8">
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
          </ul>
        </nav>
      </div>
    </header>
  )
}
