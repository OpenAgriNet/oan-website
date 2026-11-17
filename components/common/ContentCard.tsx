import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { oan } from '@/theme/oan';
import { inter } from './inter';

type Props = {
  image: string;
  imageAlt: string;
  // Label above the title, e.g. "WEBINAR"
  category: string;
  date: string;
  // Machine-readable date for the <time> element (ISO)
  dateTime?: string;
  title: string;
  summary: string;
  // Small pill on the right, e.g. "Ongoing" or a location; left out when not given
  tag?: string;
  // e.g. "View Details"; shown only with an href. Addresses starting with http open in a new tab
  linkLabel: string;
  href?: string;
};

const { card, tag: tagStyle } = oan.layout;

// Figma card used by the Events page: image, category and date, title, summary, then a link and a tag.
// Styled from the OAN style sheet (theme/oan.ts)
export default function ContentCard({ image, imageAlt, category, date, dateTime, title, summary, tag, linkLabel, href }: Props) {
  const external = href?.startsWith('http');

  return (
    <Box
      component="article"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: card.padding,
        border: '1px solid',
        borderColor: 'card.border',
        borderRadius: card.radius,
        bgcolor: 'background.paper',
        position: 'relative',
        transition: 'transform 200ms ease-out, box-shadow 200ms ease-out',
        // Same hover zoom as the About Us team cards; pointer devices only, so touch screens never get a stuck state
        '@media (hover: hover)': {
          '&:hover': { transform: 'scale(1.03)', boxShadow: card.shadowHover, zIndex: 1 },
        },
        '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
      }}
    >
      <Box sx={{ position: 'relative', height: card.imageHeight, borderRadius: card.imageRadius, overflow: 'hidden', flexShrink: 0 }}>
        <Image src={image} alt={imageAlt} fill sizes="(min-width: 1100px) 377px, (min-width: 600px) 50vw, 100vw" style={{ objectFit: 'cover' }} />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '13px' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '11px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', columnGap: 2, rowGap: '4px' }}>
              <Typography variant="cardCategory" component="p">
                {category}
              </Typography>
              <Typography variant="cardDate" component={dateTime ? 'time' : 'p'} {...(dateTime && { dateTime })}>
                {date}
              </Typography>
            </Box>
            {/* Figma reserves two title lines and three summary lines so the rows line up across cards */}
            <Typography variant="cardHeading" component="h3" sx={{ minHeight: '2.4em' }}>
              {title}
            </Typography>
          </Box>
          <Typography variant="cardSummary" sx={{ minHeight: { xs: '5.6em', sm: '4.2em' } }}>
            {summary}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          {href && (
            <Box
              sx={{
                position: 'relative',
                '& a': {
                  typography: 'cardLink',
                  textUnderlinePosition: 'from-font',
                  whiteSpace: 'nowrap',
                  '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: '2px', borderRadius: '2px' },
                },
              }}
            >
              <Link href={href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
                {linkLabel}
                <Box component="span" sx={visuallyHidden}>
                  {`: ${title}`}
                </Box>
              </Link>
            </Box>
          )}
          {tag && (
            <Box
              component="span"
              className={inter.className}
              sx={{
                ml: 'auto',
                p: tagStyle.padding,
                borderRadius: tagStyle.radius,
                bgcolor: 'tag.background',
                color: 'tag.text',
                fontSize: tagStyle.size,
                lineHeight: 'normal',
                fontWeight: tagStyle.weight,
                whiteSpace: 'nowrap',
              }}
            >
              {tag}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

// Gives each link a unique accessible name ("View Details: <title>") without changing what is shown
const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
} as const;
