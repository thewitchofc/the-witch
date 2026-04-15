/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP_E164?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
