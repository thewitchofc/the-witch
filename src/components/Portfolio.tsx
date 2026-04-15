import { Link, useNavigate } from 'react-router-dom'

type PortfolioProject = {
  title: string
  description: string
  outcome: string
  tags: string[]
  image: string
  imageAlt: string
  href: string
  /** פרויקט ראשי — רוחב מלא בדסקטופ, תג חי, CTA לאתר בפרודקשן */
  featured?: boolean
  /** כשיש גם מקרה בוחן פנימי וגם אתר חי — הכרטיס מנווט למקרה הבוחן; הקישור החי נפרד */
  liveSiteUrl?: string
}

const projects: PortfolioProject[] = [
  {
    title: 'SAB Glass',
    description:
      'לא עוד אתר תדמית — אלא מערכת שמביאה לקוחות מגוגל. בנוי עם דגש על מהירות, SEO וחוויית משתמש שמובילה לפעולה.',
    outcome: 'תוצאה: ↑ חשיפה בגוגל + פניות חדשות',
    tags: ['SEO', 'המרות', 'ביצועים', 'קוד מלא'],
    image: '/portfolio/sab-glass-hero.png',
    imageAlt: 'מסך הבית של SAB Glass — מקלחוני זכוכית בהתאמה אישית',
    href: '/projects/sab-glass',
    featured: true,
    liveSiteUrl: 'https://sabglass.co.il/',
  },
  {
    title: 'Royal Fruit',
    description:
      'אתר מכירתי שנבנה כדי להגדיל סל קנייה ולשפר המרות, עם חוויית משתמש חלקה ומערכת חיפוש חכמה.',
    outcome: 'תוצאה: ↑ סל קנייה + חוויית רכישה חלקה',
    tags: ['E-commerce', 'UX', 'המרות', 'חיפוש'],
    image: '/portfolio/royal-fruit-hero.png',
    imageAlt: 'מסך הבית של Royal Fruit — פירות וירקות טריים עד הבית',
    href: '/projects/royal-fruit',
  },
  {
    title: 'Sachi Ramen & Sushi',
    description:
      'אתר שנבנה כדי להוביל להזמנה במהירות — עם מבנה ברור, ניווט מדויק ותצוגה שמדגישה את המנות ומניעה לפעולה.',
    outcome: 'תוצאה: ↑ מעבר מהיר להזמנה במובייל',
    tags: ['UX', 'Mobile First', 'המרות', 'תפריט'],
    image: '/portfolio/sachi-ramen-hero.png',
    imageAlt: 'מסך הבית של Sachi Ramen & Sushi — ראמן, סושי וקריאה להזמנה',
    href: 'https://sachiramen-sushi.netlify.app/',
  },
  {
    title: 'Liel Edri Home Baking',
    description: 'אתר למותג אישי עם חוויית משתמש זורמת שמחזקת אמון ומובילה לפניות.',
    outcome: 'תוצאה: ↑ אמון + פניות דרך האתר',
    tags: ['מיתוג', 'UX', 'עיצוב', 'המרות'],
    image: '/portfolio/liel-edri-hero.png',
    imageAlt: 'מסך הבית של Liel Edri — קינוחי בוטיק ביתיים',
    href: '/projects/liel-edri',
  },
]

