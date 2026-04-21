import { lazy, Suspense } from 'react'

const CosmicFieldLazy = lazy(() =>
  import('./CosmicField.impl').then((m) => ({ default: m.CosmicFieldImpl })),
)

/**
 * רקע קוסמי: framer-motion נטען רק בצ'נק אסינכרוני אחרי העלייה הראשונית,
 * כדי להקטין עבודת JS ו־TBT בזמן הטעינה הקריטית.
 */
export function CosmicField() {
  return (
    <Suspense fallback={null}>
      <CosmicFieldLazy />
    </Suspense>
  )
}
