'use client';

// Image loader for every <Image> (next.config.ts). Images in public/images are served as the WebP copies that
// scripts/optimize-images.mjs makes before each dev run and build, one per width in lib/imageWidths.json, so each
// screen downloads a copy close to the size it shows. Anything else (e.g. SVG) is used as it is.
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (/^\/images\/.+\.(png|jpe?g|webp)$/i.test(src)) {
    return src.replace(/^\/images\//, '/_optimized/images/').replace(/\.(png|jpe?g|webp)$/i, `-${width}.webp`);
  }
  return src;
}
