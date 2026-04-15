import { useState, useSyncExternalStore, type FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

function useIsMinMd(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia('(min-width: 768px)')
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia('(min-width: 768px)').matches,
    () => false,
  )
}

const BUDGET_BELOW = 'below' as const

const budgetChoices = [
  { value: '10k-20k', label: '10K–20K' },
  { value: '20k-40k', label: '20K–40K' },
  { value: '40k-plus', label: '40K+' },
  { value: BUDGET_BELOW, label: 'התקציב שלי נמוך יותר' },
] as const

/** זמני — עדכני לכתובת השירות/דף הנחיתה הסופי */
const QUICK_SOLUTION_URL = 'https://wordpress.com'

/** מספר וואטסאפ לקבלת הפניות — בלי +, ספרות בלבד (למשל 972501234567). אפשר להגדיר ב-.env: VITE_WHATSAPP_E164 */
const WHATSAPP_E164 =
  typeof import.meta.env.VITE_WHATSAPP_E164 === 'string' && import.meta.env.VITE_WHATSAPP_E164
    ? String(import.meta.env.VITE_WHATSAPP_E164).replace(/\D/g, '')
    : '972000000000'

function budgetLabel(value: string): string {
  if (!value) return '—'
  const row = budgetChoices.find((o) => o.value === value)
  return row?.label ?? value
}

function buildWhatsAppBody(fd: FormData, budgetValue: string): string {
  const pick = (key: string) => String(fd.get(key) ?? '').trim() || '—'

  return [
    `שם: ${pick('name')}`,
    `טלפון: ${pick('phone')}`,
    `עסק: ${pick('business')}`,
    `אתר קיים: ${pick('existingSite')}`,
    `תקציב: ${budgetLabel(budgetValue)}`,
    `מטרה: ${pick('goal')}`,
    `למה עכשיו: ${pick('whyNow')}`,
    `הערות: ${pick('notes')}`,
  ].join('\n')
}

