import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function EyebrowPill({ children }: Props) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        alignSelf: 'flex-start',
        height: 30,
        pl: '11px',
        pr: '12px',
        borderRadius: '100px',
        bgcolor: 'primary.main',
        color: 'common.white',
      }}
    >
      <Typography variant="label">{children}</Typography>
    </Box>
  );
}
