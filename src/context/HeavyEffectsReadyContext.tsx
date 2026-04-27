import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type EffectsStage = 0 | 1 | 2 | 3

type HeavyEffectsContextValue = {
  ready: boolean
  effectsStage: EffectsStage
}

const HeavyEffectsContext = createContext<HeavyEffectsContextValue>({
  ready: false,
  effectsStage: 0,
})

export function useHeavyEffectsReady(): boolean {
  return useContext(HeavyEffectsContext).ready
}

export function useEffectsStage(): EffectsStage {
  return useContext(HeavyEffectsContext).effectsStage
}

const MIN_READY_MS = 340
const IDLE_CALLBACK_TIMEOUT_MS = 580
const FALLBACK_DELAY_MS = 420

const STAGE_2_MS = 200
const STAGE_3_MS = 400

/**
 * מעביר טעינת אפקטים כבדים (קוסמוס, חלקיקים, לוגו Canvas) לרגע אחרי שהמסגרת כבר מציגה תוכן.
 * אחרי `ready`: effectsStage 1 → 2 (200ms) → 3 (400ms) כדי לפזר עומס.
 */
export function HeavyEffectsReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [effectsStage, setEffectsStage] = useState<EffectsStage>(0)

  useEffect(() => {
    let cancelled = false
    const t0 = performance.now()
    let idleId: number | undefined
    let timerId: ReturnType<typeof setTimeout> | undefined

    const armReadyTimer = () => {
      if (cancelled) return
      const elapsed = performance.now() - t0
      const rest = Math.max(0, MIN_READY_MS - elapsed)
      timerId = window.setTimeout(() => {
        if (!cancelled) setReady(true)
      }, rest)
    }

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(armReadyTimer, { timeout: IDLE_CALLBACK_TIMEOUT_MS })
    } else {
      timerId = window.setTimeout(armReadyTimer, FALLBACK_DELAY_MS)
    }

    return () => {
      cancelled = true
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      if (timerId !== undefined) window.clearTimeout(timerId)
    }
  }, [])

  useEffect(() => {
    if (!ready) {
      setEffectsStage(0)
      return
    }
    setEffectsStage(1)
    const t2 = window.setTimeout(() => setEffectsStage(2), STAGE_2_MS)
    const t3 = window.setTimeout(() => setEffectsStage(3), STAGE_3_MS)
    return () => {
      window.clearTimeout(t2)
      window.clearTimeout(t3)
    }
  }, [ready])

  return (
    <HeavyEffectsContext.Provider value={{ ready, effectsStage }}>{children}</HeavyEffectsContext.Provider>
  )
}
