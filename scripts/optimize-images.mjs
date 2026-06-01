/**
 * המרה ל־WebP + דחיסה. הרץ: `npm run images:optimize`
 *
 * מקורות (הוסף לפני ריצה אם חסר — לדוגמה אחרי שחידשתי עיצוב):
 *   public/witch.png, public/og-default.png
 *   src/assets/royal-fruit-hero.png
 * הפלט נשמר כ־*.webp; הקבצים ב־repo אחרי build ראשון כבר WebP.
 */
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

/** ~22% — פינות מעוגלות כמו אייקון אפליקציה */
function faviconCornerRadius(size) {
  return Math.round(size * 0.22)
}

async function writeRoundedSquareFavicon(inputPath, size, outPath) {
  const radius = faviconCornerRadius(size)
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}"/></svg>`,
  )
  await sharp(inputPath)
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png({ compressionLevel: 9 })
    .toFile(outPath)
}

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

  const logoBrand = path.join(root, 'public/brand-favicon-source.png')
  const logoHeroOut = path.join(root, 'public/logo-hero.webp')
  if (existsSync(logoBrand)) {
    await sharp(logoBrand)
      .resize(1200, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 88, effort: 5 })
      .toFile(logoHeroOut)
    out.push('public/logo-hero.webp')
  }

  const ogOut = path.join(root, 'public/og-default.webp')
  const ogIn = path.join(root, 'public/og-default.png')
  const ogBrand = path.join(root, 'public/brand-favicon-source.png')
  if (existsSync(ogIn)) {
    await sharp(ogIn)
      .resize(1200, 630, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(ogOut)
    out.push('public/og-default.webp')
  } else if (existsSync(ogBrand)) {
    await sharp(ogBrand)
      .resize(1200, 630, { fit: 'cover', position: 'centre' })
      .webp({ quality: 85, effort: 5 })
      .toFile(ogOut)
    out.push('public/og-default.webp')
  }

  const faviconSource = path.join(root, 'public/brand-favicon-source.png')
  if (existsSync(faviconSource)) {
    const faviconSizes = [
      [32, 'favicon-32.png'],
      [48, 'favicon-48.png'],
      [192, 'favicon-192.png'],
      [180, 'apple-touch-icon.png'],
    ]
    for (const [size, name] of faviconSizes) {
      const outPath = path.join(root, 'public', name)
      await writeRoundedSquareFavicon(faviconSource, size, outPath)
      out.push(`public/${name}`)
    }
    await sharp(path.join(root, 'public', 'favicon-48.png')).toFile(path.join(root, 'public', 'favicon.ico'))
    out.push('public/favicon.ico')
  }

  const a11yIn = path.join(root, 'public/icons/accessibility.png')
  const a11yWebp = path.join(root, 'public/icons/accessibility.webp')
  if (existsSync(a11yIn)) {
    await sharp(a11yIn)
      .resize(132, 132, { fit: 'cover' })
      .png({ quality: 92, compressionLevel: 9, palette: true })
      .toFile(a11yIn)
    await sharp(a11yIn).webp({ quality: 88, effort: 5 }).toFile(a11yWebp)
    out.push('public/icons/accessibility.png', 'public/icons/accessibility.webp')
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
