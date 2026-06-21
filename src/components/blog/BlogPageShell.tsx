import type { ReactNode } from 'react'

/** רקע וזוהר משותפים לדף הבלוג ולמאמרים */
export function BlogPageShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]"
      dir="rtl"
      lang="he"
    >
      <div
        className="pointer-events-none absolute -right-28 top-20 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-[32rem] h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.11),transparent_48%)]"
        aria-hidden
      />
      {children}
    </div>
  )
}
