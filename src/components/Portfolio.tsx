import { usePageTransition } from '../context/PageTransitionContext'
import royalFruitHero from '../assets/royal-fruit-hero.png?url'
import { trackEvent } from '../lib/analytics'
import { lielEdriOgImage, sabGlassOgImage, sachiRamenHeroImage } from '../data/clientOgImages'

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
    title: 'SAB Glass',
    description:
      'לא עוד אתר תדמית, אלא מערכת שמביאה לקוחות מגוגל. בנוי עם דגש על מהירות, SEO וחוויית משתמש שמובילה לפעולה.',
    outcome: 'תוצאה: ↑ חשיפה בגוגל + פניות חדשות',
    tags: ['SEO', 'המרות', 'ביצועים', 'קוד מלא'],
    image: sabGlassOgImage,
    imageAlt: 'מסך הבית של SAB Glass, מקלחוני זכוכית בהתאמה אישית',
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
    href: 'https://sachiramen-sushi.onrender.com/',
  },
  {
    title: 'Liel Edri Home Baking',
    description: 'אתר למותג אישי עם חוויית משתמש זורמת שמחזקת אמון ומובילה לפניות.',
    outcome: 'תוצאה: ↑ אמון + פניות דרך האתר',
    tags: ['מיתוג', 'UX', 'עיצוב', 'המרות'],
    image: lielEdriOgImage,
    imageAlt: 'מסך הבית של Liel Edri, קינוחי בוטיק ביתיים',
    href: '/projects/liel-edri',
  },
]

function ProjectCard({ project }: { project: PortfolioProject }) {
  const { go } = usePageTransition()

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
      className="block cursor-pointer rounded-none border-0 bg-transparent p-0 shadow-none ring-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
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
      <div className="space-y-3">
        <div className="overflow-hidden rounded-lg bg-slate-950">
          <img
            src={project.image}
            alt={project.imageAlt}
            width={900}
            height={520}
            loading="lazy"
            decoding="async"
            className="h-[200px] w-full object-cover object-center md:h-[240px]"
          />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white md:text-lg">{project.title}</h3>
          <p className="mt-1 line-clamp-1 text-sm leading-snug text-white/60">{project.description}</p>
        </div>
      </div>
    </div>
  )
}

export function PortfolioGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8">
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
