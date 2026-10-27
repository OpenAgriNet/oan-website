/* eslint-disable @next/next/no-img-element */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = {
  icon: string;
  number: string;
  title: string;
  description: string;
  capabilitiesLabel: string;
  capabilities: string[];
};

// Figma hover variant: Smart Animate, ease-in-out, 300ms
const transition = '300ms ease-in-out';

export default function BuildingBlockCard({ icon, number, title, description, capabilitiesLabel, capabilities }: Props) {
  return (
    <Box
      component="article"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        p: 2,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.1)',
        borderTopLeftRadius: '12px',
        borderBottomRightRadius: '12px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.07)',
        transition: `border-color ${transition}, box-shadow ${transition}`,
        '& [data-hover]': { transition: `opacity ${transition}` },
        '& [data-hover="in"]': { opacity: 0 },
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
          '& [data-hover="out"]': { opacity: 0 },
          '& [data-hover="in"]': { opacity: 1 },
        },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '& [data-hover]': { transition: 'none' },
        },
      }}
    >
      {/* Grows so the divider and chips line up across cards in the same row */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={icon} alt="" width={52} height={52} />
          <Box sx={{ display: 'grid', alignItems: 'center', justifyItems: 'end', '& > *': { gridArea: '1 / 1' } }}>
            <Box data-hover="out" sx={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'primary.main' }}>
              <Box sx={{ width: 10, height: 2, bgcolor: 'currentColor' }} />
              <Typography component="span" sx={{ fontSize: 16, lineHeight: 1.2, fontWeight: 700 }}>
                {number}
              </Typography>
            </Box>
            <img data-hover="in" src="/icons/arrow-right-badge.svg" alt="" width={44} height={44} />
          </Box>
        </Box>
        <Typography variant="cardTitle" sx={{ color: 'text.heading', fontSize: 18 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 14, lineHeight: 1.2, color: 'text.heading' }}>{description}</Typography>
      </Box>
      <Box sx={{ height: '1px', bgcolor: 'rgba(var(--mui-palette-text-primaryChannel) / 0.1)' }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="label" sx={{ color: 'primary.main' }}>
          {capabilitiesLabel}
        </Typography>
        <Box component="ul" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: '12px', m: 0, p: 0 }}>
          {capabilities.map((capability) => (
            <Box
              component="li"
              key={capability}
              sx={{
                flex: '1 1 0',
                minWidth: 0,
                display: 'flex',
                alignItems: 'center',
                p: '12px',
                borderRadius: '4px',
                bgcolor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.05)',
                color: 'primary.main',
                listStyle: 'none',
              }}
            >
              {/* Line breaks in the copy follow Figma; they only apply once chips sit side by side */}
              <Typography variant="chip" sx={{ fontWeight: 500, letterSpacing: '0.24px', whiteSpace: { xs: 'normal', sm: 'pre-line' } }}>
                {capability}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
