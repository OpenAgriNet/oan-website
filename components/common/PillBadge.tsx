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
        height: { xs: 24, sm: 30 },
        pl: '11px',
        pr: '12px',
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
