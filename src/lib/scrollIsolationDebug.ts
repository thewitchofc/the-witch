/**
 * בדיקת בידוד — גלילה אופקית / תחושת גלילה מוזרה.
 *
 * **אחרי הבדיקה:** החזר ל־`true` (או מחק את השימוש בדגל).
 *
 * **תהליך מומלץ:**
 * 1. שנה ל־`false` — טען מחדש, בדוק אם הבעיה נעלמת.
 * 2. אם כן — `enableCosmicField: true` בלבד, טען מחדש. אם הבעיה חזרה → CosmicField.
 * 3. בסוף: החזר `true` (או מחק את הקובץ והשימוש בו).
 */
export const scrollIsolationDebug = {
  enableCosmicField: true,
} as const
