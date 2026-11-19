import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import imageWidths from './lib/imageWidths.json';

const nextConfig: NextConfig = {
  output: 'export',
  // Every <Image> uses the WebP copies made by scripts/optimize-images.mjs at these widths (see lib/imageLoader.ts)
  images: { loader: 'custom', loaderFile: './lib/imageLoader.ts', ...imageWidths },
  trailingSlash: true,
};

export default createNextIntlPlugin()(nextConfig);
