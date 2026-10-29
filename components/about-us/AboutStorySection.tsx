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
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          // Figma mobile: solid #FAFBFA
          bgcolor: { xs: 'background.subtle', sm: 'background.section' },
          opacity: { xs: 1, sm: 0.6 },
        },
      }}
    >
      <SiteContainer
        sx={{
          position: 'relative',
          px: { xs: '20px', sm: 4, md: 5, lg: 10 },
          pt: { xs: '24px', sm: 5, md: '64px' },
          pb: { xs: '24px', sm: 5, md: '85px' },
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: 335, sm: 947 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: { xs: '14.5px', sm: 2, md: 3 } }}>
            {/* Figma mobile: 11px eyebrow in a 30px box */}
            <Box sx={{ '& .MuiTypography-root': { fontSize: { xs: 11, sm: 14 } }, '& > div': { height: { xs: 30, sm: 33 } } }}>
              <SectionEyebrow align="center">{t('eyebrow')}</SectionEyebrow>
            </Box>
            <Typography
              variant="headline"
              component="h2"
              sx={{
                color: 'text.heading',
                fontSize: { xs: 20, sm: 26, md: 28 },
                lineHeight: { md: '34px' },
                letterSpacing: { xs: '0.25px', sm: '0.56px' },
              }}
            >
              {t.rich('title', {
                accent: (chunks) => (
                  <Box component="span" sx={{ color: 'secondary.main', fontWeight: 800, display: { xs: 'block', sm: 'inline' } }}>
                    {chunks}
                  </Box>
                ),
              })}
            </Typography>
          </Box>
          <Typography
            variant="blockBody"
            sx={{ color: 'text.heading', lineHeight: { xs: '17px', sm: '20px' }, fontSize: { xs: 12, sm: 14 } }}
          >
            {t('description')}
          </Typography>
        </Box>
      </SiteContainer>
    </Box>
  );
}
