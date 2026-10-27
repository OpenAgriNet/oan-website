import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getTranslations } from 'next-intl/server';
import SectionEyebrow from '@/components/common/SectionEyebrow';
import SiteContainer from '@/components/layout/SiteContainer';

export default async function AboutStorySection() {
  const t = await getTranslations('AboutUs.story');

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: { lg: 336 },
        '&::before': { content: '""', position: 'absolute', inset: 0, bgcolor: 'background.section', opacity: 0.6 },
      }}
    >
      <SiteContainer
        sx={{
          position: 'relative',
          pt: { xs: 5, md: '64px' },
          pb: { xs: 5, md: '85px' },
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 947,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: { xs: 2, md: 3 } }}>
            <SectionEyebrow align="center">{t('eyebrow')}</SectionEyebrow>
            <Typography
              variant="headline"
              component="h2"
              sx={{ color: 'text.heading', fontSize: { xs: 22, sm: 26, md: 28 }, lineHeight: { md: '34px' } }}
            >
              {t.rich('title', {
                accent: (chunks) => (
                  <Box component="span" sx={{ color: 'secondary.main', fontWeight: 800 }}>
                    {chunks}
                  </Box>
                ),
              })}
            </Typography>
          </Box>
          <Typography variant="blockBody" sx={{ color: 'text.heading', lineHeight: '20px' }}>
            {t('description')}
          </Typography>
        </Box>
      </SiteContainer>
    </Box>
  );
}
