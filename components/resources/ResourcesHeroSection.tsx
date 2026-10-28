import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import PillBadge from '@/components/common/PillBadge';
import { edgeFade } from '@/components/common/edgeFade';
import SiteContainer from '@/components/layout/SiteContainer';

export default async function ResourcesHeroSection() {
  const t = await getTranslations('Resources.hero');

  return (
    <Box component="section" sx={{ bgcolor: 'background.default', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'relative',
          maxWidth: 1440,
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
          minHeight: { md: 300, lg: 311 },
        }}
      >
        {/* Figma mobile: 375x312 artwork behind the copy; scales in proportion, never cropped */}
        <Box
          aria-hidden
          sx={{ display: { xs: 'block', sm: 'none' }, position: 'relative', width: '100%', aspectRatio: '750 / 624' }}
        >
          <Image
            src="/images/resources/hero-bg-mobile.png"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: 'contain', objectPosition: 'center bottom' }}
          />
        </Box>
        <Box
          aria-hidden
          sx={{
            display: { xs: 'none', sm: 'block' },
            position: { sm: 'relative', md: 'absolute' },
            inset: { md: 0 },
            order: { xs: 2, md: 0 },
            width: '100%',
            height: { sm: 240, md: 'auto' },
            '@media (min-width: 1441px)': { maskImage: edgeFade },
          }}
        >
          <Image
            src="/images/resources/hero-bg.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1440px) 1440px, 100vw"
            style={{ objectFit: 'cover', objectPosition: 'right bottom' }}
          />
        </Box>
        <SiteContainer
          sx={{
            // On phones the copy overlays the artwork, which sets the section height
            position: { xs: 'absolute', sm: 'relative' },
            top: { xs: 0 },
            left: { xs: 0 },
            right: { xs: 0 },
            zIndex: 1,
            order: { xs: 1, md: 0 },
            px: { xs: '20px', sm: 4, md: 5, lg: 10 },
            pt: { xs: '42.5px', sm: 4, md: '73px' },
            pb: { xs: 3, md: '73px' },
            pl: { lg: '150px' },
          }}
        >
          <Box sx={{ maxWidth: { xs: 335, sm: 516 }, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
              <PillBadge icon={null}>{t('badge')}</PillBadge>
              <Typography
                variant="heroTitle"
                sx={{ color: 'text.heading', fontSize: { xs: 24, sm: 32, md: 36 }, whiteSpace: { md: 'nowrap' } }}
              >
                {t.rich('title', {
                  accent: (chunks) => (
                    <Box component="span" sx={{ color: 'secondary.main' }}>
                      {chunks}
                    </Box>
                  ),
                  br: () => <Box component="br" sx={{ display: { xs: 'none', sm: 'inline' } }} />,
                })}
              </Typography>
            </Box>
            <Typography
              variant="heroBody"
              sx={{ color: 'text.heading', fontSize: { xs: 12, sm: 14 }, lineHeight: { xs: '18px', sm: 1.5 } }}
            >
              {t('description')}
            </Typography>
          </Box>
        </SiteContainer>
      </Box>
    </Box>
  );
}
