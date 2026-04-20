import { buildGlobalSchemaGraph } from '../seo/structuredData'
import { JsonLd } from './JsonLd'

/** Structured data גלובלי: Organization, Person, Service, WebSite */
export function GlobalJsonLd() {
  return <JsonLd data={buildGlobalSchemaGraph()} />
}
