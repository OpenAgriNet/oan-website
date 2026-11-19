// Checks the built site in out/ (runs after `npm run build` via the postbuild script, and in the deploy workflow):
//  1. every optimized image a page asks for (/_optimized/...) exists in out/ - otherwise visitors see broken images (FAIL)
//  2. no referenced image is bigger than MAX_KB (FAIL)
//  3. a page loading an original PNG/JPEG from /images (i.e. an image that bypasses the loader) is reported:
//     FAIL when the original is bigger than MAX_KB, a warning otherwise.
// With --prune (deploy workflow) it then deletes the PNG/JPEG originals in out/images that no page uses, so they are not uploaded.
import fs from 'node:fs/promises';
import path from 'node:path';

const OUT = 'out';
const MAX_KB = 500;
const MAX = MAX_KB * 1024;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  const files = await Promise.all(entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])));
  return files.flat();
}

if (!(await fs.stat(path.join(OUT, '_optimized')).catch(() => null))) {
  console.error(`FAIL: ${OUT}/_optimized is missing, so every image on the site would be broken. Run "npm run images" and build again.`);
  process.exit(1);
}

// Image URLs written into the pages: src="..." / srcset="..." attributes and url(...) in CSS
const urls = new Map(); // url -> first file that uses it
for (const file of await walk(OUT)) {
  const ext = path.extname(file);
  if (ext !== '.html' && ext !== '.css') continue;
  const text = await fs.readFile(file, 'utf8');
  const found = [];
  if (ext === '.html') {
    for (const m of text.matchAll(/\s(?:src|srcset)="([^"]*)"/gi)) found.push(...m[1].split(',').map((p) => p.trim().split(/\s+/)[0]));
  } else {
    for (const m of text.matchAll(/url\(\s*["']?([^)"']+)/gi)) found.push(m[1]);
  }
  for (const raw of found) {
    const url = raw.replace(/&amp;/g, '&').split(/[?#]/)[0];
    if (url.startsWith('/') && !urls.has(url)) urls.set(url, file);
  }
}

const errors = [];
const warnings = [];
const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

for (const [url, page] of urls) {
  const size = (await fs.stat(path.join(OUT, decodeURIComponent(url))).catch(() => null))?.size;
  if (url.startsWith('/_optimized/')) {
    if (size === undefined) errors.push(`${url} is used by ${page} but was not built (broken image)`);
    else if (size > MAX) errors.push(`${url} is ${kb(size)}, over the ${MAX_KB} KB limit`);
  } else if (/^\/images\/.+\.(png|jpe?g)$/i.test(url)) {
    if (size === undefined) errors.push(`${url} is used by ${page} but is not in the build (broken image)`);
    else if (size > MAX) errors.push(`${url} (${kb(size)}) loads as the original, not the optimized copy - use <Image> (${page})`);
    else warnings.push(`${url} (${kb(size)}) loads as the original, not the optimized copy (${page})`);
  }
}

for (const w of warnings) console.warn(`WARNING: ${w}`);
for (const e of errors) console.error(`FAIL: ${e}`);
if (errors.length) process.exit(1);
if (process.argv.includes('--prune')) {
  let pruned = 0;
  for (const file of await walk(path.join(OUT, 'images'))) {
    if (!/\.(png|jpe?g)$/i.test(file)) continue;
    const url = '/' + path.relative(OUT, file).split(path.sep).join('/');
    if (!urls.has(url)) { await fs.rm(file); pruned++; }
  }
  console.log(`Pruned ${pruned} unused original PNG/JPEG files from ${OUT}/images`);
}
console.log(`Images OK: ${urls.size} image/asset URLs checked, all optimized images present and under ${MAX_KB} KB`);
