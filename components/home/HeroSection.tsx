import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import PillBadge from '@/components/common/PillBadge';
import { edgeFade } from '@/components/common/edgeFade';
import SiteContainer from '@/components/layout/SiteContainer';

export default async function HeroSection() {
  const t = await getTranslations('Home.hero');

  return (
    <Box component="section" sx={{ bgcolor: 'background.default', overflow: 'hidden' }}>
      <Box sx={{ position: 'relative', maxWidth: 1440, mx: 'auto', minHeight: { xs: 538, sm: 'auto', lg: 494 } }}>
        <SiteContainer
          sx={{
            position: 'relative',
            zIndex: 1,
            px: { xs: '20px', sm: 4, md: 5, lg: 10 },
            pt: { xs: '43px', sm: 4, lg: '57px' },
            pl: { lg: '127px' },
          }}
        >
          <Box sx={{ maxWidth: { xs: 335, sm: 577 }, display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
              <PillBadge>{t('badge')}</PillBadge>
              <Typography
                variant="heroTitle"
                sx={{ color: 'text.heading', fontSize: { xs: 24, sm: 36, md: 42 }, lineHeight: { xs: '30px', sm: 1.2 } }}
              >
                {t.rich('title', {
                  accent: (chunks) => (
                    <Box component="span" sx={{ color: 'secondary.main' }}>
                      {chunks}
                    </Box>
                  ),
                })}
              </Typography>
            </Box>
            <Typography
              variant="heroBody"
              sx={{ color: 'text.heading', maxWidth: 491, fontSize: { xs: 12, sm: 14 }, lineHeight: { xs: '18px', sm: 1.5 } }}
            >
              {t('description')}
            </Typography>
          </Box>
        </SiteContainer>
        {/* Figma mobile: 375x500 artwork (transparent top so the copy overlays it) starting 38px below the header */}
        <Box sx={{ display: { xs: 'block', sm: 'none' }, position: 'absolute', top: 38, left: 0, right: 0, height: 500 }}>
          <Image
            src="/images/home/hero-bg-mobile.png"
            alt={t('imageAlt')}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center bottom' }}
          />
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'block' },
            position: { sm: 'relative', lg: 'absolute' },
            height: { sm: 300, md: 380, lg: 474 },
            width: { sm: '100%', lg: 1332 },
            top: { lg: 0 },
            right: { lg: -53 },
            '@media (min-width: 1441px)': { maskImage: edgeFade },
          }}
        >
          <Image
            src="/images/home/hero-bg.png"
            alt={t('imageAlt')}
            fill
            priority
            sizes="(min-width: 1360px) 1332px, 100vw"
            style={{ objectFit: 'cover', objectPosition: 'right bottom' }}
          />
        </Box>
      </Box>
    </Box>
  );
}
