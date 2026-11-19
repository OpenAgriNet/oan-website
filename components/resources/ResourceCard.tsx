'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconBadge from '@/components/common/IconBadge';
import MaskIcon from '@/components/common/MaskIcon';
import { Link } from '@/i18n/navigation';

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
  href?: string;
  exploreAriaLabel: string;
  upcomingLabel: string;
};

export default function ResourceCard({ icon, title, description, href, exploreAriaLabel, upcomingLabel }: Props) {
  const external = href?.startsWith('http');

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
        ...(href && { '&:has(:focus-visible)': hovered, '@media (hover: hover)': { '&:hover': hovered } }),
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
          <IconBadge size={52}>
            <MaskIcon src={icon} size={30} sx={{ bgcolor: 'primary.main' }} />
          </IconBadge>
          {!href && (
            // Figma: 30px pill, 5/12/5/11 padding, #1B5138 at 10%, Montserrat Medium 12px / 120%
            <Typography
              component="span"
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: 30,
                pt: '5px',
                pr: '12px',
                pb: '5px',
                pl: '11px',
                borderRadius: '100px',
                bgcolor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.1)',
                color: 'primary.main',
                fontSize: 12,
                lineHeight: 1.2,
                fontWeight: 500,
                letterSpacing: 0,
                whiteSpace: 'nowrap',
              }}
            >
              {upcomingLabel}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="cardTitle" sx={{ color: 'text.heading' }}>
            {title}
          </Typography>
          <Typography variant="blockBody" sx={{ color: 'text.heading' }}>
            {description}
          </Typography>
        </Box>
      </Box>
      {href && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box
            component={Link}
            href={href}
            {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
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
      )}
    </Box>
  );
}
