import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { inter } from './inter';

type Props = {
  image: string;
  imageAlt: string;
  type: string;
  date: string;
  title: string;
  description: string;
  tag: string;
  linkLabel: string;
  // Renders a link when set, otherwise a plain button (targets are not decided yet)
  href?: string;
};

export default function EventCard({ image, imageAlt, type, date, title, description, tag, linkLabel, href }: Props) {
  const linkProps = href ? { component: Link, href } : { component: 'button' as const, type: 'button' as const };

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
        position: 'relative',
        transition: 'transform 200ms ease-out, box-shadow 200ms ease-out',
        // Same hover zoom as the About Us team cards; pointer devices only, so touch screens never get a stuck state
        '@media (hover: hover)': {
          '&:hover': { transform: 'scale(1.03)', boxShadow: '0 8px 28px rgba(0, 0, 0, 0.14)', zIndex: 1 },
        },
        '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
      }}
    >
      <Box sx={{ position: 'relative', height: 196, borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1100px) 377px, (min-width: 600px) 50vw, 100vw"
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '13px' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '11px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', columnGap: 2, rowGap: '4px' }}>
              <Typography sx={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, color: 'primary.main', textTransform: 'uppercase' }}>
                {type}
              </Typography>
              <Typography sx={{ fontSize: 12, lineHeight: 1.2, color: 'text.caption' }}>{date}</Typography>
            </Box>
            {/* Figma reserves two title lines and three description lines so the rows line up across cards */}
            <Typography variant="cardTitle" component="h3" sx={{ color: 'text.title', minHeight: '2.4em' }}>
              {title}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 13, lineHeight: 1.4, color: 'text.heading', minHeight: { xs: '5.6em', sm: '4.2em' } }}>
            {description}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Box
            {...linkProps}
            sx={{
              position: 'relative',
              p: 0,
              border: 0,
              bgcolor: 'transparent',
              font: 'inherit',
              fontSize: 16,
              lineHeight: 1.5,
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'underline',
              textUnderlinePosition: 'from-font',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: '2px', borderRadius: '2px' },
            }}
          >
            {linkLabel}
            <Box component="span" sx={visuallyHidden}>
              {`: ${title}`}
            </Box>
          </Box>
          <Box
            component="span"
            className={inter.className}
            sx={{
              px: '12px',
              py: 1,
              borderRadius: '22px',
              bgcolor: 'tag.background',
              color: 'tag.text',
              fontSize: 12,
              lineHeight: 'normal',
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}
          >
            {tag}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// Gives each "View Details" a unique accessible name without changing what is shown
const visuallyHidden = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
} as const;
