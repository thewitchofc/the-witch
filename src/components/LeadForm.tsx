import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { trackEvent } from '../lib/analytics'

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

const fieldShellClass =
  'rounded-2xl border border-white/[0.14] bg-slate-950/78 p-4 ring-1 ring-white/[0.08] backdrop-blur-md sm:p-5 md:px-6 lg:px-7'

const fieldShellErrorClass =
  'rounded-2xl border border-red-500/50 bg-slate-950/78 p-4 ring-1 ring-red-500/35 backdrop-blur-md sm:p-5 md:px-6 lg:px-7'

const fieldControlClass =
  'mt-2 w-full rounded-lg border border-white/[0.1] bg-slate-950/72 px-3 py-3 text-base text-white shadow-inner shadow-black/30 transition placeholder:text-slate-300/90 hover:border-white/[0.14] focus:outline-none focus:border-white/[0.22] focus:ring-1 focus:ring-white/[0.12] sm:px-4 sm:py-3.5 md:px-5'

const BUDGET_BELOW = 'below' as const

/** מינימום תווים לטקסט חופשי (עדיין עובר heuristics ב־plausibleFreetext) */
const GOAL_FREETEXT_MIN = 3
const WHY_NOW_FREETEXT_MIN = 3

const budgetChoices = [
  { value: '10k-20k', label: '10K–20K' },
  { value: '20k-40k', label: '20K–40K' },
  { value: '40k-plus', label: '40K+' },
  { value: BUDGET_BELOW, label: 'התקציב שלי נמוך יותר' },
] as const

const FORM_STEP_LABELS = ['פרטים ועסק', 'אתר ורשתות', 'תקציב והמשך'] as const

const stepNavSecondaryClass =
  'min-h-[48px] touch-manipulation rounded-xl border border-white/[0.14] bg-slate-900/45 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-white/[0.22] hover:bg-slate-800/55 hover:text-white sm:min-h-0'

/** זהה ל־CTA בדף הבית (Hero) — מסגרת גרדיאנט, פנים כהה */
function HomeStyleContinueButton({
  disabled,
  onClick,
  ariaLabel = 'המשך לשלב הבא בטופס',
}: {
  disabled: boolean
  onClick: () => void
  ariaLabel?: string
}) {
  return (
    <div className="relative inline-flex max-w-full justify-center overflow-visible">
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        className="group relative z-10 flex w-full min-w-[9.5rem] max-w-full touch-manipulation rounded-full bg-gradient-to-l from-cyan-400 via-violet-500 to-fuchsia-500 p-[1.5px] text-base font-medium text-white no-underline shadow-[0_0_1px_rgba(255,255,255,0.12)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.45),0_0_28px_rgba(167,139,250,0.35),0_0_40px_rgba(34,211,238,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400/80 active:opacity-95 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:shadow-[0_0_1px_rgba(255,255,255,0.12)] sm:min-w-[10.5rem]"
      >
        <span className="flex min-h-[48px] w-full flex-1 items-center justify-center rounded-full bg-gradient-to-b from-slate-900/98 via-slate-950/98 to-slate-950 px-6 py-3 text-center text-base font-medium text-white shadow-inner shadow-black/40 ring-1 ring-inset ring-white/12 backdrop-blur-md transition-[background-color,box-shadow,ring-color] duration-300 ease-out group-hover:from-slate-900/92 group-hover:via-slate-950 group-hover:to-slate-950 group-hover:ring-white/22 md:min-h-[52px] md:px-8 md:py-4 md:text-lg">
          המשך
        </span>
      </button>
    </div>
  )
}

/** זמני — עדכני לכתובת השירות/דף הנחיתה הסופי */
const QUICK_SOLUTION_URL = 'https://wordpress.com'

/** ערך קנוני כשלוחצים «אין אתר» — חייב להתאים לכפתור ול־plausibleExistingSite */
const NO_SITE_SENTINEL = 'אין אתר'

/** כשלוחצים «אין» ברשתות — שני השדות בטופס מקבלים את אותו ערך קנוני */
const NO_SOCIAL_SENTINEL = 'אין'

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

  const first = pick('firstName')
  const last = pick('lastName')
  const fullName = [first, last].filter((x) => x !== '—').join(' ').trim() || '—'

  return [
    `שם: ${fullName}`,
    `טלפון: ${pick('phone')}`,
    `עסק: ${pick('business')}`,
    `אתר קיים: ${pick('existingSite')}`,
    `אינסטגרם עסקי: ${pick('instagramBusiness')}`,
    `פייסבוק עסקי: ${pick('facebookBusiness')}`,
    `תקציב: ${budgetLabel(budgetValue)}`,
    `מטרה: ${pick('goal')}`,
    `למה עכשיו: ${pick('whyNow')}`,
    `הערות: ${pick('notes')}`,
  ].join('\n')
}

