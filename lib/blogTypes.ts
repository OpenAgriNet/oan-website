import type { BlogCategory } from '@/content/blogs/categories';

// Shape of a blog after frontmatter validation (see lib/blogs.ts). Safe to import from client components.
export type BlogSummary = {
  slug: string;
  title: string;
  // ISO yyyy-mm-dd, or yyyy-mm-ddThh:mm when the blog gives a time
  date: string;
  // Optional: shown in search data when given
  author?: string;
  summary: string;
  // Optional: a blog without a picture shows its card without the image area
  coverImage?: string;
  // Describes the cover image for screen readers; defaults to the title
  imageAlt?: string;
  // Optional: a blog without a category shows no label above the title
  category?: BlogCategory;
  tags: string[];
  location?: string;
  featured: boolean;
  type: 'internal' | 'external';
  // Hosted blog with article text: gets its own page and a Read More link. A hosted blog without text is a card only
  hasArticle: boolean;
  externalUrl?: string;
};

// A section heading (##) in the article, listed under "Inside This Article"
export type BlogHeading = { id: string; text: string };
