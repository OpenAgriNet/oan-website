import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageMetadata } from '@/lib/metadata';
import { getAllBlogs, getFeaturedBlogs, toSummary } from '@/lib/blogs';
import BlogsHero from '@/components/blogs/BlogsHero';
import BlogsSection from '@/components/blogs/BlogsSection';

export const generateMetadata = ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> =>
  params.then(({ locale }) => getPageMetadata('blogs', '/blogs', locale));

export default async function BlogsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const featured = getFeaturedBlogs(locale).map(toSummary);
  const featuredSlugs = new Set(featured.map((b) => b.slug));
  // Featured blogs have their own section, so they are not repeated in the main list
  const rest = getAllBlogs(locale).filter((b) => !featuredSlugs.has(b.slug)).map(toSummary);

  return (
    <>
      <BlogsHero />
      {featured.length > 0 && <BlogsSection blogs={featured} mode="featured" />}
      <BlogsSection blogs={rest} mode="all" />
    </>
  );
}
