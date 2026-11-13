import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

if (!process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error('NEXT_PUBLIC_SITE_URL is not set. See .env.example.');
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const ogImage = { url: '/og-image.jpg', width: 1200, height: 630, type: 'image/jpeg' };

type PageKey = 'buildingBlocks' | 'aboutUs' | 'community' | 'resources' | 'events' | 'privacyTerms';

export async function getPageMetadata(page: PageKey | 'home', path: string, locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const title = page === 'home' ? t('title') : t(`pages.${page}.title`);
  const description = page === 'home' ? t('description') : t(`pages.${page}.description`);
  const alt = t('imageAlt');
  const localizedPath = `/${locale}${path === '/' ? '' : path}/`;

  return {
    title,
    description,
    alternates: { canonical: localizedPath },
    openGraph: {
      type: 'website',
      siteName: t('siteName'),
      title,
      description,
      url: localizedPath,
      images: [{ ...ogImage, alt }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [{ url: ogImage.url, alt }] },
  };
}
