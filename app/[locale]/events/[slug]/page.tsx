import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import ArticleBody from '@/components/common/ArticleBody';
import { formatDateTime } from '@/lib/dates';
import { getEventBySlug, getEventSlugs } from '@/lib/events';
import { oan } from '@/theme/oan';

// Only slugs returned below exist; anything else is a 404 in a static export
export const dynamicParams = false;

// A static export needs at least one page here. While no event has a write-up, one placeholder
// is built that only shows the "page not found" screen (it is not linked or listed in the sitemap)
const NO_EVENT_PAGES = 'none';

export function generateStaticParams() {
  const params = routing.locales.flatMap((locale) => getEventSlugs(locale).map((slug) => ({ locale, slug })));
  return params.length ? params : [{ locale: routing.defaultLocale, slug: NO_EVENT_PAGES }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = getEventBySlug(locale, slug);
  if (!event) return {};
  const url = `/${locale}/events/${slug}/`;
  return {
    title: `${event.title} | OpenAgriNet`,
    description: event.summary,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: event.title, description: event.summary, url, images: [{ url: event.coverImage, alt: event.imageAlt }] },
  };
}

// No Figma design yet: a simple article layout built from the OAN style sheet's article text styles (theme/oan.ts)
export default async function EventPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const event = getEventBySlug(locale, slug);
  if (!event || !event.hasArticle) notFound();
  const t = await getTranslations('Events');

  return (
    <Box
      component="article"
      sx={{ maxWidth: 800, mx: 'auto', px: oan.layout.pagePaddingX, py: { xs: 4, lg: 8 }, display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Box sx={{ '& a': { color: 'primary.main', fontWeight: 600, textDecoration: 'none' }, '& a:hover': { textDecoration: 'underline' } }}>
        <Link href="/events">← {t('backToEvents')}</Link>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '9px' }}>
          <Typography variant="cardCategory" component="p">
            {t(`${event.section}.categories.${event.category}`)}
          </Typography>
          <Typography variant="cardDate" component="time" dateTime={event.date}>
            {formatDateTime(locale, event.date)}
          </Typography>
        </Box>
        <Typography variant="articleTitle">{event.title}</Typography>
      </Box>
      <Box sx={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: oan.layout.card.imageRadius, overflow: 'hidden' }}>
        <Image src={event.coverImage} alt={event.imageAlt} fill priority sizes="(min-width: 800px) 800px, 100vw" style={{ objectFit: 'cover' }} />
      </Box>
      <ArticleBody body={event.body} />
    </Box>
  );
}
