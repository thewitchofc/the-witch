/**
 * דף הבית: אנימציית רקע מלאה (אורורה + חלקיקים).
 * שאר הדפים: רק חלקיקים על רקע סטטי (אותו `Particles` כמו פעם).
 */

export function isHomePath(pathname: string): boolean {
  const raw = pathname.split('?')[0] || '/'
  const path = raw.replace(/\/+$/, '') || '/'
  return path === '/' || path === ''
}