export function LeadForm() {
  const [budget, setBudget] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)
  const isLowBudget = budget === BUDGET_BELOW
  const prefersReducedMotion = useReducedMotion()
  const isMinMd = useIsMinMd()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!budget || isLowBudget) return

    const form = e.currentTarget
    const fd = new FormData(form)
    const body = buildWhatsAppBody(fd, budget)
    const waDigits = WHATSAPP_E164.replace(/\D/g, '')
    const url = `https://wa.me/${waDigits}?text=${encodeURIComponent(body)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <section className="relative w-full min-w-0 max-w-lg text-white" dir="rtl" lang="he">
      <div className="w-full min-w-0">
        <h2 className="mb-2 text-center text-xl font-semibold tracking-tight text-white sm:mb-3 sm:text-2xl">
          בדיקת התאמה לפרויקט
        </h2>
        {!submitted && (
          <>
            <p className="mx-auto mb-6 max-w-md text-balance text-center text-sm leading-snug text-slate-400 sm:mb-8 sm:text-base md:mb-10">
              זה לוקח פחות מדקה ומאפשר לנו להבין אם יש התאמה
            </p>
            <p className="mb-6 text-center text-base font-medium leading-snug text-slate-200 sm:text-lg md:mb-7">
              אני לא עובדת עם כולם.
            </p>
            <div className="mb-8 space-y-4 text-center text-sm leading-relaxed text-slate-400 sm:mb-10 sm:text-base md:space-y-5">
              <p>
                אני מקבלת עד 4 פרויקטים בחודש
                <br />
                כדי לשמור על רמה גבוהה באמת.
              </p>
              <p className="text-balance text-slate-300">אם זה חשוב לך, עדיף לא לחכות.</p>
            </div>
          </>
        )}

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="lead-sent"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-white/[0.1] bg-slate-950/55 px-8 py-14 text-center text-pretty ring-1 ring-white/[0.06] sm:px-10 sm:py-16"
            >
              <p className="text-lg font-medium text-white sm:text-xl">הפרטים נשלחו.</p>
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">אחזור אליך בהקדם.</p>
            </motion.div>
          ) : (
            <motion.form
              key="lead-form"
              className="touch-manipulation space-y-6 md:space-y-8"
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
          <div className="w-full">
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/[0.07]">
              <motion.div
                className="h-full w-full rounded-full bg-gradient-to-l from-violet-500 via-fuchsia-500 to-cyan-400"
                initial={false}
                animate={{ scaleX: budget ? 0.3 : 0 }}
                style={{ transformOrigin: '100% 50%' }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="lead-name" className="block text-sm font-medium text-slate-300">
              שם מלא
            </label>
            <input
              id="lead-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="w-full rounded-xl border-0 bg-slate-950/60 px-4 py-3 text-base text-white ring-1 ring-inset ring-white/10 transition placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
              placeholder="לדוגמה: שרה כהן"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="lead-phone" className="block text-sm font-medium text-slate-300">
              טלפון
            </label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              className="w-full rounded-xl border-0 bg-slate-950/60 px-4 py-3 text-base text-white ring-1 ring-inset ring-white/10 transition placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
              placeholder="לדוגמה: 050-1234567"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="lead-business" className="block text-sm font-medium text-slate-300">
              עסק
            </label>
            <input
              id="lead-business"
              name="business"
              type="text"
              autoComplete="organization"
              className="w-full rounded-xl border-0 bg-slate-950/60 px-4 py-3 text-base text-white ring-1 ring-inset ring-white/10 transition placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
              placeholder="שם העסק או המותג"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="lead-existing-site" className="block text-sm font-medium text-slate-300">
              אתר קיים
            </label>
            <input
              id="lead-existing-site"
              name="existingSite"
              type="text"
              inputMode="url"
              autoComplete="url"
              className="w-full rounded-xl border-0 bg-slate-950/60 px-4 py-3 text-base text-white ring-1 ring-inset ring-white/10 transition placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
              placeholder="כתובת או «אין»"
            />
          </div>

          <fieldset className="space-y-3 md:space-y-4 md:pt-1">
            <legend className="sr-only">תקציב משוער לפרויקט</legend>
            <p className="text-xs font-medium tracking-tight text-slate-400 md:text-sm">השלב הראשון — תקציב</p>
            <p className="text-sm font-medium text-slate-300 sm:text-base">תקציב משוער לפרויקט</p>
            <p className="text-xs text-slate-500">בחרי כרטיס אחד</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {budgetChoices.map((opt) => {
                const selected = budget === opt.value
                return (
                  <motion.label key={opt.value}>
                    <input
                      type="radio"
                      name="budget"
                      value={opt.value}
                      checked={selected}
                      onChange={() => setBudget(opt.value)}
                      className="peer sr-only"
                    />
                    <motion.span
                      className={`flex min-h-[3.25rem] cursor-pointer items-center justify-center rounded-2xl border px-4 py-3.5 text-center text-base font-medium tracking-tight transition-[background-color,border-color,box-shadow,color,transform] duration-300 ease-out will-change-transform sm:min-h-[3.5rem] sm:px-5 sm:py-4 ${
                        selected
                          ? 'border-violet-400/60 bg-gradient-to-br from-violet-500/12 via-violet-950/40 to-fuchsia-500/10 text-white shadow-[0_0_0_1px_rgba(167,139,250,0.4),0_0_28px_-10px_rgba(139,92,246,0.38),0_0_48px_-18px_rgba(124,58,237,0.22)] ring-2 ring-violet-400/50 ring-offset-2 ring-offset-[#020617]'
                          : 'border-white/[0.1] bg-slate-950/45 text-slate-200 hover:border-white/[0.22] hover:bg-slate-900/60 hover:text-white hover:shadow-[0_8px_28px_-12px_rgba(15,23,42,0.65)] peer-focus-visible:border-violet-400/50 peer-focus-visible:ring-2 peer-focus-visible:ring-violet-400/35 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#020617]'
                      } `}
                      animate={{
                        scale: selected ? 1.02 : 1,
                      }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: selected ? 1.005 : 0.985 }}
                      transition={{
                        scale: { duration: 0.3, ease: 'easeOut' },
                        y: { duration: 0.25, ease: 'easeOut' },
                      }}
                    >
                      {opt.label}
                    </motion.span>
                  </motion.label>
                )
              })}
            </div>
          </fieldset>

          <AnimatePresence initial={false}>
            {budget !== '' && (
              <motion.p
                key="budget-feedback"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="text-center text-xs leading-snug text-slate-400 sm:text-sm"
              >
                מעולה, נמשיך 👇
              </motion.p>
            )}
          </AnimatePresence>

          <motion.div
            key={budget ? 'has-budget' : 'no-budget'}
            className="space-y-6 md:space-y-7"
            initial={
              !budget
                ? false
                : prefersReducedMotion
                  ? false
                  : isMinMd
                    ? { opacity: 0.92, y: 6, scale: 0.991 }
                    : { opacity: 0.97, y: 2 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: isMinMd ? 0.32 : 0.22, ease: 'easeOut' }}
          >
          <div className="space-y-2">
            <label htmlFor="lead-goal" className="block text-sm font-medium text-slate-300">
              מטרה
            </label>
            <textarea
              id="lead-goal"
              name="goal"
              rows={3}
              className="w-full resize-y rounded-xl border-0 bg-slate-950/60 px-4 py-3 text-base text-white ring-1 ring-inset ring-white/10 transition placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
              placeholder="מה האתר צריך להשיג בשבילך?"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="lead-why-now" className="block text-sm font-medium text-slate-300">
              למה עכשיו
            </label>
            <textarea
              id="lead-why-now"
              name="whyNow"
              rows={2}
              className="w-full resize-y rounded-xl border-0 bg-slate-950/60 px-4 py-3 text-base text-white ring-1 ring-inset ring-white/10 transition placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
              placeholder="דחיפות, השקה, מגבלות זמן…"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="lead-notes" className="block text-sm font-medium text-slate-300">
              הערות <span className="font-normal text-slate-500">(אופציונלי)</span>
            </label>
            <textarea
              id="lead-notes"
              name="notes"
              rows={3}
              className="w-full resize-y rounded-xl border-0 bg-slate-950/60 px-4 py-3 text-base text-white ring-1 ring-inset ring-white/10 transition placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
              placeholder="כל דבר נוסף שחשוב שאדע…"
            />
          </div>
          </motion.div>

          <AnimatePresence mode="wait" initial={false}>
            {isLowBudget ? (
              <motion.div
                key="low-budget-panel"
                className="space-y-6 pt-2 md:space-y-7 md:pt-3"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-center text-base font-semibold tracking-tight text-white sm:text-lg">
                  הודעה מהמתכנתת
                </h3>
                <motion.div
                  className="rounded-2xl border border-white/[0.08] bg-slate-950/50 px-5 py-6 text-pretty text-sm leading-relaxed text-slate-300 ring-1 ring-white/[0.04] sm:text-base"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="mb-4">
                    כרגע אני עובדת רק עם פרויקטים בהתאמה אישית
                    <br />
                    בתקציב שמתחיל מ־10,299 ₪.
                  </p>
                  <p>
                    אם התקציב נמוך יותר,
                    <br />
                    כנראה שפתרון מוכן כמו WordPress יתאים לך יותר בשלב הזה.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
                >
                  <a
                    href={QUICK_SOLUTION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full min-h-[52px] items-center justify-center rounded-full bg-gradient-to-l from-violet-600/90 via-fuchsia-600/85 to-cyan-600/80 px-6 py-3 text-base font-medium text-white shadow-lg shadow-violet-950/20 ring-1 ring-white/15 transition hover:ring-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80 md:py-4"
                  >
                    לפתרון מהיר יותר →
                  </a>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="submit-branch"
                className="space-y-3 md:space-y-3.5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <motion.button
                  type="submit"
                  disabled={budget === ''}
                  className="w-full min-h-[52px] rounded-full bg-slate-950/80 px-6 py-3 text-base font-medium text-white ring-1 ring-white/10 backdrop-blur-sm transition-[box-shadow,ring-color,opacity] duration-300 ease-out hover:ring-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80 disabled:cursor-not-allowed disabled:opacity-40 md:py-4"
                >
                  שליחת הבקשה
                </motion.button>
                <p className="text-balance text-center text-[11px] leading-snug text-slate-500 sm:text-xs md:text-sm">
                  אין התחייבות. נחזור אליך רק אם יש התאמה.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
