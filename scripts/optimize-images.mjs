/**
 * המרה ל־WebP + דחיסה. הרץ: `npm run images:optimize`
 *
 * מקורות (הוסף לפני ריצה אם חסר — לדוגמה אחרי שחידשתי עיצוב):
 *   public/witch.png, public/logo.png, public/og-default.png
 *   src/assets/royal-fruit-hero.png
 * הפלט נשמר כ־*.webp; הקבצים ב־repo אחרי build ראשון כבר WebP.
 */
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

async function main() {
  const out = []
  // מכשפה: מוצגת ב־~160px — מספיק 400px @2.5dppx
  const witchIn = path.join(root, 'public/witch.png')
  const witchOut = path.join(root, 'public/witch.webp')
  if (existsSync(witchIn)) {
    await sharp(witchIn)
      .resize(400, 400, { fit: 'inside' })
      .webp({ quality: 82, effort: 5 })
      .toFile(witchOut)
    out.push('public/witch.webp')
  }

  const rfIn = path.join(root, 'src/assets/royal-fruit-hero.png')
  const rfOut = path.join(root, 'src/assets/royal-fruit-hero.webp')
  if (existsSync(rfIn)) {
    await sharp(rfIn).webp({ quality: 86, effort: 5 }).toFile(rfOut)
    out.push('src/assets/royal-fruit-hero.webp')
  }

  const logoIn = path.join(root, 'public/logo.png')
  const logoOut = path.join(root, 'public/logo.webp')
  if (existsSync(logoIn)) {
    await sharp(logoIn)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 88, effort: 5 })
      .toFile(logoOut)
    out.push('public/logo.webp')
  }

  const ogIn = path.join(root, 'public/og-default.png')
  const ogOut = path.join(root, 'public/og-default.webp')
  if (existsSync(ogIn)) {
    await sharp(ogIn)
      .resize(1200, 630, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(ogOut)
    out.push('public/og-default.webp')
  }

  if (out.length) {
    console.log('image optimize OK:', out.join(', '))
  } else {
    console.warn('image optimize: no source PNGs found')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