function onlyDigits(s: string): string {
  return s.replace(/\D/g, '')
}

/** נייד ישראלי נפוץ: 05XXXXXXXX / 5XXXXXXXX / 9725XXXXXXXX */
function isPlausibleIsraeliMobile(s: string): boolean {
  const d = onlyDigits(s)
  return /^05[0-9]{8}$/.test(d) || /^5[0-9]{8}$/.test(d) || /^9725[0-9]{8}$/.test(d)
}

/**
 * טקסט חופשי סביר בזמן אמת (היוריסטיקות בלבד — לא AI).
 * חוסם בעיקר: בלי אותיות, אות אחת חוזרת הרבה, אנטרופיה נמוכה מאוד בטקסט ארוך, מילות spam קצרות.
 */
function plausibleFreetext(s: string, minLen: number): boolean {
  const t = s.trim()
  if (t.length < minLen) return false
  if (!/[\p{L}]/u.test(t)) return false
  const compact = t.replace(/\s/g, '')
  if (compact.length < minLen) return false

  const counts = new Map<string, number>()
  for (const ch of compact) {
    counts.set(ch, (counts.get(ch) ?? 0) + 1)
  }
  const maxOcc = Math.max(...counts.values())
  if (maxOcc / compact.length > 0.65) return false

  if (compact.length >= 14) {
    const unique = counts.size
    if (unique < Math.min(4, Math.floor(compact.length / 5))) return false
  }

  const lower = t.toLowerCase().replace(/\s+/g, '')
  const spam = ['test', 'asdf', 'qwerty', 'fdsa', 'בדיקה', 'שדגשדג']
  if (spam.some((w) => lower === w || lower === `${w}${w}`)) return false

  return true
}

function countLetters(s: string): number {
  const m = s.match(/\p{L}/gu)
  return m ? m.length : 0
}

/** כל קטע מופרד ברווח עם אותיות חייב לכלול לפחות min אותיות (חוסם «ש ג» וכו') */
function eachLetterTokenMinLen(s: string, min: number): boolean {
  const parts = s.trim().split(/\s+/).filter(Boolean)
  for (const part of parts) {
    const letters = part.replace(/[^\p{L}]/gu, '')
    if (letters.length === 0) continue
    if (letters.length < min) return false
  }
  return true
}

/** שם פרטי / משפחה: לפחות שתי אותיות בסך הכול, כל מילה עם אותיות ≥2, בלי «חרבוש» בסיסי */
function plausibleNamePart(s: string): boolean {
  const t = s.trim()
  if (!t) return false
  if (countLetters(t) < 2) return false
  if (!eachLetterTokenMinLen(t, 2)) return false
  if (!/[\p{L}]/u.test(t)) return false
  return plausibleFreetext(t, 2)
}

/** שדה ריק = בלי שגיאת UI; תוכן חייב לעמוד בכללי אותיות */
function namePartLetterRulesOk(s: string): boolean {
  const t = s.trim()
  if (!t) return true
  if (countLetters(t) < 2) return false
  if (!eachLetterTokenMinLen(t, 2)) return false
  if (!/[\p{L}]/u.test(t)) return false
  return true
}

function nameFieldHasUiError(s: string): boolean {
  return s.trim() !== '' && !plausibleNamePart(s)
}

function nameFieldHintMessage(s: string): string | null {
  if (s.trim() === '') return null
  if (!namePartLetterRulesOk(s)) return 'מינימום 2 אותיות'
  return null
}

function phoneFieldHasUiError(s: string): boolean {
  const t = s.trim()
  if (!t) return false
  return !isPlausibleIsraeliMobile(s)
}

function phoneFieldHintMessage(s: string): string | null {
  const t = s.trim()
  if (!t) return null
  if (isPlausibleIsraeliMobile(s)) return null
  const d = onlyDigits(s)
  if (d.length > 0 && d.length < 10) return 'מינימום 10 ספרות'
  return null
}

function plausibleBusiness(s: string): boolean {
  return plausibleFreetext(s.trim(), 2)
}

