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

// Figma "Related Blog" card (440 x 131): 136 x 105 picture on the left; Read More follows the usual blog link rules
export default function RelatedBlogCard({ blog, categoryLabel, dateLabel, linkLabel }: Props) {
  return (
    <Box
      component="article"
      sx={{
        display: 'flex',
        gap: 2,
        p: card.padding,
        border: '1px solid',
        borderColor: 'card.border',
        borderRadius: card.radius,
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ position: 'relative', flexShrink: 0, width: 136, height: 105, borderRadius: card.imageRadius, overflow: 'hidden' }}>
        <Image src={blog.coverImage} alt={blog.imageAlt} fill sizes="136px" style={{ objectFit: 'cover' }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '13px', mt: '-1.5px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: '12px' }}>
            <Typography variant="cardCategory">{categoryLabel}</Typography>
            <Typography variant="featuredDate" component="time" dateTime={blog.date}>
              {dateLabel}
            </Typography>
          </Box>
          <Typography variant="cardHeading" component="h3">
            {blog.title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <BlogLink blog={blog} label={linkLabel} />
        </Box>
      </Box>
    </Box>
  );
}
