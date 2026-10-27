import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import PillBadge from '@/components/common/PillBadge';

type Props = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  image: string;
  imageAlt: string;
  // Figma height of the hero at desktop width
  height: number;
  // Drawn over the photo on desktop, e.g. a fade that keeps the text readable
  overlay?: string;
};

// Above 1440px the photo ends inside the page; fading its sides blends its edges into the white
const edgeFade = 'linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)';

export default function PageHero({ eyebrow, titleLine1, titleLine2, description, image, imageAlt, height, overlay }: Props) {
  return (
    <Box component="section" sx={{ overflow: 'hidden', bgcolor: 'background.paper' }}>
      {/* Like the home hero: the photo sits in the centred 1440px area with the text; below lg it stacks under the text */}
      <Box
        sx={{
          position: 'relative',
          maxWidth: 1440,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: { lg: height },
        }}
      >
        <Box
          sx={{
            position: { xs: 'relative', lg: 'absolute' },
            order: 1,
            inset: { lg: 0 },
            height: { xs: 220, sm: 280, md: 334, lg: 'auto' },
            '@media (min-width: 1441px)': { maskImage: edgeFade },
          }}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(min-width: 1360px) 1440px, 100vw"
            style={{ objectFit: 'cover', objectPosition: 'right center' }}
          />
          {overlay && (
            <Box aria-hidden sx={{ position: 'absolute', inset: 0, display: { xs: 'none', lg: 'block' }, background: overlay }} />
          )}
        </Box>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: { lg: 'calc(516px + max(80px, 50% - 570px))' },
            // At 1440px the text starts at x=150, as in Figma
            pl: { xs: 2, sm: 4, md: 5, lg: 'max(80px, calc(50% - 570px))' },
            pr: { xs: 2, sm: 4, md: 5, lg: 0 },
            pt: { xs: 6, lg: 0 },
            pb: { xs: 4, lg: 0 },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
            <PillBadge icon={null}>{eyebrow}</PillBadge>
            <Typography variant="displayTitle" sx={{ color: 'text.heading', fontSize: { xs: 28, sm: 36 } }}>
              {titleLine1}
              <br />
              <Box component="span" sx={{ color: 'secondary.main' }}>
                {titleLine2}
              </Box>
            </Typography>
          </Box>
          <Typography variant="heroBody" sx={{ color: 'text.heading', maxWidth: 516 }}>
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
