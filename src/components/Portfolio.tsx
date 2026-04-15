import { useNavigate } from 'react-router-dom'

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
    'group relative block cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70',
    'max-md:overflow-visible max-md:rounded-none max-md:border-0 max-md:bg-transparent max-md:shadow-none max-md:backdrop-blur-none max-md:ring-0',
    'md:overflow-visible md:rounded-none md:border-0 md:bg-transparent md:backdrop-blur-none md:shadow-none md:ring-0',
    isFeatured ? 'md:col-span-2' : '',
  ].join(' ')

  function openProject() {
    const { href } = project
    if (href.startsWith('/')) {
      navigate(href)
      return
    }
    window.open(href, '_blank', 'noopener,noreferrer')
  }
  const desktopMediaMinH = isFeatured ? 'min-h-[300px] h-[300px] lg:h-[320px]' : 'min-h-[240px] h-[240px] lg:min-h-[260px] lg:h-[260px]'

  const statusBadge = isFeatured ? (
    <span
      className="absolute right-2 top-2 z-20 rounded-full bg-emerald-500/25 px-2 py-0.5 text-[10px] font-medium text-emerald-200 md:right-4 md:top-4 md:px-3 md:py-1 md:text-xs md:text-emerald-300"
      lang="he"
    >
      פרויקט באוויר
    </span>
  ) : (
    <span
      className="absolute right-2 top-2 z-20 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/75 backdrop-blur-sm md:right-4 md:top-4 md:px-3 md:py-1 md:text-xs md:text-white/70"
      lang="he"
    >
      בפיתוח
    </span>
  )

  const inner = (
    <>
      <div className="relative p-0 shadow-none md:hidden">
        {statusBadge}
        <img
          src={project.image}
          alt={project.imageAlt}
          width={900}
          height={520}
          loading="lazy"
          decoding="async"
          className="h-[200px] w-full rounded-xl object-cover shadow-none ring-0"
        />
      </div>
      <div className="space-y-3 px-4 pt-3 md:hidden">
        <h3 className="text-base font-semibold text-white">{project.title}</h3>
        <p className="line-clamp-1 text-sm leading-snug text-white/60">{project.description}</p>
      </div>

      {/* דסקטופ: תמונה מלאה, גרדיאנט, טקסט bottom-right, hover — scale + overlay כהה + כפתור */}
      <div
        className={`relative mx-auto hidden w-full max-w-full overflow-hidden rounded-xl md:block ${desktopMediaMinH}`}
      >
        {statusBadge}
        <img
          src={project.image}
          alt={project.imageAlt}
          width={900}
          height={520}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/70 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-black/0 transition duration-500 ease-out group-hover:bg-black/35"
          aria-hidden
        />
        <div className="pointer-events-none absolute bottom-6 right-6 z-10 max-w-[min(100%,22rem)] text-right">
          <h3 className="text-lg font-semibold leading-snug text-white md:text-xl">{project.title}</h3>
          <p className="mt-1 line-clamp-1 text-sm leading-snug text-white/65">{project.description}</p>
        </div>
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 px-6 opacity-0 transition duration-500 ease-out group-hover:opacity-100">
          <span className="rounded-full border border-white/20 bg-white/15 px-6 py-2.5 text-sm font-semibold text-white shadow-lg ring-1 ring-white/10 backdrop-blur-md">
            צפה בפרויקט
          </span>
          {hasLiveAndCase ? (
            <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-4 text-xs text-white/85">
              <a
                href={project.liveSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded-full border border-white/15 bg-black/30 px-3 py-1.5 transition hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
              >
                צפה באתר →
              </a>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(project.href)
                }}
                className="rounded-full border border-white/15 bg-black/30 px-3 py-1.5 font-medium transition hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
                lang="en"
                dir="ltr"
              >
                Case Study
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )

  const isExternalHref = !project.href.startsWith('/')
  const cardAriaLabel = isExternalHref
    ? `${project.title} — פתיחת האתר (נפתח בלשונית חדשה)`
    : `${project.title} — פתיחת הפרויקט`

  return (
    <div
      className={cardClass}
      role="link"
      tabIndex={0}
      onClick={openProject}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          openProject()
        }
      }}
      aria-label={cardAriaLabel}
    >
      {inner}
    </div>
  )
}

export function PortfolioGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  )
}

export function Portfolio() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 py-24 text-white md:px-6 md:py-32"
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
