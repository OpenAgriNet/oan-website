import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  icon?: string | null;
};

export default function PillBadge({ children, icon = '/icons/star-outline.png' }: Props) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        // Figma mobile: the icon-less pill is 22px tall, the one with an icon 24px
        height: { xs: icon ? 24 : 22, sm: 30 },
        pl: { xs: icon ? '11px' : '12px', sm: '11px' },
        pr: { xs: icon ? '12px' : '13px', sm: '12px' },
        borderRadius: '100px',
        bgcolor: 'primary.main',
        color: 'common.white',
      }}
    >
      {icon && (
        <Box
          aria-hidden
          sx={{
            width: { xs: 16, sm: 20 },
            height: { xs: 16, sm: 20 },
            flexShrink: 0,
            bgcolor: 'currentColor',
            maskImage: `url(${icon})`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
          }}
        />
      )}
      <Typography variant="badge" sx={{ whiteSpace: 'nowrap', fontSize: { xs: 10, sm: 14 } }}>
        {children}
      </Typography>
    </Box>
  );
}
