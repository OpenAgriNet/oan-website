import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import PillBadge from '@/components/common/PillBadge';
import { edgeFade } from '@/components/common/edgeFade';

type Props = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  // Plain (not highlighted) words at the start of line 2, e.g. "from " in "from OpenAgriNet."
  titleLine2Lead?: string;
  // Figma width of the title box at desktop, when it is wider than the text column (e.g. Blog: 563px)
  titleWidth?: number;
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
  mobile?: {
    height: number;
    tintHeight: number;
    photo: { right: number; top: number; width: number };
    // Space above the pill (default 43px)
    textTop?: number;
    // Drawn over the photo, e.g. a fade from the tint colour
    overlay?: string;
  };
};

export default function PageHero({ eyebrow, titleLine1, titleLine2, titleLine2Lead, titleWidth, description, image, imageAlt, height, overlay, crop, mobile }: Props) {
  // Below 600px the mobile design replaces the stacked photo, when the page provides one
  const xsOnly = mobile ? { xs: 'block', sm: 'none' } : { xs: 'none' };
  const fromSm = mobile ? { xs: 'none', sm: 'block' } : { xs: 'block' };

  return (
    <Box component="section" sx={{ overflow: 'hidden', bgcolor: 'background.paper' }}>
      {/* From 900px (like the About Us and Resources heroes) the photo sits behind the text in the centred 1440px area; narrower screens stack it under the text */}
      <Box
        sx={{
          position: 'relative',
          maxWidth: 1440,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: mobile ? 'flex-start' : 'center', sm: 'center' },
          // About Us hero height between 900px and the desktop design; Figma height from 1360px
          minHeight: { xs: mobile?.height ?? 0, sm: 0, md: 300, lg: height },
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
        {mobile?.overlay && (
          <Box aria-hidden sx={{ display: xsOnly, position: 'absolute', top: 0, left: 0, right: 0, height: mobile.height, background: mobile.overlay }} />
        )}
        <Box
          sx={{
            display: fromSm,
            position: { xs: 'relative', md: 'absolute' },
            order: 1,
            inset: { md: 0 },
            height: { xs: 220, sm: 280, md: 'auto' },
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
          {overlay ? (
            <Box aria-hidden sx={{ position: 'absolute', inset: 0, display: { xs: 'none', md: 'block' }, background: overlay }} />
          ) : (
            // Between 900px and the desktop layout the text covers more of the photo: fade its left side so the text stays readable
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                inset: 0,
                display: { xs: 'none', md: 'block', lg: 'none' },
                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.92) 40%, rgba(255, 255, 255, 0) 75%)',
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: { md: 'calc(516px + 40px)', lg: 'calc(516px + max(80px, 50% - 570px))' },
            // At 1440px the text starts at x=150, as in Figma
            pl: { xs: mobile ? '20px' : 2, sm: 4, md: 5, lg: 'max(80px, calc(50% - 570px))' },
            pr: { xs: mobile ? '20px' : 2, sm: 4, md: 5, lg: 0 },
            pt: { xs: mobile ? `${mobile.textTop ?? 43}px` : 6, sm: 6, md: '60px', lg: 0 },
            pb: { xs: mobile ? 0 : 4, sm: 4, md: '60px', lg: 0 },
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
                '& .MuiTypography-badge': { fontSize: { xs: 10, sm: 14 }, textTransform: { xs: 'uppercase', sm: 'none' } },
              }),
            }}
          >
            <PillBadge>{eyebrow}</PillBadge>
            {/* The mobile design of a page (e.g. Events) uses a smaller title on phones */}
            <Typography variant="pageHeroTitle" sx={{ ...(mobile && { fontSize: { xs: 24, sm: 36 } }), ...(titleWidth && { width: { lg: titleWidth } }) }}>
              {titleLine1}
              {/* The mobile design lets the title wrap naturally */}
              <Box component="br" sx={{ display: { xs: mobile ? 'none' : 'inline', sm: 'inline' } }} />
              {mobile && ' '}
              {titleLine2Lead}
              <Box component="span" sx={{ color: 'secondary.main' }}>
                {titleLine2}
              </Box>
            </Typography>
          </Box>
          <Typography variant="pageHeroDescription" sx={{ maxWidth: 516, ...(mobile && { fontSize: { xs: 12, sm: 14 } }) }}>
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
