import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import PillBadge from '@/components/common/PillBadge';
import SiteContainer from '@/components/layout/SiteContainer';

export default async function HeroSection() {
  const t = await getTranslations('Home.hero');

  return (
    <Box component="section" sx={{ bgcolor: 'background.default', overflow: 'hidden' }}>
      <Box sx={{ position: 'relative', maxWidth: 1440, mx: 'auto', minHeight: { lg: 494 } }}>
        <SiteContainer sx={{ position: 'relative', zIndex: 1, pt: { xs: 4, lg: '57px' }, pl: { lg: '127px' } }}>
          <Box sx={{ maxWidth: 577, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
              <PillBadge>{t('badge')}</PillBadge>
              <Typography variant="heroTitle" sx={{ color: 'text.heading', fontSize: { xs: 30, sm: 36, md: 42 } }}>
                {t.rich('title', {
                  accent: (chunks) => (
                    <Box component="span" sx={{ color: 'secondary.main' }}>
                      {chunks}
                    </Box>
                  ),
                })}
              </Typography>
            </Box>
            <Typography variant="heroBody" sx={{ color: 'text.heading', maxWidth: 491 }}>
              {t('description')}
            </Typography>
          </Box>
        </SiteContainer>
        <Box
          sx={{
            position: { xs: 'relative', lg: 'absolute' },
            height: { xs: 220, sm: 300, md: 380, lg: 474 },
            width: { xs: '100%', lg: 1332 },
            top: { lg: 0 },
            right: { lg: -53 },
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
