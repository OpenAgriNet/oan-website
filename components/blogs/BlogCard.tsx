import ContentCard from '@/components/common/ContentCard';
import { blogHref } from '@/lib/blogs';
import type { BlogSummary } from '@/lib/blogTypes';

type Props = {
  blog: BlogSummary;
  categoryLabel?: string;
  dateLabel: string;
  linkLabel: string;
};

// Figma "All Blogs" card: the same card design as the Events page, with the blog's location as the tag.
// Read More opens the blog's page or the external article (new tab); a blog with neither has no link
export default function BlogCard({ blog, categoryLabel, dateLabel, linkLabel }: Props) {
  return (
    <ContentCard
      image={blog.coverImage}
      imageAlt={blog.imageAlt}
      category={categoryLabel}
      date={dateLabel}
      dateTime={blog.date}
      title={blog.title}
      summary={blog.summary}
      tag={blog.location}
      linkLabel={linkLabel}
      href={blogHref(blog)}
    />
  );
}
