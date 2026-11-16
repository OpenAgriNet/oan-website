import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { Link } from '@/i18n/navigation';
import type { BlogSummary } from '@/lib/blogTypes';

type Props = {
  blog: BlogSummary;
  categoryLabel: string;
  dateLabel: string;
  linkLabel: string;
  imageAlt: string;
  featured?: boolean;
};

export default function BlogCard({ blog, categoryLabel, dateLabel, linkLabel, imageAlt, featured }: Props) {
  const external = blog.type === 'external' && blog.externalUrl;
  const linkProps = external
    ? { component: 'a' as const, href: blog.externalUrl, target: '_blank', rel: 'noopener noreferrer' }
    : { component: Link, href: `/blogs/${blog.slug}` };

  return (
    <Box
      component="article"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        px: 2,
        py: '12px',
        border: '1px solid',
        borderColor: 'card.border',
        borderRadius: '16px',
        bgcolor: 'background.paper',
        transition: 'transform 200ms ease-out, box-shadow 200ms ease-out',
        '@media (hover: hover)': { '&:hover': { transform: 'scale(1.03)', boxShadow: '0 8px 28px rgba(0, 0, 0, 0.14)' } },
        '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
      }}
    >
      <Box sx={{ position: 'relative', height: featured ? 240 : 196, borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
        <Image src={blog.coverImage} alt={imageAlt} fill sizes="(min-width: 1100px) 377px, (min-width: 600px) 50vw, 100vw" style={{ objectFit: 'cover' }} />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '11px' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', columnGap: 2, rowGap: '4px' }}>
          <Typography sx={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, color: 'primary.main', textTransform: 'uppercase' }}>
            {categoryLabel}
          </Typography>
          <Typography component="time" dateTime={blog.date} sx={{ fontSize: 12, lineHeight: 1.2, color: 'text.caption' }}>
            {dateLabel}
          </Typography>
        </Box>
        <Typography variant="cardTitle" component="h3" sx={{ color: 'text.title' }}>
          {blog.title}
        </Typography>
        <Typography sx={{ flex: 1, fontSize: 13, lineHeight: 1.4, color: 'text.heading' }}>{blog.summary}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Box
            {...linkProps}
            sx={{ fontSize: 16, lineHeight: 1.5, fontWeight: 700, color: 'primary.main', textDecoration: 'underline', '&:focus-visible': { outline: '2px solid', outlineOffset: '2px' } }}
          >
            {linkLabel}
            <Box component="span" sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{`: ${blog.title}`}</Box>
          </Box>
          {blog.location && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'text.caption', fontSize: 12 }}>
              <PlaceOutlinedIcon aria-hidden sx={{ fontSize: 16 }} />
              {blog.location}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
