import { CustomLink } from '../CustomLink'
import { blogArticlePath, formatBlogDate, type BlogPost } from '../../data/blogPosts'

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45 p-6 text-right shadow-[0_0_32px_rgba(15,23,42,0.18)] ring-1 ring-white/[0.04] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.04] hover:shadow-[0_0_38px_rgba(34,211,238,0.10)] md:p-7">
      <div
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-l from-transparent via-cyan-300/45 to-transparent opacity-0 transition group-hover:opacity-100"
        aria-hidden
      />
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
        {post.tags?.length ? (
          <>
            <span aria-hidden>·</span>
            <span className="text-slate-500">{post.tags.slice(0, 3).join(' · ')}</span>
          </>
        ) : null}
      </div>
      <h2 className="text-balance text-xl font-semibold leading-snug text-white md:text-2xl">
        <CustomLink
          to={blogArticlePath(post.slug)}
          className="transition hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
        >
          {post.title}
        </CustomLink>
      </h2>
      <p className="mt-3 text-pretty text-sm leading-relaxed text-slate-300 md:text-base">{post.excerpt}</p>
      <CustomLink
        to={blogArticlePath(post.slug)}
        className="mt-5 inline-flex min-h-[44px] items-center text-sm font-semibold text-cyan-200 underline-offset-4 transition hover:text-white hover:underline"
      >
        קראי עוד
      </CustomLink>
    </article>
  )
}
