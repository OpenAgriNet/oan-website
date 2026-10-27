import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import ActionButton from '@/components/common/ActionButton';
import SectionEyebrow from '@/components/common/SectionEyebrow';
import SiteContainer from '@/components/layout/SiteContainer';

export default async function ExploreCtaSection() {
  const t = await getTranslations('Home.cta');

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: 'background.default', overflow: 'hidden' }}>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: { xs: 0, lg: '-30.8% 0 auto' },
          height: { lg: '175%' },
          '& img': { objectFit: { xs: 'cover', lg: 'fill' }, objectPosition: '50% 46.6%' },
        }}
      >
        <Image
          src="/images/home/explore-cta-bg.png"
          alt=""
          fill
          sizes="100vw"
          style={{ opacity: 0.5 }}
        />
      </Box>
      <SiteContainer sx={{ position: 'relative', pt: { xs: 6, lg: '105px' }, pb: { xs: 6, lg: '98px' } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <SectionEyebrow align="center">{t('eyebrow')}</SectionEyebrow>
          <Typography
            variant="headline"
            sx={{ color: 'text.heading', mt: { xs: 2, lg: '17px' }, fontSize: { xs: 22, sm: 26, md: 28 } }}
          >
            {t.rich('title', {
              accent: (chunks) => (
                <Box component="span" sx={{ color: 'secondary.main', fontWeight: 800, letterSpacing: 0 }}>
                  {chunks}
                </Box>
              ),
            })}
          </Typography>
          <Typography variant="sectionIntro" sx={{ color: 'text.heading', maxWidth: 700, mt: { xs: 2, lg: '16px' }, lineHeight: '20px', fontWeight: 400 }}>
            {t.rich('description', {
              br: () => <Box component="br" sx={{ display: { xs: 'none', md: 'inline' } }} />,
            })}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: '18px', width: { xs: '100%', sm: 'auto' }, maxWidth: { xs: 320, sm: 'none' }, mt: { xs: 3, lg: '15px' } }}>
            <ActionButton href="/building-blocks" tone="primary">
              {t('explore')}
            </ActionButton>
            <ActionButton href="/community" tone="secondary">
              {t('join')}
            </ActionButton>
          </Box>
        </Box>
      </SiteContainer>
    </Box>
  );
}
