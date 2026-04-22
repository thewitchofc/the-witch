/* eslint-disable react-refresh/only-export-components -- Provider + hooks באותו מודול */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { NavigateOptions, To } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const OVERLAY_IN_MS = 250
const OVERLAY_OUT_MS = 360

type PageTransitionContextValue = {
  go: (to: To, options?: NavigateOptions) => void
  covered: boolean
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [covered, setCovered] = useState(false)
  const busy = useRef(false)
  const timersRef = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) window.clearTimeout(id)
    timersRef.current = []
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const go = useCallback(
    (to: To, options?: NavigateOptions) => {
      if (busy.current) return
      if (prefersReducedMotion()) {
        navigate(to, options)
        return
      }
      busy.current = true
      clearTimers()
      setCovered(true)
      const t1 = window.setTimeout(() => {
        navigate(to, options)
        const t2 = window.setTimeout(() => {
          setCovered(false)
          busy.current = false
          timersRef.current = timersRef.current.filter((id) => id !== t2)
        }, OVERLAY_OUT_MS)
        timersRef.current.push(t2)
        timersRef.current = timersRef.current.filter((id) => id !== t1)
      }, OVERLAY_IN_MS)
      timersRef.current.push(t1)
    },
    [navigate, clearTimers],
  )

  const value = useMemo(() => ({ go, covered }), [go, covered])

  return <PageTransitionContext.Provider value={value}>{children}</PageTransitionContext.Provider>
}

export function usePageTransition(): PageTransitionContextValue {
  const ctx = useContext(PageTransitionContext)
  if (!ctx) throw new Error('usePageTransition must be used within PageTransitionProvider')
  return ctx
}
