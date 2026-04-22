/**
 * בדיקת overflow אופקי — פעיל בכל הרצת dev (`import.meta.env.DEV`).
 *
 * שני קריטריונים (אחד מספיק):
 * 1. `element.scrollWidth > window.innerWidth`
 * 2. `getBoundingClientRect`: `rect.left < 0` או `rect.right > window.innerWidth` (חריגה ויזואלית)
 *
 * מסנן אלמנטים ברוחב < 20px (רעש).
 * רק לוג בלי outlines: `?overflowAudit=log`
 */
const ATTR = 'data-overflow-audit'
const MIN_WIDTH_PX = 20

function describe(el: HTMLElement): string {
  const id = el.id ? `#${el.id}` : ''
  const cls =
    el.className && typeof el.className === 'string'
      ? `.${el.className.trim().split(/\s+/).slice(0, 4).join('.')}`
      : ''
  return `${el.tagName.toLowerCase()}${id}${cls}`
}

type OverflowReason = 'scrollWidth' | 'rect'

function detectOverflow(el: HTMLElement, inner: number, tolerance: number) {
  const rect = el.getBoundingClientRect()
  if (rect.width < MIN_WIDTH_PX) {
    return null
  }

  const byScroll = el.scrollWidth > inner + tolerance
  const byRect = rect.left < -tolerance || rect.right > inner + tolerance

  if (!byScroll && !byRect) {
    return null
  }

  const reasons: OverflowReason[] = []
  if (byScroll) reasons.push('scrollWidth')
  if (byRect) reasons.push('rect')

  return {
    rect,
    reasons,
    byScroll,
    byRect,
  }
}

export function installOverflowAudit(): () => void {
  if (!import.meta.env.DEV) return () => {}

  const params = new URLSearchParams(window.location.search)
  const logOnly = params.get('overflowAudit') === 'log'

  const tolerance = 1
  let raf = 0
  let lastPrinted = ''

  const audit = () => {
    const inner = window.innerWidth
    const nodes = document.body.querySelectorAll<HTMLElement>('body *')
    const offenders: HTMLElement[] = []
    const meta = new Map<
      HTMLElement,
      {
        rect: DOMRect
        reasons: OverflowReason[]
        rectLeft: number
        rectRight: number
        innerWidth: number
      }
    >()

    for (const el of nodes) {
      const hit = detectOverflow(el, inner, tolerance)
      if (!hit) continue
      offenders.push(el)
      meta.set(el, {
        rect: hit.rect,
        reasons: hit.reasons,
        rectLeft: hit.rect.left,
        rectRight: hit.rect.right,
        innerWidth: inner,
      })
    }

    const offenderSet = new Set(offenders)

    for (const el of nodes) {
      const bad = offenderSet.has(el)
      if (bad) {
        if (!logOnly && !el.hasAttribute(ATTR)) {
          el.setAttribute(ATTR, '')
          el.style.outline = '2px solid red'
          el.style.outlineOffset = '0'
        }
      } else if (el.hasAttribute(ATTR)) {
        el.removeAttribute(ATTR)
        el.style.outline = ''
        el.style.outlineOffset = ''
      }
    }

    const summary = offenders.map((el) => {
      const m = meta.get(el)!
      return {
        el: describe(el),
        reasons: m.reasons,
        rectLeft: Math.round(m.rectLeft * 100) / 100,
        rectRight: Math.round(m.rectRight * 100) / 100,
        windowInnerWidth: m.innerWidth,
        scrollWidth: el.scrollWidth,
        tag: el.tagName,
        isCanvas: el.tagName === 'CANVAS',
      }
    })

    const key = JSON.stringify(summary)
    if (key !== lastPrinted && summary.length > 0) {
      lastPrinted = key
      for (const el of offenders) {
        const m = meta.get(el)!
        // eslint-disable-next-line no-console
        console.warn('[overflowAudit]', describe(el), {
          rectLeft: m.rectLeft,
          rectRight: m.rectRight,
          windowInnerWidth: m.innerWidth,
          reasons: m.reasons,
        })
      }
      // eslint-disable-next-line no-console
      console.warn(
        `[overflowAudit] סה״כ ${offenders.length} אלמנטים (scrollWidth ו/או מיקום מחוץ למסך, רוחב ≥ ${MIN_WIDTH_PX}px):`,
        summary,
      )
    } else if (key !== lastPrinted && summary.length === 0) {
      lastPrinted = key
      // eslint-disable-next-line no-console
      console.info(`[overflowAudit] אין חריגה אופקית (פילטר רוחב ≥ ${MIN_WIDTH_PX}px)`)
    }

    const docSw = document.documentElement.scrollWidth
    if (docSw > inner + tolerance) {
      // eslint-disable-next-line no-console
      console.warn(
        `[overflowAudit] documentElement.scrollWidth=${docSw} > innerWidth=${inner}`,
      )
    }
  }

  const schedule = () => {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(audit)
  }

  let debounce = 0
  const scheduleDebounced = () => {
    window.clearTimeout(debounce)
    debounce = window.setTimeout(schedule, 320)
  }

  schedule()
  window.addEventListener('resize', schedule, { passive: true })
  window.addEventListener('scroll', schedule, { capture: true, passive: true })
  const mo = new MutationObserver(scheduleDebounced)
  mo.observe(document.body, { subtree: true, childList: true, attributes: true })

  return () => {
    cancelAnimationFrame(raf)
    window.clearTimeout(debounce)
    window.removeEventListener('resize', schedule)
    window.removeEventListener('scroll', schedule, true)
    mo.disconnect()
    document.querySelectorAll<HTMLElement>(`[${ATTR}]`).forEach((el) => {
      el.removeAttribute(ATTR)
      el.style.outline = ''
      el.style.outlineOffset = ''
    })
  }
}
