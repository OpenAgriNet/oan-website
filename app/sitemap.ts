import type { MetadataRoute } from 'next';
import { navItems } from '@/components/layout/navItems';
import { routing } from '@/i18n/routing';
import { siteUrl } from '@/lib/metadata';

// Static export only prerenders route handlers marked static
export const dynamic = 'force-static';

// Home plus every nav page, for each language; trailing slashes match the canonical URLs
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', ...navItems.map(({ href }) => href)];
  return routing.locales.flatMap((locale) => paths.map((path) => ({ url: `${siteUrl}/${locale}${path}/` })));
}