function ProjectCard({ project }: { project: PortfolioProject }) {
  const navigate = useNavigate()
  const isFeatured = Boolean(project.featured)
  const hasLiveAndCase = Boolean(project.featured && project.liveSiteUrl)
  const cardClass = [
    'group relative block cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 md:transition-all md:duration-500 md:ease-out',
    isFeatured
      ? 'md:col-span-2 md:hover:scale-[1.05] md:hover:shadow-[0_0_100px_rgba(139,92,246,0.38)] md:hover:shadow-[0_0_140px_rgba(34,211,238,0.12)]'
      : 'md:hover:scale-[1.01] md:hover:shadow-[0_0_60px_rgba(139,92,246,0.15)]',
  ].join(' ')

  const isInternal = project.href.startsWith('/')
  const ctaLabel = 'צפה בפרויקט →'
  const mobileImgH = isFeatured ? 'h-[220px]' : 'h-[180px]'
  const desktopMediaMinH = isFeatured ? 'min-h-[320px] h-[320px]' : 'min-h-[280px] lg:min-h-[300px]'
  const desktopImgScale = isFeatured
    ? 'transition-all duration-500 ease-out group-hover:scale-110'
    : 'transition-all duration-500 ease-out group-hover:scale-105'

  const metaBlock = (
    <>
      <p className="mt-1.5 text-xs leading-relaxed text-violet-300 md:mt-2">{project.outcome}</p>
      <div className="mt-2 flex flex-wrap gap-1.5 md:mt-3 md:gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/5 px-2 py-1 text-xs font-medium text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  )

  const dualControls = hasLiveAndCase ? (
    <>
      <a
        href={project.liveSiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="absolute left-4 top-4 z-30 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/50 hover:ring-1 hover:ring-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 md:px-3.5 md:py-1.5 md:text-sm"
      >
        צפה באתר →
      </a>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          navigate(project.href)
        }}
        className="absolute bottom-6 left-4 z-30 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 md:left-6 md:px-3 md:text-[11px]"
        lang="en"
        dir="ltr"
      >
        Case Study
      </button>
    </>
  ) : null

  const statusBadge = isFeatured ? (
    <span
      className="absolute right-4 top-4 z-20 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300"
      lang="he"
    >
      פרויקט באוויר
    </span>
  ) : (
    <span
      className="absolute right-4 top-4 z-20 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70"
      lang="he"
    >
      בפיתוח
    </span>
  )

  const inner = (
    <>
      <div className="relative overflow-hidden md:hidden">
        {statusBadge}
        <img
          src={project.image}
          alt={project.imageAlt}
          width={900}
          height={520}
          loading="lazy"
          decoding="async"
          className={`w-full object-cover ${mobileImgH}`}
        />
      </div>
      <div className="px-4 pb-4 pt-3 md:hidden">
        <h3 className="text-base font-medium text-white">{project.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{project.description}</p>
        {isFeatured && !hasLiveAndCase ? (
          <span className="mt-3 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white">
            {ctaLabel}
          </span>
        ) : null}
        {hasLiveAndCase ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a
              href={project.liveSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex min-h-[40px] items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
            >
              צפה באתר →
            </a>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                navigate(project.href)
              }}
              className="inline-flex min-h-[40px] items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium uppercase tracking-wide text-white/85 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
              lang="en"
              dir="ltr"
            >
              Case Study
            </button>
          </div>
        ) : null}
        {metaBlock}
      </div>

      <div className={`relative hidden overflow-hidden md:block ${desktopMediaMinH}`}>
        {statusBadge}
        {dualControls}
        <img
          src={project.image}
          alt={project.imageAlt}
          width={900}
          height={520}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover ${desktopImgScale}`}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 ease-out group-hover:from-black/90 group-hover:via-black/45"
          aria-hidden
        />
        <div
          className={`absolute inset-0 flex items-center justify-center p-6 transition-all duration-500 ease-out ${
            hasLiveAndCase
              ? 'pointer-events-none opacity-0'
              : 'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
          }`}
        >
          <span
            className="rounded-full border border-white/20 bg-white/15 px-5 py-2.5 text-sm font-semibold text-white shadow-lg ring-1 ring-white/10 backdrop-blur-md"
            aria-hidden
          >
            {ctaLabel}
          </span>
        </div>
        <div className="absolute bottom-6 right-6 z-10 max-w-[min(100%,22rem)] rounded-xl bg-black/30 p-3 backdrop-blur-md md:p-4">
          <h3 className="text-lg font-semibold leading-snug text-white md:text-xl">{project.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-white/90">{project.description}</p>
        </div>
      </div>
      <div className="hidden p-5 md:block md:p-6">{metaBlock}</div>
    </>
  )

  if (hasLiveAndCase) {
    return (
      <div
        className={cardClass}
        role="link"
        tabIndex={0}
        onClick={() => navigate(project.href)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            navigate(project.href)
          }
        }}
        aria-label={`${project.title} — מעבר למקרה בוחן`}
      >
        {inner}
      </div>
    )
  }

  if (isInternal) {
    return (
      <Link to={project.href} className={cardClass}>
        {inner}
      </Link>
    )
  }

  return (
    <a href={project.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
      {inner}
    </a>
  )
}

export function PortfolioGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  )
}

export function Portfolio() {
  return (
    <section
      className="mx-auto max-w-6xl px-6 py-24 text-white md:py-32"
      dir="rtl"
      lang="he"
      aria-labelledby="portfolio-heading"
    >
      <h2
        id="portfolio-heading"
        className="mb-16 text-center text-2xl font-semibold tracking-tight text-white md:mb-20 md:text-4xl"
      >
        פרויקטים שבנויים להביא תוצאות
      </h2>

      <PortfolioGrid />
    </section>
  )
}
