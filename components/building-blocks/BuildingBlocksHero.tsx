import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import PillBadge from '@/components/common/PillBadge';

export default async function BuildingBlocksHero() {
  const t = await getTranslations('BuildingBlocks.hero');

  return (
    <Box component="section" sx={{ position: 'relative', overflow: 'hidden', minHeight: { lg: 369 } }}>
      <Box
        sx={{
          position: 'absolute',
          // Below lg the text moves left, so the image is anchored right and widened to crop the leaf out
          left: { xs: -360, lg: 0 },
          right: 0,
          bottom: 0,
          height: { xs: '100%', lg: 367 },
          '& img': { objectPosition: 'right bottom' },
        }}
      >
        <Image src="/images/building-blocks-hero-bg.png" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
      </Box>
      {/* Percentage padding resolves against the parent, so the 1440px box must wrap the padded row */}
      <Box sx={{ position: 'relative', maxWidth: 1440, mx: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            // Text stays aligned with the header logo at every width, like the home hero
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center', lg: 'flex-start' },
            // Between md and lg the image sits on the right edge, under the end of the header nav
            justifyContent: { md: 'space-between', lg: 'flex-start' },
            gap: { xs: 4, lg: '41px' },
            pt: { xs: 6, md: 5, lg: 0 },
            pb: { xs: 3, md: 5, lg: 0 },
            // At 1440px the text starts at x=290 and the image ends at x=1315, as in Figma
            pl: { xs: 2, sm: 4, md: 5, lg: 'max(80px, calc(50% - 430px))' },
            pr: { xs: 2, sm: 4, md: 5, lg: 'max(40px, calc(50% - 595px))' },
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 571,
              minWidth: 0,
              flex: { md: '1 1 auto' },
              mt: { lg: '67px' },
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
              <PillBadge icon={null}>{t('eyebrow')}</PillBadge>
              <Typography variant="displayTitle" sx={{ color: 'text.heading', fontSize: { xs: 28, sm: 36 } }}>
                {t('titleLine1')}
                <br />
                <Box component="span" sx={{ color: 'secondary.main' }}>
                  {t('titleLine2')}
                </Box>
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 14, lineHeight: 1.5, fontWeight: 500, color: 'text.heading' }}>
              {t('description')}
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'relative',
              flexShrink: 0,
              alignSelf: { xs: 'center', md: 'auto' },
              width: { xs: '100%', md: 'clamp(300px, 32vw, 413px)', lg: 413 },
              maxWidth: { xs: 320, sm: 360, md: 'none' },
              aspectRatio: '413 / 344.17',
              mt: { lg: '5px' },
            }}
          >
            <Image
              src="/images/building-blocks-hero.png"
              alt={t('imageAlt')}
              fill
              priority
              sizes="(min-width: 900px) 413px, 360px"
              style={{ objectFit: 'cover', mixBlendMode: 'multiply' }}
            />
            <Box
              component="img"
              src="/images/oan-mark.svg"
              alt=""
              sx={{
                position: 'absolute',
                left: '53.85%',
                top: '52.42%',
                width: '11.86%',
                height: 'auto',
                transform: 'translate(-50%, -50%) rotate(-25.43deg)',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
