import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { formatEventDate, getEventBySlug, getEventSlugs } from '@/lib/events';

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

// No Figma design yet: a simple article layout built from the existing theme text styles
export default async function EventPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const event = getEventBySlug(locale, slug);
  if (!event || !event.hasArticle) notFound();
  const t = await getTranslations('Events');

  return (
    <Box component="article" sx={{ maxWidth: 800, mx: 'auto', px: { xs: 2, sm: 4 }, py: { xs: 4, lg: 8 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ '& a': { color: 'primary.main', fontWeight: 600, textDecoration: 'none' }, '& a:hover': { textDecoration: 'underline' } }}>
        <Link href="/events">← {t('backToEvents')}</Link>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '9px' }}>
          <Typography sx={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, color: 'primary.main', textTransform: 'uppercase' }}>
            {t(`${event.section}.categories.${event.category}`)}
          </Typography>
          <Typography component="time" dateTime={event.date} sx={{ fontSize: 14, lineHeight: 1.2, color: 'text.caption' }}>
            {formatEventDate(locale, event.date)}
          </Typography>
        </Box>
        <Typography variant="displayTitle" component="h1" sx={{ color: 'text.heading', fontSize: { xs: 28, sm: 36 } }}>
          {event.title}
        </Typography>
      </Box>
      <Box sx={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: '8px', overflow: 'hidden' }}>
        <Image src={event.coverImage} alt={event.imageAlt} fill priority sizes="(min-width: 800px) 800px, 100vw" style={{ objectFit: 'cover' }} />
      </Box>
      {/* react-markdown does not render raw HTML, which keeps event write-ups safe */}
      <Box
        sx={{
          color: 'text.heading',
          // `typography` applies a theme text style by name
          '& p, & li': { typography: 'sectionLead', m: 0 },
          '& p + p, & p + ul, & p + ol, & ul + p, & ol + p': { mt: 2 },
          '& h2, & h3': { typography: 'factLead', mt: 4, mb: 1.5 },
          '& ul, & ol': { pl: 3, my: 0 },
          '& li + li': { mt: 1 },
          '& a': { color: 'primary.main', fontWeight: 600 },
          '& strong': { fontWeight: 700 },
          '& img': { maxWidth: '100%', height: 'auto', borderRadius: '8px' },
          '& table': { width: '100%', borderCollapse: 'collapse', my: 3 },
          '& th, & td': { typography: 'sectionLead', border: '1px solid', borderColor: 'card.border', p: 1, textAlign: 'left' },
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{event.body}</ReactMarkdown>
      </Box>
    </Box>
  );
}
