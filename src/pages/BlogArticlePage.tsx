import { Navigate, useParams } from 'react-router-dom'
import { CustomLink } from '../components/CustomLink'
import { BlogArticleBody } from '../components/blog/BlogArticleBody'
import { BlogPageShell } from '../components/blog/BlogPageShell'
import { JsonLd } from '../components/JsonLd'
import { Seo } from '../components/Seo'
import {
  blogArticlePath,
  estimateReadingMinutes,
  formatBlogDate,
  getPublishedBlogPostBySlug,
} from '../data/blogPosts'
import { trackCtaClick } from '../lib/analytics'
import { primaryCtaInnerClass, primaryCtaOuterClass } from '../lib/primaryCtaClasses'
import { buildBlogArticleJsonLd } from '../seo/structuredData'

export function BlogArticlePage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const post = getPublishedBlogPostBySlug(slug)

  if (!post) {
    return <Navigate to="/404" replace />
  }

  const readingMinutes = estimateReadingMinutes(post.body)
  const articlePath = blogArticlePath(post.slug)

  return (
    <>
      <JsonLd data={buildBlogArticleJsonLd(post)} />
      <Seo
        title={`${post.title} | The Witch`}
        description={post.description}
        path={articlePath}
        ogImage={post.ogImage}
        ogType="article"
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
      />
      <BlogPageShell>
        <article className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-24 md:px-6 md:pb-32 md:pt-28">
          <header className="mx-auto max-w-3xl text-center">
            <p className="mx-auto mb-4 w-fit rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1 text-xs font-medium text-cyan-100">
              <CustomLink
                to="/blog"
                className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
              >
                בלוג
              </CustomLink>
              {post.tags?.length ? (
                <>
                  <span aria-hidden> · </span>
                  <span className="text-slate-300">{post.tags[0]}</span>
                </>
              ) : null}
            </p>
            <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              {post.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
              {post.excerpt}
            </p>
            <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-slate-400">
              <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
              <span aria-hidden>·</span>
              <span>{readingMinutes} דק׳ קריאה</span>
            </div>
          </header>

          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/10 bg-slate-950/45 p-6 shadow-[0_0_46px_rgba(139,92,246,0.12)] ring-1 ring-white/[0.05] backdrop-blur-xl md:mt-12 md:p-8">
            <div
              className="pointer-events-none mb-6 h-px bg-gradient-to-l from-transparent via-cyan-300/70 to-transparent"
              aria-hidden
            />
            <BlogArticleBody blocks={post.body} />
          </div>

          <footer className="mx-auto mt-10 max-w-3xl text-center">
            <CustomLink
              to="/blog"
              className="inline-flex min-h-[44px] items-center text-sm font-semibold text-cyan-200 underline-offset-4 transition hover:text-white hover:underline"
            >
              ← חזרה לבלוג
            </CustomLink>
            <div className="mt-8 rounded-2xl border border-violet-300/15 bg-violet-500/[0.07] px-5 py-6">
              <p className="text-pretty text-sm leading-relaxed text-slate-300 md:text-base">
                רוצה לבדוק אם האתר הבא שלך מתאים לבנייה איתי?
              </p>
              <div className="mt-4 flex justify-center">
                <CustomLink
                  to="/apply#contact"
                  className={primaryCtaOuterClass}
                  onClick={() => trackCtaClick('blog_article_footer', '/apply#contact')}
                >
                  <span className={primaryCtaInnerClass}>שיחת התאמה</span>
                </CustomLink>
              </div>
            </div>
          </footer>
        </article>
      </BlogPageShell>
    </>
  )
}

export default BlogArticlePage
