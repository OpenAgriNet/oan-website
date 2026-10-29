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
  px: { xs: '3px', sm: '22px' },
  fontWeight: 700,
  minHeight: { xs: 42, sm: 52 },
  fontSize: { xs: 12, sm: 14 },
  whiteSpace: { xs: 'normal', sm: 'nowrap' },
  lineHeight: { xs: 1.2, sm: '20px' },
};

export default async function AboutCtaSection() {
  const t = await getTranslations('AboutUs.cta');

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        minHeight: { xs: 338, sm: 'auto', lg: 409 },
        display: 'flex',
        alignItems: 'center',
        mb: { lg: '32px' },
      }}
    >
      {/* From lg Figma stretches the illustration to 1485x557 (103.1% x 136.2%) and offsets it -34px / -51px */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          // Figma mobile: the three hills are centred on the section (green hill at 50%) and the farmland peeks in on the right; 340px tall, 50px down
          top: { xs: '50px', sm: 0, lg: '-12.5%' },
          left: { xs: '-46.4%', sm: 0, lg: '-2.35%' },
          right: { xs: 'auto', sm: 0, lg: 'auto' },
          bottom: { xs: 'auto', sm: 0, lg: 'auto' },
          width: { xs: '193.6%', sm: 'auto', lg: '103.1%' },
          height: { xs: 340, sm: 'auto', lg: '136.2%' },
          maskImage: { xs: 'linear-gradient(to bottom, transparent, #000 60px)', sm: 'none' },
          '& img': { objectFit: { xs: 'fill', sm: 'cover', lg: 'fill' }, objectPosition: { xs: 'center', sm: '75% 45%', lg: 'center' } },
        }}
      >
        <Image src="/images/about-us/cta-bg.png" alt="" fill sizes="100vw" />
      </Box>
      <SiteContainer
        sx={{
          position: 'relative',
          px: { xs: '20px', sm: 4, md: 5, lg: 10 },
          pt: { xs: '20px', sm: 6, lg: '70px' },
          pb: { xs: '100px', sm: 6, lg: '70px' },
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: 335, sm: 610 },
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: { xs: '16px', sm: 3 },
          }}
        >
          {/* Figma mobile only: 12px "OpenAgriNet" eyebrow in a 30px box, 14px above the title */}
          <Box
            sx={{
              display: { xs: 'block', sm: 'none' },
              mb: '-2px',
              '& .MuiTypography-root': { fontSize: 12, textTransform: 'none' },
              '& > div': { height: 30 },
            }}
          >
            <SectionEyebrow align="center">{t('eyebrow')}</SectionEyebrow>
          </Box>
          <Typography
            variant="headline"
            component="h2"
            sx={{
              color: 'text.heading',
              fontSize: { xs: 20, sm: 26, md: 28 },
              lineHeight: { md: '34px' },
              letterSpacing: { xs: '0.4px', sm: '0.56px' },
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
          <Typography
            variant="blockBody"
            sx={{ color: 'text.heading', fontSize: { xs: 12, sm: 14 }, lineHeight: { xs: '17px', sm: '20px' } }}
          >
            {t('description')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 2,
              width: { xs: '100%', sm: 'auto' },
              maxWidth: { xs: 335, sm: 'none' },
            }}
          >
            <ActionButton
              href="/building-blocks"
              tone="primary"
              sx={{ ...buttonSx, minWidth: { sm: 223 } }}
            >
              {t('explore')}
            </ActionButton>
            <ActionButton
              href="/community"
              tone="secondary"
              sx={{ ...buttonSx, minWidth: { sm: 198 } }}
            >
              {t('join')}
            </ActionButton>
          </Box>
        </Box>
      </SiteContainer>
    </Box>
  );
}
