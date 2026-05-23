import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useAnalyticsConsent } from '../context/AnalyticsConsentContext'
import {
  trackEvent,
  trackMetaPageView,
  trackMetaScrollDepth,
  trackPageView,
} from '../lib/analytics'

const PROJECT_SLUGS: Record<string, string> = {
  '/projects/sab-glass': 'sab-glass',
  '/projects/royal-fruit': 'royal-fruit',
  '/projects/liel-edri': 'liel-edri',
  '/projects/sachi-ramen': 'sachi-ramen',
}

const SCROLL_DEPTHS_GA = [25, 50, 75, 100] as const
const SCROLL_DEPTHS_META = [50, 90] as const

const TIME_ON_PAGE_MS = 30_000

/** מעקב אחר ניווט, פרויקטים, גלילה, זמן בדף, כוונת יציאה, רק בהסכמה */
export function AnalyticsListener() {
  const { pathname } = useLocation()
  const { consent } = useAnalyticsConsent()
  const scrollFiredGa = useRef<Set<number>>(new Set())
  const scrollFiredMeta = useRef<Set<number>>(new Set())
  const exitIntentFired = useRef(false)

  useEffect(() => {
    scrollFiredGa.current = new Set()
    scrollFiredMeta.current = new Set()
    exitIntentFired.current = false
  }, [pathname])

  useEffect(() => {
    if (consent !== 'granted') return
    trackPageView()
    trackMetaPageView()
    const slug = PROJECT_SLUGS[pathname]
    if (slug) trackEvent('project_view', { project_slug: slug })
  }, [pathname, consent])

  useEffect(() => {
    if (consent !== 'granted') return

    const id = window.setTimeout(() => {
      trackEvent('time_on_page', {
        engagement_threshold_sec: 30,
        pathname,
      })
    }, TIME_ON_PAGE_MS)

    return () => window.clearTimeout(id)
  }, [pathname, consent])

  useEffect(() => {
    if (consent !== 'granted') return

    function onScroll() {
      const doc = document.documentElement
      const maxY = doc.scrollHeight - window.innerHeight
      const pct = maxY <= 8 ? 100 : (window.scrollY / maxY) * 100

      for (const d of SCROLL_DEPTHS_GA) {
        if (pct >= d - 0.5 && !scrollFiredGa.current.has(d)) {
          scrollFiredGa.current.add(d)
          trackEvent('scroll_depth', { depth_percent: d })
          if (d === 100) {
            trackEvent('scroll_complete', { depth_percent: 100 })
          }
        }
      }

      for (const d of SCROLL_DEPTHS_META) {
        if (pct >= d - 0.5 && !scrollFiredMeta.current.has(d)) {
          scrollFiredMeta.current.add(d)
          trackMetaScrollDepth(d, { pathname })
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname, consent])

  /** כוונת יציאה, רק עכבר (מסך מגע: לא אמין, מדלגים) */
  useEffect(() => {
    if (consent !== 'granted') return
    if (!window.matchMedia('(pointer: fine)').matches) return

    function onMouseOut(e: MouseEvent) {
      if (exitIntentFired.current) return
      const to = e.relatedTarget as Node | null
      if (to != null) return
      if (e.clientY > 24) return
      exitIntentFired.current = true
      trackEvent('exit_intent', {
        pathname,
        trigger: 'mouse_top_chrome',
      })
    }

    document.documentElement.addEventListener('mouseout', onMouseOut)
    return () => document.documentElement.removeEventListener('mouseout', onMouseOut)
  }, [pathname, consent])

  return null
}
