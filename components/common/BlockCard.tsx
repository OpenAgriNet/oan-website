import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import IconBadge from './IconBadge';
import MaskIcon from './MaskIcon';

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  exploreLabel: string;
  exploreAriaLabel: string;
  tag?: string;
};

const EASE = '0.3s cubic-bezier(0.4, 0, 0.2, 1)';

const revealed = {
  bgcolor: 'card.hoverBackground',
  borderColor: 'primary.main',
  '& .BlockCard-reveal': { opacity: 1, transform: 'none' },
};

export default function BlockCard({ icon, title, description, exploreLabel, exploreAriaLabel, tag }: Props) {
  return (
    <Box
      component="article"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        minHeight: { lg: 205 },
        p: 2,
        border: 1,
        borderColor: 'card.border',
        borderRadius: '12px 0 12px 0',
        bgcolor: 'background.paper',
        boxShadow: '0 4px 12px var(--mui-palette-card-shadow)',
        transition: `background-color ${EASE}, border-color ${EASE}`,
        '& .BlockCard-reveal': { opacity: 0, transition: `opacity ${EASE}, transform ${EASE}` },
        '& .BlockCard-tag': { transform: 'translateX(8px)' },
        '& .BlockCard-explore': { transform: 'translateY(4px)' },
        '&:has(:focus-visible)': revealed,
        '@media (hover: hover)': { '&:hover': revealed },
        '@media (hover: none)': { pb: '44px', '& .BlockCard-explore': { opacity: 1, transform: 'none' } },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '& .BlockCard-reveal': { transition: 'none' },
        },
      }}
    >
      <IconBadge size={44}>{icon}</IconBadge>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="cardTitle" sx={{ color: 'text.title' }}>
          {title}
        </Typography>
        <Typography variant="blockBody" sx={{ color: 'text.heading' }}>
          {description}
        </Typography>
      </Box>
      {tag && (
        <Box
          className="BlockCard-reveal BlockCard-tag"
          sx={{
            position: 'absolute',
            top: 21,
            right: -1,
            display: 'flex',
            alignItems: 'center',
            height: 26,
            pl: '12px',
            pr: '16px',
            pt: '2px',
            borderRadius: '13px 0 0 13px',
            bgcolor: 'primary.main',
            color: 'common.white',
          }}
        >
          <Typography variant="chip" sx={{ whiteSpace: 'nowrap' }}>
            {tag}
          </Typography>
        </Box>
      )}
      <ButtonBase
        type="button"
        aria-label={exploreAriaLabel}
        className="BlockCard-reveal BlockCard-explore"
        sx={{
          position: 'absolute',
          right: 16,
          bottom: 18,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          borderRadius: '4px',
          color: 'primary.main',
          cursor: 'pointer',
        }}
      >
        <Typography variant="exploreLink" aria-hidden>
          {exploreLabel}
        </Typography>
        <MaskIcon src="/icons/arrow-right.svg" size={20} />
      </ButtonBase>
    </Box>
  );
}
