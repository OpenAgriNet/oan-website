import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import type { BlogSummary } from '@/lib/blogTypes';
import { oan } from '@/theme/oan';
import BlogLink from './BlogLink';

type Props = {
  blog: BlogSummary;
  categoryLabel: string;
  dateLabel: string;
  linkLabel: string;
};

const { card } = oan.layout;

// Figma "Featured Blog" card: image on the left (494 x 262) and text on the right; stacked on smaller screens
export default function FeaturedBlogCard({ blog, categoryLabel, dateLabel, linkLabel }: Props) {
  return (
    <Box
      component="article"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        p: card.padding,
        border: '1px solid',
        borderColor: 'card.border',
        borderRadius: card.radius,
        bgcolor: 'background.paper',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          flexShrink: 0,
          width: { xs: '100%', md: '40%', lg: 494 },
          aspectRatio: '494 / 262',
          alignSelf: 'flex-start',
          borderRadius: card.imageRadius,
          overflow: 'hidden',
        }}
      >
        <Image src={blog.coverImage} alt={blog.imageAlt} fill priority sizes="(min-width: 1360px) 494px, (min-width: 900px) 40vw, 100vw" style={{ objectFit: 'cover' }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '13px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '9px' }}>
              <Typography variant="cardCategory">{categoryLabel}</Typography>
              <Typography variant="featuredDate" component="time" dateTime={blog.date}>
                {dateLabel}
              </Typography>
            </Box>
            <Typography variant="featuredTitle">{blog.title}</Typography>
          </Box>
          <Typography variant="featuredSummary">{blog.summary}</Typography>
        </Box>
        {(blog.hasArticle || blog.type === 'external') && (
          <Box sx={{ display: 'flex' }}>
            <BlogLink blog={blog} label={linkLabel} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
