import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { blogCategories, type BlogCategory } from '@/content/blogs/categories';
import type { BlogSummary } from './blogTypes';

// Build-time only (uses fs). To move to a headless CMS later, reimplement these functions and keep the signatures.
const dir = path.join(process.cwd(), 'content/blogs');

export type Blog = BlogSummary & { body: string };

function fail(file: string, msg: string): never {
  throw new Error(`Invalid blog "${file}": ${msg}`);
}

function parse(file: string): Blog {
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
  const slug = file.replace(/\.md$/, '');
  const str = (k: string) => (typeof data[k] === 'string' && data[k].trim() ? (data[k] as string) : fail(file, `"${k}" is required`));
  // gray-matter parses bare YAML dates into Date objects
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : str('date');
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
    category: data.category as BlogCategory,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    location: typeof data.location === 'string' ? data.location : undefined,
    featured: data.featured === true,
    type: data.type,
    externalUrl: data.type === 'external' ? data.externalUrl : undefined,
    body: content,
  };
}

export function getAllBlogs(): Blog[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map(parse)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const getFeaturedBlogs = (limit = 3) => getAllBlogs().filter((b) => b.featured).slice(0, limit);
export const getBlogBySlug = (slug: string) => getAllBlogs().find((b) => b.slug === slug);
// Only internal blogs get a detail page
export const getBlogSlugs = () => getAllBlogs().filter((b) => b.type === 'internal').map((b) => b.slug);
// Strip the body so the client bundle only carries card data
export const toSummary = ({ body: _body, ...summary }: Blog): BlogSummary => summary;
