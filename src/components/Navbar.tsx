import { NavLink } from 'react-router-dom'

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
          <ul className="flex flex-wrap items-center justify-center gap-4 md:flex-nowrap md:gap-8">
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
              <NavLink to="/apply" className={navLinkClassName}>
                בדיקת התאמה
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
