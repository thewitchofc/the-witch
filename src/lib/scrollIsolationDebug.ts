/**
 * בדיקת בידוד — גלילה אופקית / תחושת גלילה מוזרה.
 *
 * **אחרי הבדיקה:** החזר את שני הערכים ל־`true` ומחק את השימוש בדגלים (או השאר `true`).
 *
 * **תהליך מומלץ:**
 * 1. שנה ל־`false`/`false` — טען מחדש, בדוק אם הבעיה נעלמת.
 * 2. אם כן — `enableCosmicField: true` בלבד (Logo3D עדיין `false`), טען מחדש. אם הבעיה חזרה → CosmicField.
 * 3. אם לא — `enableCosmicField: false`, `enableLogo3D: true`, לחץ על הפעלת לוגו 3D בהירו ובדוק. אם הבעיה חזרה → Logo3D.
 * 4. בסוף: החזר `true`/`true` (או מחק את הקובץ והשימוש בו).
 */
export const scrollIsolationDebug = {
  enableCosmicField: true,
  enableLogo3D: true,
} as const
