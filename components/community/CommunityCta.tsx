import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import ActionButton from '@/components/common/ActionButton';
import SectionEyebrow from '@/components/common/SectionEyebrow';
import SiteContainer from '@/components/layout/SiteContainer';

export default async function CommunityCta() {
  const t = await getTranslations('Community.cta');

  return (
    <Box component="section" sx={{ position: 'relative', overflow: 'hidden', bgcolor: 'background.paper', mb: { lg: '25px' } }}>
      {/* Anchored to the bottom so the hills stay whole when wider screens crop the sky */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Image
          src="/images/community-cta-bg.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center bottom' }}
        />
      </Box>
      {/* Mobile Figma: three layers, each stretched to the frame exactly as in the design */}
      <Box aria-hidden sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Image src="/images/home/explore-cta-bg.png" alt="" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.5 }} />
        <Box sx={{ position: 'absolute', left: '-33.71%', top: '36.6%', width: '133.6%', height: '70.31%' }}>
          <Image src="/images/building-blocks-cta-illustration.png" alt="" fill sizes="134vw" />
        </Box>
        <Box sx={{ position: 'absolute', left: '-45%', top: 0, width: '190%', height: '118.64%' }}>
          <Image src="/images/about-us/cta-bg.png" alt="" fill sizes="190vw" />
        </Box>
      </Box>
      <SiteContainer
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          minHeight: { xs: 278, sm: 0, md: 409 },
          px: { xs: '20px', sm: 4, md: 5, lg: 10 },
          pt: { xs: '20px', sm: 6, md: '70px' },
          pb: { xs: '40px', sm: 6, md: '70px' },
          textAlign: 'center',
        }}
      >
        <Box sx={{ '& .MuiTypography-root': { fontSize: { xs: 11, sm: 14 } }, '& > div': { height: { xs: 29, sm: 33 } } }}>
          <SectionEyebrow align="center">{t('eyebrow')}</SectionEyebrow>
        </Box>
        <Typography
          variant="headline"
          sx={{ color: 'text.heading', fontSize: { xs: 20, sm: 26, md: 28 }, letterSpacing: { xs: '0.4px', sm: '0.56px' } }}
        >
          {t('titleStart')}
          <Box component="span" sx={{ color: 'secondary.main', fontWeight: 800 }}>
            {t('titleAccent')}
          </Box>
        </Typography>
        <Typography sx={{ maxWidth: 676, fontSize: { xs: 12, sm: 14 }, lineHeight: 1.4, color: 'text.heading' }}>
          {t('description')}
        </Typography>
        <ActionButton sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>{t('action')}</ActionButton>
        {/* Mobile Figma: a full-width orange button */}
        <ActionButton
          tone="secondary"
          sx={{ display: { xs: 'inline-flex', sm: 'none' }, width: '100%', minHeight: 42, fontSize: 12, '& .arrow': { display: 'none' } }}
        >
          {t('action')}
        </ActionButton>
      </SiteContainer>
    </Box>
  );
}
