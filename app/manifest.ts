import type { MetadataRoute } from 'next';
import { defaultLocale } from '@/i18n/config';
import { oan } from '@/theme/oan';

// Static export only prerenders route handlers marked static
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: `/${defaultLocale}/`,
    name: 'OpenAgriNet',
    short_name: 'OAN',
    description: 'Open infrastructure for accessible agricultural knowledge',
    // localePrefix is "always", so "/" has no page; start on the default locale (trailingSlash is on)
    start_url: `/${defaultLocale}/`,
    scope: '/',
    display: 'standalone',
    background_color: oan.colors.background.default,
    theme_color: oan.colors.primary,
    lang: defaultLocale,
    icons: [
      { src: '/icons/pwa/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/pwa/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/pwa/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
