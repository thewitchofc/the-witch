import { CustomLink } from '../components/CustomLink'
import { BlogPageShell } from '../components/blog/BlogPageShell'
import { BlogPostCard } from '../components/blog/BlogPostCard'
import { JsonLd } from '../components/JsonLd'
import { Seo } from '../components/Seo'
import { getPublishedBlogPosts } from '../data/blogPosts'
import { trackCtaClick } from '../lib/analytics'
import { primaryCtaInnerClass, primaryCtaOuterClass } from '../lib/primaryCtaClasses'
import { buildBlogListingJsonLd } from '../seo/structuredData'

export function BlogPage() {
  const posts = getPublishedBlogPosts()

  return (
    <>
      <JsonLd data={buildBlogListingJsonLd()} />
      <Seo
        title="בלוג, The Witch"
        description="תובנות על בניית אתרים, המרות, מהירות וחשיבה עסקית. מאמרים מאת אור, The Witch."
        path="/blog"
      />
      <BlogPageShell>
        <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-24 md:px-6 md:pb-32 md:pt-28">
          <header className="mx-auto max-w-3xl text-center">
            <p className="mx-auto mb-4 w-fit rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1 text-xs font-medium text-cyan-100">
              בלוג
            </p>
            <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              מחשבות על אתרים, עסקים ותוצאות
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
              כאן יופיעו מאמרים קצרים, בקול אישי, בלי תוכן גנרי. על מה שבאמת עובד כשבונים אתר שמביא פניות.
            </p>
          </header>

          {posts.length > 0 ? (
            <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:mt-14 md:gap-6">
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <section
              aria-labelledby="blog-empty-heading"
              className="mx-auto mt-12 max-w-2xl rounded-3xl border border-white/10 bg-slate-950/45 px-6 py-10 text-center shadow-[0_0_40px_rgba(15,23,42,0.2)] ring-1 ring-white/[0.04] backdrop-blur-xl md:mt-14 md:px-8 md:py-12"
            >
              <h2 id="blog-empty-heading" className="text-balance text-xl font-semibold text-white md:text-2xl">
                מאמרים בדרך
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-pretty text-sm leading-relaxed text-slate-300 md:text-base">
                הבלוג בהקמה. כשמאמר חדש יעלה, הוא יופיע כאן. עד אז, אפשר לראות עבודות, לקרוא על התהליך, או לפתוח
                שיחת התאמה.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CustomLink
                  to="/apply#contact"
                  className={primaryCtaOuterClass}
                  onClick={() => trackCtaClick('blog_empty', '/apply#contact')}
                >
                  <span className={primaryCtaInnerClass}>שיחת התאמה</span>
                </CustomLink>
                <CustomLink
                  to="/portfolio"
                  className="inline-flex min-h-[44px] items-center rounded-full border border-white/15 bg-slate-950/45 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/25 hover:text-white"
                  onClick={() => trackCtaClick('blog_empty', '/portfolio')}
                >
                  לתיק העבודות
                </CustomLink>
              </div>
            </section>
          )}
        </main>
      </BlogPageShell>
    </>
  )
}

export default BlogPage
