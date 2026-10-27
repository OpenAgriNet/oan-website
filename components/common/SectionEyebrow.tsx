import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  align?: 'left' | 'center';
  fontWeight?: number;
};

export default function SectionEyebrow({ children, align = 'left', fontWeight }: Props) {
  const centered = align === 'center';

  return (
    <Box sx={{ position: 'relative', height: 33, display: 'flex', justifyContent: centered ? 'center' : 'flex-start' }}>
      <Typography variant="eyebrow" sx={{ color: 'primary.main', fontWeight }}>
        {children}
      </Typography>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: 1,
          left: centered ? '50%' : 0,
          width: 50,
          height: 2,
          bgcolor: 'primary.main',
          transform: centered ? 'translateX(-50%)' : 'none',
        }}
      />
    </Box>
  );
}
