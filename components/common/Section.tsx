import Box from '@mui/material/Box';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { oan } from '@/theme/oan';

type Props = {
  children: ReactNode;
  // Soft section artwork behind the content; hidden on phones, like the Events sections
  background?: string;
  // Space above and below the content, phone and desktop (px)
  pt: { xs: number; lg: number };
  pb: { xs: number; lg: number };
  id?: string;
};

// Standard page section: OAN content width, side padding and spacing between its blocks (theme/oan.ts)
export default function Section({ children, background, pt, pb, id }: Props) {
  const { contentWidth, pagePaddingX, sectionGap } = oan.layout;

  return (
    <Box component="section" id={id} sx={{ position: 'relative', overflow: 'hidden' }}>
      {background && (
        <Box aria-hidden sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Image src={background} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </Box>
      )}
      <Box sx={{ position: 'relative', maxWidth: 1440, mx: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: sectionGap,
            px: pagePaddingX,
            pt: { xs: `${pt.xs}px`, sm: 6, lg: `${pt.lg}px` },
            pb: { xs: `${pb.xs}px`, sm: 6, lg: `${pb.lg}px` },
            // At 1440px the content spans x=79 to 1372, as in Figma
            width: { lg: contentWidth },
            ml: { lg: 'calc(50% - 641px)' },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
