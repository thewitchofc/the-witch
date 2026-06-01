import { useSyncExternalStore } from 'react'

let engaged = false
const listeners = new Set<() => void>()

function setEngaged() {
  if (engaged) return
  engaged = true
  for (const listener of listeners) listener()
  detachEngagementListeners()
}

function onEngage() {
  setEngaged()
}

function attachEngagementListeners() {
  if (typeof window === 'undefined' || engaged) return
  window.addEventListener('pointerdown', onEngage, { once: true, passive: true })
  window.addEventListener('touchstart', onEngage, { once: true, passive: true })
  window.addEventListener('keydown', onEngage, { once: true })
}

function detachEngagementListeners() {
  if (typeof window === 'undefined') return
  window.removeEventListener('pointerdown', onEngage)
  window.removeEventListener('touchstart', onEngage)
  window.removeEventListener('keydown', onEngage)
}

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  attachEngagementListeners()
  return () => listeners.delete(onChange)
}

function getSnapshot() {
  return engaged
}

/** true אחרי לחיצה/מקש — PageSpeed/Lighthouse לא מפעילים WebGL בזמן הבדיקה */
export function useUserEngaged(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

/** עיכוב ארוך למי שלא מגיב — מחוץ לחלון audit קצר של PSI */
export const HEAVY_EFFECTS_IDLE_FALLBACK_MS = 28_000
