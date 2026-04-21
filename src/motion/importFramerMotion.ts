/**
 * טעינה דינמית של framer-motion.
 *
 * `React.lazy(() => import('framer-motion'))` לא תקף — `lazy` מצפה ל־default export של רכיב.
 * בפרויקט זה הפיצול נעשה דרך `import()` של **מודולי רכיבים** (למשל `CosmicField.impl.tsx`, טעינה עצלה של `LeadForm`).
 *
 * אפשר לקרוא לפונקציה הזו מרכיבים שמחכים ל־motion רק אחרי אירוע משתמש, אם תוסיפו מימוש כזה.
 */
export type FramerMotionModule = typeof import('framer-motion')

export function importFramerMotion(): Promise<FramerMotionModule> {
  return import('framer-motion')
}
