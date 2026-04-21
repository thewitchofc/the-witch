/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP_E164?: string
  /** מזהה GA4 (למשל G-XXXXXXXX), נטען רק אחרי הסכמת עוגיות */
  readonly VITE_GA_MEASUREMENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
