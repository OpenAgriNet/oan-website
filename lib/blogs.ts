import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { blogCategories, type BlogCategory } from '@/content/blogs/categories';
import type { BlogHeading, BlogSummary } from './blogTypes';
import { toDate } from './dates';

// Build-time only (uses fs). To move to a headless CMS later, reimplement these functions and keep the signatures.
// One folder per locale (content/blogs/<locale>/<slug>.md). A locale only shows blogs in its own folder; no cross-language fallback.
const dirFor = (locale: string) => path.join(process.cwd(), 'content/blogs', locale);

export type Blog = BlogSummary & { body: string };

function fail(file: string, msg: string): never {
  throw new Error(`Invalid blog "${file}": ${msg}`);
}

function parse(locale: string, file: string): Blog {
  const { data, content } = matter(fs.readFileSync(path.join(dirFor(locale), file), 'utf8'));
  const slug = file.replace(/\.md$/, '');
  const str = (k: string) => (typeof data[k] === 'string' && data[k].trim() ? (data[k] as string) : fail(file, `"${k}" is required`));
  // gray-matter parses bare YAML dates into Date objects; a date with a time must be quoted
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : str('date');
  if (!/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(date) || Number.isNaN(toDate(date).getTime()))
    fail(file, '"date" must be yyyy-mm-dd, or "yyyy-mm-ddThh:mm" in quotes');
  if (!blogCategories.includes(data.category)) fail(file, `unknown category "${data.category}" (allowed: ${blogCategories.join(', ')})`);
  if (data.type !== 'internal' && data.type !== 'external') fail(file, '"type" must be internal or external');
  if (data.type === 'external' && !/^https:\/\//.test(data.externalUrl ?? '')) fail(file, 'external blogs need an https "externalUrl"');
  return {
    slug,
    title: str('title'),
    date,
    author: str('author'),
    summary: str('summary'),
    coverImage: str('coverImage'),
    imageAlt: typeof data.imageAlt === 'string' && data.imageAlt.trim() ? data.imageAlt : str('title'),
    category: data.category as BlogCategory,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    location: typeof data.location === 'string' ? data.location : undefined,
    featured: data.featured === true,
    type: data.type,
    externalUrl: data.type === 'external' ? data.externalUrl : undefined,
    hasArticle: data.type === 'internal' && content.trim().length > 0,
    body: content,
  };
}

export function getAllBlogs(locale: string): Blog[] {
  const dir = dirFor(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => parse(locale, f))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const getFeaturedBlogs = (locale: string, limit = 3) => getAllBlogs(locale).filter((b) => b.featured).slice(0, limit);
export const getBlogBySlug = (locale: string, slug: string) => getAllBlogs(locale).find((b) => b.slug === slug);
// Only hosted blogs with article text get a detail page (and a sitemap entry)
export const getBlogSlugs = (locale: string) => getAllBlogs(locale).filter((b) => b.hasArticle).map((b) => b.slug);
// Strip the body so the client bundle only carries card data
export function toSummary(blog: Blog): BlogSummary {
  const { body, ...summary } = blog;
  void body;
  return summary;
}

// "Related Blog": other blogs in the same category first, then the latest ones
export function getRelatedBlogs(locale: string, slug: string, limit = 2): Blog[] {
  const all = getAllBlogs(locale);
  const current = all.find((b) => b.slug === slug);
  const others = all.filter((b) => b.slug !== slug);
  return [...others.filter((b) => b.category === current?.category), ...others.filter((b) => b.category !== current?.category)].slice(0, limit);
}

// Card date, e.g. "Oct 28, 2026"
export const formatBlogCardDate = (locale: string, iso: string) =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' }).format(toDate(iso));

// Where a blog card links to: its own page, the external article, or nowhere (a card only)
export const blogHref = (b: BlogSummary) => (b.type === 'external' ? b.externalUrl : b.hasArticle ? `/blogs/${b.slug}` : undefined);

// Section headings (##) for "Inside This Article", with ids the page gives the same headings so the links can jump to them
export function getBlogHeadings(body: string): BlogHeading[] {
  const used = new Map<string, number>();
  return [...body.matchAll(/^##[ \t]+(.+?)[ \t#]*$/gm)].map(([, raw]) => {
    // Plain text of the heading: links keep their text, formatting marks are dropped
    const text = raw.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '').trim();
    const base = text.toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '') || 'section';
    const n = (used.get(base) ?? 0) + 1;
    used.set(base, n);
    return { id: n > 1 ? `${base}-${n}` : base, text };
  });
}
