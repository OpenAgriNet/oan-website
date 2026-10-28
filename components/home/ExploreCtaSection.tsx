import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import ActionButton from '@/components/common/ActionButton';
import SectionEyebrow from '@/components/common/SectionEyebrow';
import SiteContainer from '@/components/layout/SiteContainer';

// Figma mobile: two equal 42px-tall buttons side by side with 12px labels
const buttonSx = {
  flex: { xs: 1, sm: '0 1 auto' },
  minHeight: { xs: 42, sm: 52 },
  px: { xs: '3px', sm: '23px' },
  fontSize: { xs: 12, sm: 14 },
  whiteSpace: { xs: 'normal', sm: 'nowrap' },
  lineHeight: { xs: 1.2, sm: '20px' },
};

export default async function ExploreCtaSection() {
  const t = await getTranslations('Home.cta');

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: 'background.default', overflow: 'hidden' }}>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          // Figma mobile: the artwork stops 15px above the footer
          inset: { xs: '0 0 15px', sm: 0, lg: '-30.8% 0 auto' },
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
      <SiteContainer
        sx={{
          position: 'relative',
          px: { xs: '20px', sm: 4, md: 5, lg: 10 },
          pt: { xs: '20px', sm: 6, lg: '105px' },
          pb: { xs: '34.5px', sm: 6, lg: '98px' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* Figma mobile: 11px eyebrow */}
          <Box sx={{ '& .MuiTypography-root': { fontSize: { xs: 11, sm: 14 } }, '& > div': { height: { xs: 30, sm: 33 } } }}>
            <SectionEyebrow align="center">{t('eyebrow')}</SectionEyebrow>
          </Box>
          <Typography
            variant="headline"
            sx={{
              color: 'text.heading',
              mt: { xs: '16.5px', sm: 2, lg: '17px' },
              fontSize: { xs: 20, sm: 26, md: 28 },
              // Figma mobile: the title breaks after "knowledge"
              maxWidth: { xs: 300, sm: 'none' },
            }}
          >
            {t.rich('title', {
              accent: (chunks) => (
                <Box component="span" sx={{ color: 'secondary.main', fontWeight: 800, letterSpacing: 0 }}>
                  {chunks}
                </Box>
              ),
            })}
          </Typography>
          <Typography
            variant="sectionIntro"
            sx={{
              color: 'text.heading',
              maxWidth: { xs: 335, sm: 700 },
              mt: { xs: '15px', sm: 2, lg: '16px' },
              fontSize: { xs: 12, sm: 14 },
              lineHeight: { xs: '17px', sm: '20px' },
              fontWeight: 400,
            }}
          >
            {t.rich('description', {
              br: () => <Box component="br" sx={{ display: { xs: 'none', md: 'inline' } }} />,
            })}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: { xs: '16px', sm: '18px' }, width: { xs: '100%', sm: 'auto' }, maxWidth: { xs: 335, sm: 'none' }, mt: { xs: '16px', sm: 3, lg: '15px' } }}>
            <ActionButton href="/building-blocks" tone="primary" sx={buttonSx}>
              {t('explore')}
            </ActionButton>
            <ActionButton href="/community" tone="secondary" sx={buttonSx}>
              {t('join')}
            </ActionButton>
          </Box>
        </Box>
      </SiteContainer>
    </Box>
  );
}
