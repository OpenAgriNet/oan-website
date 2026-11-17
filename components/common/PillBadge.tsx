import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function PillBadge({ children }: Props) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        // Figma mobile: the pill is 22px tall
        height: { xs: 22, sm: 30 },
        pl: { xs: '12px', sm: '11px' },
        pr: { xs: '13px', sm: '12px' },
        borderRadius: '100px',
        bgcolor: 'primary.main',
        color: 'common.white',
      }}
    >
      <Typography variant="badge" sx={{ whiteSpace: 'nowrap', fontSize: { xs: 10, sm: 14 } }}>
        {children}
      </Typography>
    </Box>
  );
}
