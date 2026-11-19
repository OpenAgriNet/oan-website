import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

if (!process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error('NEXT_PUBLIC_SITE_URL is not set. See .env.example.');
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const ogImage = { url: '/og-image.jpg', width: 1200, height: 630, type: 'image/jpeg' };

type PageKey = 'buildingBlocks' | 'aboutUs' | 'community' | 'resources' | 'events' | 'privacyTerms' | 'blogs';

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

// Search results show about 155 characters of a description; longer summaries are cut at a word
export function shortDescription(text: string, max = 155) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ') > 0 ? cut.lastIndexOf(' ') : cut.length).replace(/[\s,;:.–-]+$/, '')}…`;
}

type ArticleMetadata = {
  // e.g. `/blogs/${slug}` (without the language)
  path: string;
  locale: string;
  title: string;
  summary: string;
  // The page's own picture; without one, the site's standard share image is used, as on the other pages
  image?: { url: string; alt: string };
  // Category label, e.g. "Implementation" (article:section)
  section?: string;
  // Publication date as written in the file (blogs only; an event's date is when it happens, not when it was published)
  publishedTime?: string;
  author?: string;
};

// Event and blog pages: the same tags as the other pages (getPageMetadata), as an article with its own cover image
export async function getArticleMetadata({ path, locale, title, summary, image, section, publishedTime, author }: ArticleMetadata): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const description = shortDescription(summary);
  const shareImage = image ?? { ...ogImage, alt: t('imageAlt') };
  const url = `/${locale}${path}/`;

  return {
    title: `${title} | ${t('siteName')}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      siteName: t('siteName'),
      title,
      description,
      url,
      images: [shareImage],
      ...(section && { section }),
      // The plain date: content files give no time zone for a time, so it is left out of search data
      ...(publishedTime && { publishedTime: publishedTime.slice(0, 10) }),
      ...(author && { authors: [author] }),
    },
    twitter: { card: 'summary_large_image', title, description, images: [shareImage] },
  };
}
