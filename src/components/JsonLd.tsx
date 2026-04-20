import { Helmet } from 'react-helmet-async'

/** JSON-LD ל־Schema.org (ארגון, FAQ, שירות וכו׳) */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  )
}
