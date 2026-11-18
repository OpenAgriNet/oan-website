import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getPageMetadata } from '@/lib/metadata';
import { formatBlogCardDate, getAllBlogs, getFeaturedBlogs, toSummary } from '@/lib/blogs';
import type { BlogSummary } from '@/lib/blogTypes';
import Section from '@/components/common/Section';
import SectionHeader from '@/components/common/SectionHeader';
import CardGrid from '@/components/common/CardGrid';
import BlogCard from '@/components/blogs/BlogCard';
import BlogsHero from '@/components/blogs/BlogsHero';
import FeaturedBlogCard from '@/components/blogs/FeaturedBlogCard';
import { oan } from '@/theme/oan';

export const generateMetadata = ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> =>
  params.then(({ locale }) => getPageMetadata('blogs', '/blogs', locale));

export default async function BlogsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Blogs');

  const featured = getFeaturedBlogs(locale).map(toSummary);
  const featuredSlugs = new Set(featured.map((b) => b.slug));
  // Featured blogs have their own section, so they are not repeated in the main list
  const rest = getAllBlogs(locale).filter((b) => !featuredSlugs.has(b.slug)).map(toSummary);

  const cardProps = (blog: BlogSummary) => ({
    blog,
    categoryLabel: t(`categories.${blog.category}`),
    // Formatted for the page's language at build time, e.g. "Oct 28, 2026"
    dateLabel: formatBlogCardDate(locale, blog.date),
    linkLabel: t('readMore'),
  });

  return (
    <>
      <BlogsHero />
      {featured.length > 0 && (
        // Figma: 60px below the hero, 62px to the end of the section background
        <Section background="/images/events-upcoming-bg.png" pt={{ xs: 32, lg: 60 }} pb={{ xs: 40, lg: 62 }}>
          <SectionHeader eyebrow={t('featured.eyebrow')} title={t('featured.title')} description={t('featured.description')} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: oan.layout.cardGap }}>
            {featured.map((blog) => (
              <FeaturedBlogCard key={blog.slug} {...cardProps(blog)} />
            ))}
          </Box>
        </Section>
      )}
      {/* Figma: 60px above, 106px to the footer */}
      <Section pt={{ xs: 32, lg: 60 }} pb={{ xs: 40, lg: 106 }}>
        <SectionHeader eyebrow={t('all.eyebrow')} />
        {/* Figma shows two rows of three */}
        <CardGrid actionLabel={t('all.viewAll')} visible={6} rowGap={{ xs: '24px', sm: oan.layout.cardRowGap }}>
          {rest.map((blog) => (
            <BlogCard key={blog.slug} {...cardProps(blog)} />
          ))}
        </CardGrid>
      </Section>
    </>
  );
}
