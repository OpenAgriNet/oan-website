import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { routing } from '@/i18n/routing';
import { getBlogBySlug, getBlogSlugs } from '@/lib/blogs';

// Only slugs returned below exist; anything else is a 404 in a static export
export const dynamicParams = false;

export const generateStaticParams = () =>
  routing.locales.flatMap((locale) => getBlogSlugs(locale).map((slug) => ({ locale, slug })));

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const blog = getBlogBySlug(locale, slug);
  if (!blog) return {};
  const url = `/${locale}/blogs/${slug}/`;
  return {
    title: `${blog.title} | OpenAgriNet`,
    description: blog.summary,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: blog.title, description: blog.summary, url, images: [{ url: blog.coverImage }] },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const blog = getBlogBySlug(locale, slug);
  if (!blog || blog.type !== 'internal') notFound();

  return (
    <Box component="article" sx={{ maxWidth: 800, mx: 'auto', px: { xs: '20px', sm: 4 }, py: { xs: 4, lg: 8 }, color: 'text.heading' }}>
      <Typography variant="headline" component="h1" sx={{ color: 'text.title', mb: 1 }}>
        {blog.title}
      </Typography>
      <Typography sx={{ fontSize: 14, color: 'text.caption', mb: 4 }}>
        {blog.author} · <time dateTime={blog.date}>{blog.date}</time>
        {blog.location ? ` · ${blog.location}` : ''}
      </Typography>
      {/* react-markdown does not render raw HTML by default, which keeps blog bodies safe */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.body}</ReactMarkdown>
    </Box>
  );
}
