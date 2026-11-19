import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getArticleMetadata, shortDescription, siteUrl } from '@/lib/metadata';
import ArticleBody from '@/components/common/ArticleBody';
import { formatDateTime } from '@/lib/dates';
import { formatBlogCardDate, getBlogBySlug, getBlogHeadings, getBlogSlugs, getRelatedBlogs, toSummary } from '@/lib/blogs';
import ArticleActions from '@/components/blogs/ArticleActions';
import ArticleContents from '@/components/blogs/ArticleContents';
import RelatedBlogCard from '@/components/blogs/RelatedBlogCard';
import SubscribeCard from '@/components/blogs/SubscribeCard';
import { oan } from '@/theme/oan';

// Only slugs returned below exist; anything else is a 404 in a static export
export const dynamicParams = false;

// A static export needs at least one page here. While no blog has article text, one placeholder
// is built that only shows the "page not found" screen (it is not linked or listed in the sitemap)
const NO_BLOG_PAGES = 'none';

export function generateStaticParams() {
  const params = routing.locales.flatMap((locale) => getBlogSlugs(locale).map((slug) => ({ locale, slug })));
  return params.length ? params : [{ locale: routing.defaultLocale, slug: NO_BLOG_PAGES }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const blog = getBlogBySlug(locale, slug);
  if (!blog) return {};
  const t = await getTranslations({ locale, namespace: 'Blogs' });
  return getArticleMetadata({
    path: `/blogs/${slug}`,
    locale,
    title: blog.title,
    summary: blog.summary,
    image: blog.coverImage ? { url: blog.coverImage, alt: blog.imageAlt ?? blog.title } : undefined,
    section: blog.category ? t(`categories.${blog.category}`) : undefined,
    publishedTime: blog.date,
    author: blog.author,
  });
}

const { article, pagePaddingX } = oan.layout;

// Figma "09-Detail Blog Page": the article on the left; "Inside This Article", the Subscribe card and related blogs on the right.
// Below 900px (no mobile design yet) everything stacks and "Inside This Article" is hidden
export default async function BlogPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const blog = getBlogBySlug(locale, slug);
  if (!blog || !blog.hasArticle) notFound();
  const t = await getTranslations('Blogs');
  const headings = getBlogHeadings(blog.body);
  const related = getRelatedBlogs(locale, slug).map(toSummary);

  // Right column (Figma): "Inside This Article", "Stay updated" and "Related Blog"
  const sidebar = (
    <>
      {headings.length > 0 && (
        // Phones have no "Inside This Article"
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <ArticleContents label={t('article.contents')} headings={headings} />
        </Box>
      )}
      <SubscribeCard title={t('article.subscribe.title')} description={t('article.subscribe.description')} buttonLabel={t('article.subscribe.button')} />
      {related.length > 0 && (
        <Box component="section" aria-labelledby="related-blogs" sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <Typography id="related-blogs" variant="articleHeading" component="h2">
            {t('article.related')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {related.map((b) => (
              <RelatedBlogCard
                key={b.slug}
                blog={b}
                categoryLabel={b.category ? t(`categories.${b.category}`) : undefined}
                dateLabel={formatBlogCardDate(locale, b.date)}
                linkLabel={t('readMore')}
              />
            ))}
          </Box>
        </Box>
      )}
    </>
  );

  // BlogPosting structured data, so search engines can show the article with its date and image
  const tMeta = await getTranslations('Metadata');
  const url = `${siteUrl}/${locale}/blogs/${slug}/`;
  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: shortDescription(blog.summary),
    ...(blog.coverImage && { image: `${siteUrl}${blog.coverImage}` }),
    // The plain date: content files give no time zone for a time
    datePublished: blog.date.slice(0, 10),
    ...(blog.author && { author: { '@type': 'Organization', name: blog.author } }),
    publisher: { '@type': 'Organization', name: tMeta('siteName'), url: `${siteUrl}/` },
    mainEntityOfPage: url,
    url,
    inLanguage: locale,
    ...(blog.category && { articleSection: t(`categories.${blog.category}`) }),
  };

  return (
    <Box sx={{ maxWidth: 1440, mx: 'auto' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting).replace(/</g, '\\u003c') }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'flex-start' },
          gap: { xs: 5, md: 5, lg: article.columnGap },
          px: pagePaddingX,
          // Figma at 1440px: content x=80-1370, 50px below the header, 84px above the footer
          width: { lg: article.width },
          // Figma starts the content at x=80 (not centred), like the other pages' sections
          ml: { lg: 'calc(50% - 640px)' },
          pt: { xs: 4, lg: '50px' },
          pb: { xs: 6, lg: '84px' },
        }}
      >
        <Box component="article" sx={{ flex: 1, minWidth: 0, maxWidth: { lg: article.mainWidth } }}>
          {/* Figma: the title box is 511px wide */}
          <Typography variant="articleTitle" sx={{ maxWidth: article.titleWidth }}>
            {blog.title}
          </Typography>
          <Box
            sx={{
              mt: '15px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Typography variant="articleDate" component="time" dateTime={blog.date}>
              {formatDateTime(locale, blog.date)}
            </Typography>
            <ArticleActions
              title={blog.title}
              shareLabel={t('article.share')}
              saveLabel={t('article.save')}
              copyLabel={t('article.copyLink')}
              copiedLabel={t('article.linkCopied')}
            />
          </Box>
          {blog.coverImage && (
            <Box
              sx={{
                position: 'relative',
                mt: '24px',
                aspectRatio: '740 / 325',
                borderRadius: article.imageRadius,
                overflow: 'hidden',
              }}
            >
              <Image
                src={blog.coverImage}
                alt={blog.imageAlt ?? blog.title}
                fill
                priority
                sizes="(min-width: 1360px) 740px, (min-width: 900px) 60vw, 100vw"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          )}
          {/* Article text from the Markdown file (shared with the event pages); Figma: paragraphs are 730px wide */}
          <Box sx={{ mt: '33px' }}>
            <ArticleBody body={blog.body} headingIds={headings.map((h) => h.id)} textMaxWidth={article.textWidth} />
          </Box>
        </Box>
        <Box sx={{ width: { md: 360, lg: article.sidebarWidth }, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '32px' }}>{sidebar}</Box>
      </Box>
    </Box>
  );
}
