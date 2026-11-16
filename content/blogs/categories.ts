// Single source of truth for blog categories. A blog with a category not listed here fails the build.
// Labels live in messages/en.json under Blogs.categories.<key>.
export const blogCategories = ['technology', 'implementation', 'policy', 'community'] as const;

export type BlogCategory = (typeof blogCategories)[number];
