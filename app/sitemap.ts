import type { MetadataRoute } from 'next';
import { navItems } from '@/components/layout/navItems';
import { routing } from '@/i18n/routing';
import { getBlogSlugs } from '@/lib/blogs';
import { getEventSlugs } from '@/lib/events';
import { siteUrl } from '@/lib/metadata';

// Static export only prerenders route handlers marked static
export const dynamic = 'force-static';

// Home, every nav page, and every event and blog page, for each language; trailing slashes match the canonical URLs
export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) => {
    // Each language lists only the events and blogs written in it
    const paths = [
      '',
      ...navItems.map(({ href }) => href),
      ...getEventSlugs(locale).map((slug) => `/events/${slug}`),
      ...getBlogSlugs(locale).map((slug) => `/blogs/${slug}`),
    ];
    return paths.map((path) => ({ url: `${siteUrl}/${locale}${path}/` }));
  });
}
