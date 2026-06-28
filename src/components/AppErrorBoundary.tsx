import { Component, type ErrorInfo, type ReactNode } from 'react'

type AppErrorBoundaryProps = {
  children: ReactNode
}

type AppErrorBoundaryState = {
  hasError: boolean
  error: Error | null
  retryKey: number
}

/** תופס שגיאות React ברמת האפליקציה — Fallback + Retry, בלי לשנות UI כשאין שגיאה */
export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    hasError: false,
    error: null,
    retryKey: 0,
  }

  static getDerivedStateFromError(error: Error): Partial<AppErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[AppErrorBoundary]', error, info.componentStack)
  }

  handleRetry = () => {
    this.setState((prev) => ({
      hasError: false,
      error: null,
      retryKey: prev.retryKey + 1,
    }))
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex min-h-[100svh] w-full items-center justify-center bg-[#020617] px-4 py-16 text-white supports-[min-height:100dvh]:min-h-[100dvh]"
          dir="rtl"
          lang="he"
          role="alert"
        >
          <div className="mx-auto max-w-lg rounded-3xl border border-violet-300/15 bg-gradient-to-l from-violet-500/[0.12] via-slate-950/75 to-cyan-500/[0.08] px-6 py-10 text-center shadow-[0_0_54px_rgba(139,92,246,0.14)] ring-1 ring-white/[0.05] backdrop-blur-xl md:px-10 md:py-12">
            <p className="mx-auto mb-4 w-fit rounded-full border border-red-400/25 bg-red-500/[0.08] px-3 py-1 text-xs font-medium text-red-100">
              משהו השתבש
            </p>
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl">
              לא הצלחנו לטעון את העמוד
            </h1>
            <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-slate-300 md:text-base">
              אפשר לנסות שוב. אם הבעיה חוזרת, רענני את הדפדפן או חזרי לדף הבית.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={this.handleRetry}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-l from-cyan-400 via-violet-500 to-fuchsia-500 px-8 py-3 text-base font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.3)] ring-1 ring-white/15 transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80"
              >
                נסי שוב
              </button>
              <a
                href="/"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/15 bg-white/[0.035] px-6 py-3 text-sm font-medium text-slate-200 ring-1 ring-white/[0.06] transition hover:border-cyan-300/35 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 md:text-base"
              >
                חזרה לדף הבית
              </a>
            </div>
          </div>
        </div>
      )
    }

    return <div key={this.state.retryKey}>{this.props.children}</div>
  }
}
