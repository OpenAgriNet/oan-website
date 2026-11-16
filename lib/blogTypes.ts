import type { BlogCategory } from '@/content/blogs/categories';

// Shape of a blog after frontmatter validation (see lib/blogs.ts). Safe to import from client components.
export type BlogSummary = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  author: string;
  summary: string;
  coverImage: string;
  category: BlogCategory;
  tags: string[];
  location?: string;
  featured: boolean;
  type: 'internal' | 'external';
  externalUrl?: string;
};
