import type { BlogPostBlock } from '../../data/blogPosts'

function BlogBlock({ block }: { block: BlogPostBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <p className="text-pretty leading-relaxed text-slate-300 md:text-lg">{block.text}</p>
    case 'heading':
      if (block.level === 2) {
        return (
          <h2 className="pt-2 text-balance text-2xl font-semibold leading-snug text-white md:text-3xl">
            {block.text}
          </h2>
        )
      }
      return (
        <h3 className="pt-1 text-balance text-xl font-semibold leading-snug text-white md:text-2xl">
          {block.text}
        </h3>
      )
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <Tag
          className={`space-y-2 pr-5 text-pretty leading-relaxed text-slate-300 md:text-lg ${
            block.ordered ? 'list-decimal' : 'list-disc'
          } marker:text-cyan-300/80`}
        >
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </Tag>
      )
    }
    case 'quote':
      return (
        <blockquote className="rounded-2xl border border-violet-300/15 bg-violet-500/[0.08] px-5 py-4 text-pretty text-base leading-relaxed text-white md:text-lg">
          <p>{block.text}</p>
          {block.cite ? <footer className="mt-2 text-sm text-slate-400">{block.cite}</footer> : null}
        </blockquote>
      )
    case 'callout':
      return (
        <aside className="rounded-2xl border border-cyan-300/15 bg-cyan-500/[0.08] px-5 py-4 text-pretty">
          {block.title ? (
            <p className="mb-2 text-sm font-semibold text-cyan-100">{block.title}</p>
          ) : null}
          <p className="leading-relaxed text-slate-200 md:text-lg">{block.text}</p>
        </aside>
      )
    default:
      return null
  }
}

/** רender לפי blocks — מוכן לתוכן שייכתב ידנית ב-blogPosts.ts */
export function BlogArticleBody({ blocks }: { blocks: readonly BlogPostBlock[] }) {
  if (blocks.length === 0) {
    return (
      <p className="rounded-2xl border border-white/10 bg-slate-950/50 px-5 py-4 text-center text-sm text-slate-400">
        תוכן המאמר טרם נוסף.
      </p>
    )
  }

  return (
    <div className="space-y-6 text-right">
      {blocks.map((block, index) => (
        <BlogBlock key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  )
}
