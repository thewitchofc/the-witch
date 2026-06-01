/** מספר וואטסאפ ללא +, ספרות בלבד (E.164 בלי +). ברירת מחדל: 0559939345 */
const DEFAULT_WHATSAPP_E164 = '972559939345'

/** טקסט מוכן מראש לכפתור וואטסאפ הצף */
export const WHATSAPP_FLOAT_PREFILL =
  'היי המכשפה, הגעתי דרך האתר שלך ואשמח לקבל עוד פרטים'

export function getWhatsAppE164(): string {
  const raw =
    typeof import.meta.env.VITE_WHATSAPP_E164 === 'string' && import.meta.env.VITE_WHATSAPP_E164
      ? String(import.meta.env.VITE_WHATSAPP_E164)
      : DEFAULT_WHATSAPP_E164
  const digits = raw.replace(/\D/g, '')
  if (digits.startsWith('0')) return `972${digits.slice(1)}`
  if (digits.startsWith('972')) return digits
  return digits || DEFAULT_WHATSAPP_E164
}

export function buildWhatsAppUrl(message?: string): string {
  const digits = getWhatsAppE164()
  const base = `https://wa.me/${digits}`
  const text = (message ?? 'היי, הגעתי מהאתר The Witch').trim()
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
