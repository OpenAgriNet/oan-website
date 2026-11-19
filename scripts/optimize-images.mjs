// Makes the WebP copies that the image loader (lib/imageLoader.ts) serves: for every PNG/JPEG/WebP in public/images,
// one copy per width in lib/imageWidths.json, under public/_optimized/images (same folders, name-<width>.webp).
// Images are never enlarged, so widths above the original are the original size.
// Runs before `npm run dev` and `npm run build` (package.json predev/prebuild). Only new or changed images are
// converted; copies of deleted images are removed. The originals in public/images are not changed.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE = 'public/images';
const OUTPUT = 'public/_optimized/images';
const RASTER = /\.(png|jpe?g|webp)$/i;
const { deviceSizes, imageSizes } = JSON.parse(await fs.readFile('lib/imageWidths.json', 'utf8'));
const WIDTHS = [...new Set([...imageSizes, ...deviceSizes])].sort((a, b) => a - b);

// Photos and illustrations: quality 80 looks the same as the original at a fraction of the size.
// Partner logos keep their sharp edges and flat colours, so they are stored without any loss.
const encoding = (file) =>
  file.includes(`${path.sep}partners${path.sep}`) ? { lossless: true, effort: 6 } : { quality: 80, alphaQuality: 100, effort: 5 };

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  const files = await Promise.all(entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])));
  return files.flat();
}

const outputFor = (file, width) => path.join(OUTPUT, path.relative(SOURCE, file)).replace(RASTER, `-${width}.webp`);

const sources = (await walk(SOURCE)).filter((f) => RASTER.test(f));
const wanted = new Set();
let converted = 0;

for (const file of sources) {
  const { mtimeMs } = await fs.stat(file);
  for (const width of WIDTHS) {
    const out = outputFor(file, width);
    wanted.add(out);
    const existing = await fs.stat(out).catch(() => null);
    if (existing && existing.mtimeMs >= mtimeMs) continue;
    await fs.mkdir(path.dirname(out), { recursive: true });
    await sharp(file).resize({ width, withoutEnlargement: true }).webp(encoding(file)).toFile(out);
    converted++;
  }
}

// Remove copies whose original was deleted or renamed
for (const out of await walk(OUTPUT)) if (!wanted.has(out)) await fs.rm(out);

console.log(`Images: ${sources.length} originals x ${WIDTHS.length} widths (${converted} copies made now)`);
