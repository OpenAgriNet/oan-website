import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import ActionButton from '@/components/common/ActionButton';
import SiteContainer from '@/components/layout/SiteContainer';

export default async function AboutCtaSection() {
  const t = await getTranslations('AboutUs.cta');

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        minHeight: { lg: 409 },
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
          inset: { xs: 0, lg: '-12.5% auto auto -2.35%' },
          width: { lg: '103.1%' },
          height: { lg: '136.2%' },
          '& img': { objectFit: { xs: 'cover', lg: 'fill' }, objectPosition: { xs: '75% 45%', lg: 'center' } },
        }}
      >
        <Image src="/images/about-us/cta-bg.png" alt="" fill sizes="100vw" />
      </Box>
      <SiteContainer sx={{ position: 'relative', py: { xs: 6, lg: '70px' } }}>
        <Box
          sx={{
            maxWidth: 610,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 3,
          }}
        >
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
          <Typography variant="blockBody" sx={{ color: 'text.heading', lineHeight: '20px' }}>
            {t('description')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              gap: 2,
              width: { xs: '100%', sm: 'auto' },
              maxWidth: { xs: 320, sm: 'none' },
            }}
          >
            <ActionButton
              href="/building-blocks"
              tone="primary"
              sx={{ px: '22px', fontWeight: 700, lineHeight: '20px', minWidth: { sm: 223 } }}
            >
              {t('explore')}
            </ActionButton>
            <ActionButton
              href="/community"
              tone="secondary"
              sx={{ px: '22px', fontWeight: 700, lineHeight: '20px', minWidth: { sm: 198 } }}
            >
              {t('join')}
            </ActionButton>
          </Box>
        </Box>
      </SiteContainer>
    </Box>
  );
}
