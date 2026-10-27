import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import PillBadge from '@/components/common/PillBadge';
import { edgeFade } from '@/components/common/edgeFade';
import SiteContainer from '@/components/layout/SiteContainer';

export default async function AboutHeroSection() {
  const t = await getTranslations('AboutUs.hero');

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
          minHeight: { md: 300, lg: 354 },
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            inset: { md: 0 },
            order: { xs: 2, md: 0 },
            width: '100%',
            height: { xs: 200, sm: 280, md: 'auto' },
            '@media (min-width: 1441px)': { maskImage: edgeFade },
          }}
        >
          <Image
            src="/images/about-us/hero-bg.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1440px) 1440px, 100vw"
            style={{ objectFit: 'cover', objectPosition: 'right center' }}
          />
        </Box>
        <SiteContainer
          sx={{
            position: 'relative',
            zIndex: 1,
            order: { xs: 1, md: 0 },
            pt: { xs: 4, md: '60px', lg: '84px' },
            pb: { xs: 3, md: '60px', lg: '84px' },
            pl: { lg: '127px' },
          }}
        >
          <Box sx={{ maxWidth: 632, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
              <PillBadge icon={null}>{t('badge')}</PillBadge>
              <Typography
                variant="heroTitle"
                component="h1"
                sx={{ color: 'text.heading', fontSize: { xs: 28, sm: 32, md: 36 } }}
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
            <Typography variant="heroBody" sx={{ color: 'text.heading' }}>
              {t('description')}
            </Typography>
          </Box>
        </SiteContainer>
      </Box>
    </Box>
  );
}
