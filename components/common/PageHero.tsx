import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import PillBadge from '@/components/common/PillBadge';
import { edgeFade } from '@/components/common/edgeFade';

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
  // When `image` is the full artwork: the strip of it (in source pixels) that the desktop design shows
  crop?: { width: number; height: number; top: number; stripHeight: number };
  // Mobile Figma layout (below 600px): a tinted band behind the text, and the photo placed lower down
  mobile?: { height: number; tintHeight: number; photo: { right: number; top: number; width: number } };
};

export default function PageHero({ eyebrow, titleLine1, titleLine2, description, image, imageAlt, height, overlay, crop, mobile }: Props) {
  // Below 600px the mobile design replaces the stacked photo, when the page provides one
  const xsOnly = mobile ? { xs: 'block', sm: 'none' } : { xs: 'none' };
  const fromSm = mobile ? { xs: 'none', sm: 'block' } : { xs: 'block' };

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
          justifyContent: { xs: mobile ? 'flex-start' : 'center', sm: 'center' },
          minHeight: { xs: mobile?.height ?? 0, sm: 0, lg: height },
        }}
      >
        {mobile && (
          <Box aria-hidden sx={{ display: xsOnly }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: mobile.tintHeight, bgcolor: 'background.sky' }} />
          </Box>
        )}
        {mobile && (
          <Box
            sx={{
              display: xsOnly,
              position: 'absolute',
              right: mobile.photo.right,
              top: mobile.photo.top,
              width: mobile.photo.width,
              aspectRatio: crop ? `${crop.width} / ${crop.height}` : undefined,
            }}
          >
            <Image src={image} alt={imageAlt} fill priority sizes={`${mobile.photo.width}px`} />
          </Box>
        )}
        <Box
          sx={{
            display: fromSm,
            position: { xs: 'relative', lg: 'absolute' },
            order: 1,
            inset: { lg: 0 },
            height: { xs: 220, sm: 280, md: 334, lg: 'auto' },
            '@media (min-width: 1441px)': { maskImage: edgeFade },
            ...(crop && { containerType: 'size' }),
          }}
        >
          {crop ? (
            // Covers the box from the right, centred vertically, showing only the strip the desktop design uses
            <Box
              sx={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: `max(100%, 100cqh * ${crop.width} / ${crop.stripHeight})`,
                aspectRatio: `${crop.width} / ${crop.stripHeight}`,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: `calc(-100% * ${crop.top} / ${crop.stripHeight})`,
                  width: '100%',
                  height: `calc(100% * ${crop.height} / ${crop.stripHeight})`,
                }}
              >
                <Image src={image} alt={mobile ? '' : imageAlt} fill priority sizes="(min-width: 1360px) 1440px, 100vw" />
              </Box>
            </Box>
          ) : (
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1360px) 1440px, 100vw"
              style={{ objectFit: 'cover', objectPosition: 'right center' }}
            />
          )}
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
            pl: { xs: mobile ? '20px' : 2, sm: 4, md: 5, lg: 'max(80px, calc(50% - 570px))' },
            pr: { xs: mobile ? '20px' : 2, sm: 4, md: 5, lg: 0 },
            pt: { xs: mobile ? '43px' : 6, sm: 6, lg: 0 },
            pb: { xs: mobile ? 0 : 4, sm: 4, lg: 0 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '12px',
              // Mobile Figma: a smaller pill
              ...(mobile && {
                '& > :first-child': { height: { xs: 22, sm: 30 } },
                '& .MuiTypography-badge': { fontSize: { xs: 10, sm: 14 } },
              }),
            }}
          >
            <PillBadge icon={null}>{eyebrow}</PillBadge>
            <Typography variant="displayTitle" sx={{ color: 'text.heading', fontSize: { xs: mobile ? 24 : 28, sm: 36 } }}>
              {titleLine1}
              {/* The mobile design lets the title wrap naturally */}
              <Box component="br" sx={{ display: { xs: mobile ? 'none' : 'inline', sm: 'inline' } }} />
              {mobile && ' '}
              <Box component="span" sx={{ color: 'secondary.main' }}>
                {titleLine2}
              </Box>
            </Typography>
          </Box>
          <Typography variant="heroBody" sx={{ color: 'text.heading', maxWidth: 516, fontSize: { xs: mobile ? 12 : 14, sm: 14 } }}>
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
