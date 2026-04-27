import { usePageTransition } from '../context/PageTransitionContext'
import royalFruitHero from '../assets/royal-fruit-hero.webp?url'
import { trackEvent } from '../lib/analytics'
import {
  lielEdriLiveUrl,
  lielEdriOgImage,
  sabGlassOgImage,
  sachiRamenHeroImage,
  sachiRamenLiveUrl,
} from '../data/clientOgImages'

type PortfolioProject = {
  title: string
  description: string
  outcome: string
  tags: string[]
  image: string
  imageAlt: string
  href: string
  /** פרויקט ראשי, רוחב מלא בדסקטופ, תג חי, CTA לאתר בפרודקשן */
  featured?: boolean
  /** כשיש גם מקרה בוחן פנימי וגם אתר חי, הכרטיס מנווט למקרה הבוחן; הקישור החי נפרד */
  liveSiteUrl?: string
}

const projects: PortfolioProject[] = [
  {
    title: 'Liel Edri Home Baking',
    description:
      'אתר למותג בוטיק ביתי: מיתוג עדין, ניווט פשוט, ואינטגרציה לוואטסאפ ואינסטגרם — מביא פניות בלי רעש.',
    outcome: 'תוצאה: ↑ אמון + פניות והזמנות',
    tags: ['מיתוג', 'UX', 'המרות', 'מובייל'],
    image: lielEdriOgImage,
    imageAlt: 'מסך הבית של Liel Edri, קינוחי בוטיק ביתיים',
    href: '/projects/liel-edri',
    featured: true,
    liveSiteUrl: lielEdriLiveUrl,
  },
  {
    title: 'Royal Fruit',
    description:
      'אתר מכירתי שנבנה כדי להגדיל סל קנייה ולשפר המרות, עם חוויית משתמש חלקה ומערכת חיפוש חכמה.',
    outcome: 'תוצאה: ↑ סל קנייה + חוויית רכישה חלקה',
    tags: ['E-commerce', 'UX', 'המרות', 'חיפוש'],
    image: royalFruitHero,
    imageAlt: 'מסך הבית של Royal Fruit, פירות וירקות טריים עד הבית',
    href: '/projects/royal-fruit',
  },
  {
    title: 'Sachi Ramen & Sushi',
    description:
      'אתר שנבנה כדי להוביל להזמנה במהירות, עם מבנה ברור, ניווט מדויק ותצוגה שמדגישה את המנות ומניעה לפעולה.',
    outcome: 'תוצאה: ↑ מעבר מהיר להזמנה במובייל',
    tags: ['UX', 'Mobile First', 'המרות', 'תפריט'],
    image: sachiRamenHeroImage,
    imageAlt: 'מסך הבית של Sachi Ramen & Sushi, ראמן, סושי וקריאה להזמנה',
    href: '/projects/sachi-ramen',
    liveSiteUrl: sachiRamenLiveUrl,
  },
  {
    title: 'SAB Glass',
    description:
      'לא עוד אתר תדמית, אלא מערכת שמביאה ללקוחות מגוגל. בנוי עם דגש על מהירות, SEO וחוויית משתמש שמובילה לפעולה.',
    outcome: 'תוצאה: ↑ חשיפה בגוגל + פניות חדשות',
    tags: ['SEO', 'המרות', 'ביצועים', 'קוד מלא'],
    image: sabGlassOgImage,
    imageAlt: 'מסך הבית של SAB Glass, מקלחוני זכוכית בהתאמה אישית',
    href: '/projects/sab-glass',
    liveSiteUrl: 'https://sabglass.co.il/',
  },
]

function ProjectCard({ project }: { project: PortfolioProject }) {
  const { go } = usePageTransition()
  const featured = project.featured === true

  function openProject() {
    const { href } = project
    trackEvent('portfolio_card_open', {
      project_title: project.title,
      destination: href,
      internal: href.startsWith('/'),
    })
    if (href.startsWith('/')) {
      go(href)
      return
    }
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  const isExternalHref = !project.href.startsWith('/')
  const cardAriaLabel = isExternalHref
    ? `${project.title}, פתיחת האתר (נפתח בלשונית חדשה)`
    : `${project.title}, פתיחת הפרויקט`

  return (
    <div
      className={`group block cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-3 text-right shadow-[0_0_32px_rgba(15,23,42,0.18)] ring-1 ring-white/[0.04] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.065] hover:shadow-[0_0_42px_rgba(34,211,238,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 ${
        featured ? 'md:col-span-2 md:grid md:grid-cols-[1.12fr_0.88fr] md:gap-5 md:p-4' : ''
      }`}
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
      <div className={featured ? 'min-w-0' : ''}>
        <div className="relative overflow-hidden rounded-2xl bg-slate-950">
          <img
            src={project.image}
            alt={project.imageAlt}
            width={900}
            height={520}
            sizes={featured ? '(max-width: 768px) 100vw, 58vw' : '(max-width: 768px) 100vw, 50vw'}
            loading="lazy"
            decoding="async"
            className={`w-full object-cover object-center transition duration-500 group-hover:scale-[1.04] ${
              featured ? 'h-[260px] md:h-full md:min-h-[360px]' : 'h-[220px] md:h-[250px]'
            }`}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent opacity-90" />
          <div className="absolute bottom-3 right-3 flex flex-wrap gap-2">
            {project.tags.slice(0, featured ? 4 : 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-slate-950/65 px-2.5 py-1 text-[11px] font-medium text-slate-100 backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>
          {featured ? (
            <span className="absolute left-3 top-3 rounded-full border border-cyan-300/25 bg-cyan-300/[0.12] px-3 py-1 text-xs font-semibold text-cyan-100 backdrop-blur-md">
              פרויקט מוביל
            </span>
          ) : null}
        </div>
      </div>

      <div className={`flex flex-col ${featured ? 'mt-5 md:mt-0 md:justify-center md:py-3' : 'mt-4'}`}>
        <p className="text-xs font-semibold text-cyan-200">{project.outcome}</p>
        <h3
          className={`mt-2 text-balance font-semibold tracking-tight text-white ${
            featured ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`mt-3 text-pretty leading-relaxed text-slate-300 ${
            featured ? 'text-base md:text-lg' : 'line-clamp-3 text-sm md:text-base'
          }`}
        >
          {project.description}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-violet-200 transition group-hover:text-white">
          <span>{isExternalHref ? 'לצפייה באתר' : 'לצפייה בפרויקט'}</span>
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-violet-300/20 bg-violet-300/[0.08] transition group-hover:translate-x-[-2px] group-hover:border-cyan-300/30 group-hover:text-cyan-100"
            aria-hidden
          >
            ←
          </span>
        </div>
      </div>
    </div>
  )
}

export function PortfolioGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
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
