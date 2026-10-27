'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import IconBadge from '@/components/common/IconBadge';
import MaskIcon from '@/components/common/MaskIcon';

const EASE = '0.3s cubic-bezier(0.4, 0, 0.2, 1)';

const hovered = {
  bgcolor: 'card.hoverBackground',
  borderColor: 'primary.main',
  '& .ResourceCard-arrow': { bgcolor: 'primary.main', color: 'common.white' },
};

type Props = {
  icon: string;
  title: string;
  description: string;
  href: string;
  exploreAriaLabel: string;
};

export default function ResourceCard({ icon, title, description, href, exploreAriaLabel }: Props) {
  return (
    <Box
      component="article"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minHeight: 213,
        p: 2,
        border: '1px solid',
        borderColor: 'card.outline',
        borderRadius: '12px 0',
        bgcolor: 'background.paper',
        boxShadow: '0 4px 24px var(--mui-palette-card-shadow)',
        transition: `background-color ${EASE}, border-color ${EASE}`,
        '&:has(:focus-visible)': hovered,
        '@media (hover: hover)': { '&:hover': hovered },
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <IconBadge size={52}>
          <MaskIcon src={icon} size={30} sx={{ bgcolor: 'primary.main' }} />
        </IconBadge>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="cardTitle" sx={{ color: 'text.heading' }}>
            {title}
          </Typography>
          <Typography variant="blockBody" sx={{ color: 'text.heading' }}>
            {description}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box
          component={Link}
          href={href}
          className="ResourceCard-arrow"
          aria-label={exploreAriaLabel}
          sx={{
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            bgcolor: 'card.arrowBackground',
            color: 'primary.main',
            transition: 'background-color 0.25s ease, color 0.25s ease',
            '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
            '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          }}
        >
          <MaskIcon src="/icons/arrow-right.svg" size={20} />
        </Box>
      </Box>
    </Box>
  );
}
