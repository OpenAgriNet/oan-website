import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

type Align = 'left' | 'center';

type Props = {
  children: ReactNode;
  align?: Align | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', Align>>;
  fontWeight?: number;
};

export default function SectionEyebrow({ children, align = 'left', fontWeight }: Props) {
  // A string keeps the original behaviour; a breakpoint map lets the alignment change per screen size
  const pick = <T,>(centered: T, start: T) =>
    typeof align === 'string'
      ? align === 'center'
        ? centered
        : start
      : Object.fromEntries(Object.entries(align).map(([bp, value]) => [bp, value === 'center' ? centered : start]));

  return (
    <Box sx={{ position: 'relative', height: 33, display: 'flex', justifyContent: pick('center', 'flex-start') }}>
      <Typography variant="eyebrow" sx={{ color: 'primary.main', fontWeight }}>
        {children}
      </Typography>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: 1,
          left: pick<string | number>('50%', 0),
          width: 50,
          height: 2,
          bgcolor: 'primary.main',
          transform: pick('translateX(-50%)', 'none'),
        }}
      />
    </Box>
  );
}