function isPlausibleHttpUrl(s: string): boolean {
  const t = s.trim()
  if (!/^https?:\/\//i.test(t) && !/^www\./i.test(t)) return false
  try {
    const normalized = /^www\./i.test(t) ? `https://${t}` : t
    const url = new URL(normalized)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false
    return Boolean(url.hostname)
  } catch {
    return false
  }
}

/** רק URL תקין (https / http / www) או הערך המדויק מהכפתור «אין אתר» */
function plausibleExistingSite(s: string): boolean {
  const t = s.trim()
  if (!t) return false
  if (t === NO_SITE_SENTINEL) return true
  return isPlausibleHttpUrl(t)
}

function hostnameMatchesBase(hostname: string, base: string): boolean {
  const h = hostname.replace(/^www\./i, '').toLowerCase()
  return h === base || h.endsWith(`.${base}`)
}

function isPlausibleInstagramBusinessUrl(s: string): boolean {
  const t = s.trim()
  if (!t) return false
  try {
    const normalized = /^www\./i.test(t) ? `https://${t}` : t
    const u = new URL(normalized)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false
    if (!hostnameMatchesBase(u.hostname, 'instagram.com')) return false
    const path = u.pathname.replace(/\/+$/, '') || '/'
    return path.length > 1
  } catch {
    return false
  }
}

function isPlausibleFacebookBusinessUrl(s: string): boolean {
  const t = s.trim()
  if (!t) return false
  try {
    const normalized = /^www\./i.test(t) ? `https://${t}` : t
    const u = new URL(normalized)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false
    const h = u.hostname.replace(/^www\./i, '').toLowerCase()
    const okHost =
      h === 'facebook.com' ||
      h === 'fb.com' ||
      h === 'm.facebook.com' ||
      h.endsWith('.facebook.com')
    if (!okHost) return false
    const path = u.pathname.replace(/\/+$/, '') || '/'
    return path.length > 1
  } catch {
    return false
  }
}

/** קישור אינסטגרם תקין, ו/או פייסבוק תקין, או «אין» בשני השדות (מצב כפתור) */
function plausibleSocialBusinessCard(ig: string, fb: string): boolean {
  const i = ig.trim()
  const f = fb.trim()
  if (i === NO_SOCIAL_SENTINEL && f === NO_SOCIAL_SENTINEL) return true
  if (!i && !f) return false
  if (i && !isPlausibleInstagramBusinessUrl(i)) return false
  if (f && !isPlausibleFacebookBusinessUrl(f)) return false
  return Boolean(i || f)
}

export function LeadForm() {
  const [budget, setBudget] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)
  const [nameDraft, setNameDraft] = useState({ firstName: '', lastName: '' })
  const [phoneDraft, setPhoneDraft] = useState('')
  const [businessDraft, setBusinessDraft] = useState('')
  const nameDraftRef = useRef(nameDraft)
  const phoneDraftRef = useRef(phoneDraft)
  const businessDraftRef = useRef(businessDraft)
  nameDraftRef.current = nameDraft
  phoneDraftRef.current = phoneDraft
  businessDraftRef.current = businessDraft

  const [existingSite, setExistingSite] = useState('')
  const [siteBlockTouched, setSiteBlockTouched] = useState(false)
  const [instagramBusiness, setInstagramBusiness] = useState('')
  const [facebookBusiness, setFacebookBusiness] = useState('')
  const [socialNone, setSocialNone] = useState(false)
  const [socialBlockTouched, setSocialBlockTouched] = useState(false)
  const [formStep, setFormStep] = useState(0)
  const formRef = useRef<HTMLFormElement | null>(null)
  const skipStepScrollRef = useRef(true)
  const isLowBudget = budget === BUDGET_BELOW
  const prefersReducedMotion = useReducedMotion()
  const isMinMd = useIsMinMd()

  const readCanSubmit = useCallback((): boolean => {
    const form = formRef.current
    if (!form) return false
    const fd = new FormData(form)
    const bFromFd = String(fd.get('budget') ?? '').trim()
    const b = bFromFd || budget
    if (!b || b === BUDGET_BELOW) return false

    const firstName =
      String(fd.get('firstName') ?? '').trim() || nameDraftRef.current.firstName.trim()
    const lastName = String(fd.get('lastName') ?? '').trim() || nameDraftRef.current.lastName.trim()
    const phone = String(fd.get('phone') ?? '').trim() || phoneDraftRef.current.trim()
    const business = String(fd.get('business') ?? '').trim() || businessDraftRef.current.trim()
    const existingSiteFd = String(fd.get('existingSite') ?? '')
    const existingSiteVal = existingSiteFd || existingSite
    const igFd = String(fd.get('instagramBusiness') ?? '')
    const fbFd = String(fd.get('facebookBusiness') ?? '')
    const ig = socialNone ? NO_SOCIAL_SENTINEL : igFd || instagramBusiness
    const fb = socialNone ? NO_SOCIAL_SENTINEL : fbFd || facebookBusiness
    const goal = String(fd.get('goal') ?? '')
    const whyNow = String(fd.get('whyNow') ?? '')

    return (
      plausibleNamePart(firstName) &&
      plausibleNamePart(lastName) &&
      isPlausibleIsraeliMobile(phone) &&
      plausibleBusiness(business) &&
      plausibleExistingSite(existingSiteVal) &&
      plausibleSocialBusinessCard(ig, fb) &&
      plausibleFreetext(goal, GOAL_FREETEXT_MIN) &&
      plausibleFreetext(whyNow, WHY_NOW_FREETEXT_MIN)
    )
  }, [budget, existingSite, instagramBusiness, facebookBusiness, socialNone])

  const readStep0Valid = useCallback((): boolean => {
    const form = formRef.current
    if (!form) return false
    const fd = new FormData(form)
    return (
      plausibleNamePart(String(fd.get('firstName') ?? '')) &&
      plausibleNamePart(String(fd.get('lastName') ?? '')) &&
      isPlausibleIsraeliMobile(String(fd.get('phone') ?? '')) &&
      plausibleBusiness(String(fd.get('business') ?? ''))
    )
  }, [])

  const readStep1Valid = useCallback((): boolean => {
    const form = formRef.current
    if (!form) return false
    const fd = new FormData(form)
    const site = String(fd.get('existingSite') ?? '').trim() || existingSite.trim()
    const igFd = String(fd.get('instagramBusiness') ?? '').trim()
    const fbFd = String(fd.get('facebookBusiness') ?? '').trim()
    const ig = socialNone ? NO_SOCIAL_SENTINEL : igFd || instagramBusiness
    const fb = socialNone ? NO_SOCIAL_SENTINEL : fbFd || facebookBusiness
    return plausibleExistingSite(site) && plausibleSocialBusinessCard(ig, fb)
  }, [existingSite, instagramBusiness, facebookBusiness, socialNone])

  const revalidate = useCallback(() => {
    const form = formRef.current
    if (form) {
      const fd = new FormData(form)
      const fn = String(fd.get('firstName') ?? '').trim()
      const ln = String(fd.get('lastName') ?? '').trim()
      const ph = String(fd.get('phone') ?? '').trim()
      const biz = String(fd.get('business') ?? '').trim()
      if (formStep === 0) {
        setNameDraft({ firstName: fn, lastName: ln })
        setPhoneDraft(ph)
        setBusinessDraft(biz)
      } else {
        setNameDraft((prev) => ({
          firstName: fn || prev.firstName,
          lastName: ln || prev.lastName,
        }))
        setPhoneDraft((prev) => ph || prev)
        setBusinessDraft((prev) => biz || prev)
      }
    }
    setCanSubmit(readCanSubmit())
  }, [readCanSubmit, formStep])

  useEffect(() => {
    revalidate()
  }, [revalidate, budget, existingSite, instagramBusiness, facebookBusiness, socialNone, formStep])

  useEffect(() => {
    if (skipStepScrollRef.current) {
      skipStepScrollRef.current = false
      return
    }
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [formStep])

  const firstNameError = nameFieldHasUiError(nameDraft.firstName)
  const lastNameError = nameFieldHasUiError(nameDraft.lastName)
  const firstNameHint = nameFieldHintMessage(nameDraft.firstName)
  const lastNameHint = nameFieldHintMessage(nameDraft.lastName)
  const phoneError = phoneFieldHasUiError(phoneDraft)
  const phoneHint = phoneFieldHintMessage(phoneDraft)
  const siteShellError = siteBlockTouched && !plausibleExistingSite(existingSite)
  const igForSocialPlausible = socialNone ? NO_SOCIAL_SENTINEL : instagramBusiness
  const fbForSocialPlausible = socialNone ? NO_SOCIAL_SENTINEL : facebookBusiness
  const socialShellError = socialBlockTouched && !plausibleSocialBusinessCard(igForSocialPlausible, fbForSocialPlausible)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!readCanSubmit()) return

    const form = e.currentTarget
    const fd = new FormData(form)
    const body = buildWhatsAppBody(fd, budget)
    const waDigits = WHATSAPP_E164.replace(/\D/g, '')
    const url = `https://wa.me/${waDigits}?text=${encodeURIComponent(body)}`
    trackEvent('form_submit', {
      form_name: 'lead_match_whatsapp',
      form_step: formStep,
    })
    trackEvent('whatsapp_click', {
      surface: 'lead_form_submit',
      pathname: window.location.pathname,
      link_domain: 'wa.me',
    })
    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <section
      className="relative w-full min-w-0 max-w-lg text-white md:max-w-xl lg:max-w-2xl"
      dir="rtl"
      lang="he"
    >
      <div className="w-full min-w-0">
        <h2 className="mb-2 text-center text-xl font-semibold tracking-tight text-white sm:mb-3 sm:text-2xl">
          רוצים אתר שמביא פניות? בואו נבדוק התאמה
        </h2>
        {!submitted && (
          <>
            <p className="mx-auto mb-5 max-w-md text-balance text-center text-sm leading-snug text-slate-300 sm:mb-6 sm:text-base md:mb-8 md:max-w-2xl md:text-lg">
              טופס קצר (פחות מדקה). אחזור עם כיוון ברור — מתאים או לא, בלי התחייבות וללא עלות.
            </p>
            <p className="mb-5 text-center text-base font-semibold leading-snug text-white sm:text-lg md:mb-6">
              אני לא עובדת עם כולם — בכוונה.
            </p>
            <div className="mb-8 space-y-3 text-center text-sm leading-relaxed text-slate-400 sm:mb-10 sm:text-base md:space-y-4">
              <p>
                עד <span className="font-medium text-slate-200">4 פרויקטים בחודש</span> כדי לשמור על איכות
                וזמינות אמיתית.
              </p>
              <p className="text-balance text-slate-300">
                אם האתר אמור להביא לקוחות ולא רק ״להיראות יפה״ — זה המקום להתחיל.
              </p>
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
              <p className="text-lg font-medium text-white sm:text-xl">הפרטים התקבלו — תודה.</p>
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                אעבור עליהם ואחזור אליך בימי עבודה הקרובים עם המשך צעדים או שאלות ממוקדות.
              </p>
            </motion.div>
          ) : (
            <motion.form
              ref={formRef}
              key="lead-form"
              className="touch-manipulation space-y-6 md:space-y-8"
              onSubmit={handleSubmit}
              onInput={revalidate}
              onChange={revalidate}
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
                animate={{ scaleX: (formStep + 1) / 3 }}
                style={{ transformOrigin: '100% 50%' }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            </div>
          </div>

          <p className="text-center text-xs font-medium text-slate-400 sm:text-sm">
            שלב {formStep + 1} מתוך 3 — {FORM_STEP_LABELS[formStep]}
          </p>

          <div className={`space-y-4 md:space-y-6${formStep !== 0 ? ' hidden' : ''}`}>
          <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-7">
          <div className={`min-w-0 space-y-2 ${firstNameError ? fieldShellErrorClass : fieldShellClass}`}>
            <label htmlFor="lead-first-name" className="block text-sm font-medium text-slate-300">
              שם פרטי <span className="font-normal text-slate-500">(חובה)</span>
            </label>
            <input
              id="lead-first-name"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              aria-invalid={firstNameError}
              aria-describedby={firstNameHint ? 'lead-first-name-hint' : undefined}
              className={fieldControlClass}
              placeholder="לדוגמה: שרה"
            />
            {firstNameHint ? (
              <p id="lead-first-name-hint" className="text-xs font-medium text-red-300" role="alert">
                {firstNameHint}
              </p>
            ) : null}
          </div>

          <div className={`min-w-0 space-y-2 ${lastNameError ? fieldShellErrorClass : fieldShellClass}`}>
            <label htmlFor="lead-last-name" className="block text-sm font-medium text-slate-300">
              שם משפחה <span className="font-normal text-slate-500">(חובה)</span>
            </label>
            <input
              id="lead-last-name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              aria-invalid={lastNameError}
              aria-describedby={lastNameHint ? 'lead-last-name-hint' : undefined}
              className={fieldControlClass}
              placeholder="לדוגמה: כהן"
            />
            {lastNameHint ? (
              <p id="lead-last-name-hint" className="text-xs font-medium text-red-300" role="alert">
                {lastNameHint}
              </p>
            ) : null}
          </div>

          <div className={`min-w-0 space-y-2 ${phoneError ? fieldShellErrorClass : fieldShellClass}`}>
            <label htmlFor="lead-phone" className="block text-sm font-medium text-slate-300">
              טלפון <span className="font-normal text-slate-500">(חובה)</span>
            </label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              aria-invalid={phoneError}
              aria-describedby={phoneHint ? 'lead-phone-hint' : undefined}
              className={fieldControlClass}
              placeholder="לדוגמה: 050-1234567"
            />
            {phoneHint ? (
              <p id="lead-phone-hint" className="text-xs font-medium text-red-300" role="alert">
                {phoneHint}
              </p>
            ) : null}
          </div>

          <div className={`min-w-0 space-y-2 ${fieldShellClass}`}>
            <label htmlFor="lead-business" className="block text-sm font-medium text-slate-300">
              עסק <span className="font-normal text-slate-500">(חובה)</span>
            </label>
            <input
              id="lead-business"
              name="business"
              type="text"
              autoComplete="organization"
              required
              className={fieldControlClass}
              placeholder="שם העסק או המותג"
            />
          </div>
          </div>

          <div className="flex justify-end pt-1">
            <HomeStyleContinueButton
              disabled={!readStep0Valid()}
              ariaLabel="המשך לשלב אתר ורשתות חברתיות"
              onClick={() => readStep0Valid() && setFormStep(1)}
            />
          </div>
          </div>

          <div className={`space-y-4 md:space-y-6${formStep !== 1 ? ' hidden' : ''}`}>
          <div className="grid min-w-0 grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2 lg:items-stretch lg:gap-6">
          <div
            className={`min-w-0 space-y-3 ${siteShellError ? fieldShellErrorClass : fieldShellClass}`}
            onPointerDown={() => setSiteBlockTouched(true)}
          >
            <label htmlFor="lead-existing-site" className="block text-sm font-medium text-slate-300">
              אתר קיים <span className="font-normal text-slate-500">(חובה)</span>
            </label>
            <input
              id="lead-existing-site"
              name="existingSite"
              type="text"
              inputMode="url"
              autoComplete="url"
              required
              value={existingSite}
              onChange={(e) => setExistingSite(e.target.value)}
              readOnly={existingSite === NO_SITE_SENTINEL}
              aria-invalid={siteShellError}
              className={`${fieldControlClass} ${
                existingSite === NO_SITE_SENTINEL ? 'cursor-default text-slate-300' : ''
              }`}
              placeholder="https://…"
            />
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <button
                type="button"
                onClick={() => setExistingSite(NO_SITE_SENTINEL)}
                disabled={existingSite === NO_SITE_SENTINEL}
                className={`min-h-[44px] touch-manipulation rounded-xl border px-4 py-2.5 text-sm font-medium transition sm:min-h-0 sm:py-2 ${
                  existingSite === NO_SITE_SENTINEL
                    ? 'cursor-default border-violet-500/45 bg-violet-500/15 text-violet-100'
                    : 'border-white/[0.14] bg-slate-900/40 text-slate-200 hover:border-white/[0.24] hover:bg-slate-800/55 hover:text-white'
                }`}
              >
                אין אתר
              </button>
              {existingSite === NO_SITE_SENTINEL ? (
                <button
                  type="button"
                  onClick={() => setExistingSite('')}
                  className="min-h-[44px] touch-manipulation text-sm font-medium text-cyan-300/95 underline-offset-2 hover:text-cyan-200 hover:underline sm:min-h-0"
                >
                  הזנת כתובת אתר
                </button>
              ) : null}
            </div>
          </div>

          <div
            role="group"
            aria-labelledby="lead-social-legend"
            className={`min-w-0 space-y-4 ${socialShellError ? fieldShellErrorClass : fieldShellClass}`}
            onPointerDown={() => setSocialBlockTouched(true)}
          >
            <p id="lead-social-legend" className="text-sm font-medium text-slate-300 sm:text-base">
              אינסטגרם / פייסבוק עסקי <span className="font-normal text-slate-500">(חובה)</span>
            </p>
            {!socialNone ? (
              <p className="text-xs leading-snug text-slate-500">
                לפחות קישור אחד תקין (אפשר שניהם), או לחיצה על «אין».
              </p>
            ) : null}
            {socialNone ? (
              <>
                <input type="hidden" name="instagramBusiness" value={NO_SOCIAL_SENTINEL} />
                <input type="hidden" name="facebookBusiness" value={NO_SOCIAL_SENTINEL} />
                <p className="text-sm text-slate-300">נבחר: אין חשבונות עסקיים</p>
                <button
                  type="button"
                  onClick={() => setSocialNone(false)}
                  className="min-h-[44px] touch-manipulation text-sm font-medium text-cyan-300/95 underline-offset-2 hover:text-cyan-200 hover:underline sm:min-h-0"
                >
                  הוספת קישורים
                </button>
              </>
            ) : (
              <>
                <div className="grid min-w-0 grid-cols-2 gap-3 md:gap-4 lg:gap-5">
                  <div className="min-w-0 space-y-2">
                    <label htmlFor="lead-instagram-business" className="block text-sm font-medium text-slate-300">
                      אינסטגרם עסקי
                    </label>
                    <input
                      id="lead-instagram-business"
                      name="instagramBusiness"
                      type="text"
                      inputMode="url"
                      autoComplete="url"
                      value={instagramBusiness}
                      onChange={(e) => setInstagramBusiness(e.target.value)}
                      aria-invalid={socialShellError}
                      className={fieldControlClass}
                      placeholder="https://www.instagram.com/…"
                    />
                  </div>
                  <div className="min-w-0 space-y-2">
                    <label htmlFor="lead-facebook-business" className="block text-sm font-medium text-slate-300">
                      פייסבוק עסקי
                    </label>
                    <input
                      id="lead-facebook-business"
                      name="facebookBusiness"
                      type="text"
                      inputMode="url"
                      autoComplete="url"
                      value={facebookBusiness}
                      onChange={(e) => setFacebookBusiness(e.target.value)}
                      aria-invalid={socialShellError}
                      className={fieldControlClass}
                      placeholder="https://www.facebook.com/…"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSocialNone(true)
                      setInstagramBusiness('')
                      setFacebookBusiness('')
                    }}
                    className="min-h-[44px] touch-manipulation rounded-xl border border-white/[0.14] bg-slate-900/40 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/[0.24] hover:bg-slate-800/55 hover:text-white sm:min-h-0 sm:py-2"
                  >
                    אין
                  </button>
                </div>
              </>
            )}
          </div>
          </div>

          <div className="flex justify-between gap-3 pt-1">
            <button type="button" className={stepNavSecondaryClass} onClick={() => setFormStep(0)}>
              חזרה
            </button>
            <HomeStyleContinueButton
              disabled={!readStep1Valid()}
              ariaLabel="המשך לשלב תקציב והמשך"
              onClick={() => readStep1Valid() && setFormStep(2)}
            />
          </div>
          </div>

          <div className={`space-y-4 md:space-y-6${formStep !== 2 ? ' hidden' : ''}`}>
          <fieldset className="space-y-3 md:space-y-4 md:pt-1">
            <legend className="sr-only">תקציב משוער לפרויקט (חובה)</legend>
            <p className="text-sm font-medium text-slate-300 sm:text-base">
              תקציב משוער לפרויקט <span className="font-normal text-slate-500">(חובה)</span>
            </p>
            <p className="text-xs text-slate-500">בחרי כרטיס אחד</p>
            <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {budgetChoices.map((opt) => {
                const selected = budget === opt.value
                return (
                  <motion.label key={opt.value} className="min-w-0">
                    <input
                      type="radio"
                      name="budget"
                      value={opt.value}
                      checked={selected}
                      onChange={() => setBudget(opt.value)}
                      className="peer sr-only"
                    />
                    <motion.span
                      className={`flex min-h-[3.25rem] cursor-pointer items-center justify-center text-pretty rounded-2xl border px-2 py-3 text-center text-sm font-medium tracking-tight transition-[background-color,border-color,box-shadow,color,transform] duration-300 ease-out will-change-transform sm:min-h-[3.5rem] sm:px-5 sm:py-4 sm:text-base ${
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
            className="space-y-4 md:space-y-5"
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
          <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-7">
            <div className={`min-w-0 space-y-2 ${fieldShellClass}`}>
              <label htmlFor="lead-goal" className="block text-sm font-medium text-slate-300">
                מטרה <span className="font-normal text-slate-500">(חובה)</span>
              </label>
              <textarea
                id="lead-goal"
                name="goal"
                rows={3}
                required
                className={`${fieldControlClass} min-h-[5.5rem] resize-y`}
                placeholder="מה האתר צריך להשיג בשבילך?"
              />
            </div>

            <div className={`min-w-0 space-y-2 ${fieldShellClass}`}>
              <label htmlFor="lead-why-now" className="block text-sm font-medium text-slate-300">
                למה עכשיו <span className="font-normal text-slate-500">(חובה)</span>
              </label>
              <textarea
                id="lead-why-now"
                name="whyNow"
                rows={2}
                required
                className={`${fieldControlClass} min-h-[4.25rem] resize-y`}
                placeholder="דחיפות, השקה, מגבלות זמן…"
              />
            </div>
          </div>

          <div className={`space-y-2 ${fieldShellClass}`}>
            <label htmlFor="lead-notes" className="block text-sm font-medium text-slate-300">
              הערות <span className="font-normal text-slate-500">(אופציונלי)</span>
            </label>
            <textarea
              id="lead-notes"
              name="notes"
              rows={3}
              className={`${fieldControlClass} min-h-[5.5rem] resize-y`}
              placeholder="כל דבר נוסף שחשוב שאדע…"
            />
          </div>
          </motion.div>

          <div className="flex justify-start pt-1">
            <button type="button" className={stepNavSecondaryClass} onClick={() => setFormStep(1)}>
              חזרה
            </button>
          </div>

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
                  className="flex justify-center"
                >
                  <div className="relative mx-auto flex w-full max-w-full justify-center overflow-visible">
                    <a
                      href={QUICK_SOLUTION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="פתיחת קישור חיצוני — פתרון מהיר (אתר אחר)"
                      className="group relative z-10 flex min-h-[52px] w-full min-w-0 touch-manipulation items-stretch rounded-full bg-gradient-to-l from-cyan-400 via-violet-500 to-fuchsia-500 p-[1.5px] text-base font-medium text-white no-underline shadow-[0_2px_16px_rgba(0,0,0,0.4),0_0_20px_rgba(139,92,246,0.22),0_0_28px_rgba(34,211,238,0.1)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.45),0_0_28px_rgba(167,139,250,0.35),0_0_40px_rgba(34,211,238,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400/80 active:opacity-95"
                    >
                      <span className="flex min-h-0 w-full flex-1 items-center justify-center rounded-full bg-gradient-to-b from-slate-900/98 via-slate-950/98 to-slate-950 px-6 py-3 text-center text-base font-medium text-white shadow-inner shadow-black/40 ring-1 ring-inset ring-white/12 backdrop-blur-md transition-[background-color,box-shadow,ring-color] duration-300 ease-out group-hover:from-slate-900/92 group-hover:via-slate-950 group-hover:to-slate-950 group-hover:ring-white/22 md:py-4">
                        <span className="inline-flex items-center justify-center gap-2.5" dir="ltr">
                          <span className="shrink-0 opacity-90" aria-hidden>
                            →
                          </span>
                          <span dir="rtl" className="min-w-0">
                            לפתרון מהיר יותר
                          </span>
                          <span className="shrink-0 opacity-90" aria-hidden>
                            ←
                          </span>
                        </span>
                      </span>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="submit-branch"
                className="space-y-3 max-md:space-y-4 md:space-y-3.5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <motion.button
                  type="submit"
                  disabled={!canSubmit}
                  aria-label="שליחת בקשת בדיקת התאמה לוואטסאפ"
                  className={
                    canSubmit
                      ? 'w-full min-h-[52px] cursor-pointer rounded-full bg-gradient-to-l from-cyan-500 via-violet-600 to-fuchsia-600 px-6 py-3 text-base font-medium text-white shadow-[0_0_28px_rgba(139,92,246,0.35),0_4px_20px_rgba(0,0,0,0.35)] ring-1 ring-white/25 transition-[filter,box-shadow,transform] duration-300 ease-out hover:brightness-110 hover:shadow-[0_0_36px_rgba(167,139,250,0.45),0_6px_24px_rgba(0,0,0,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80 active:scale-[0.99] md:py-4'
                      : 'w-full min-h-[52px] cursor-not-allowed rounded-full bg-slate-950/70 px-6 py-3 text-base font-medium text-slate-500 ring-1 ring-white/[0.06] backdrop-blur-sm transition-[box-shadow,ring-color] duration-300 ease-out md:py-4'
                  }
                >
                  שליחת הבקשה
                </motion.button>
                <div className="space-y-1.5 text-balance text-center text-[11px] leading-snug text-slate-500 sm:text-xs md:text-sm">
                  <p>אין התחייבות. נחזור אליך רק אם יש התאמה.</p>
                  <div className="space-y-1 text-slate-500/85">
                    <p>כל עוד השדות לא מלאים או לא תקינים, השליחה לא תתבצע/תתקבל.</p>
                    <p>רק כשהטופס מלא כראוי הבקשה תימסר.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
