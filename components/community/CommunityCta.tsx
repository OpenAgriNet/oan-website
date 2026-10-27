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
      <Image
        src="/images/community-cta-bg.png"
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center bottom' }}
      />
      <SiteContainer
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          minHeight: { md: 409 },
          py: { xs: 6, md: '70px' },
          textAlign: 'center',
        }}
      >
        <SectionEyebrow align="center">{t('eyebrow')}</SectionEyebrow>
        <Typography variant="headline" sx={{ color: 'text.heading', fontSize: { xs: 22, sm: 26, md: 28 } }}>
          {t('titleStart')}
          <Box component="span" sx={{ color: 'secondary.main', fontWeight: 800 }}>
            {t('titleAccent')}
          </Box>
        </Typography>
        <Typography sx={{ maxWidth: 676, fontSize: 14, lineHeight: 1.4, color: 'text.heading' }}>
          {t('description')}
        </Typography>
        <ActionButton>{t('action')}</ActionButton>
      </SiteContainer>
    </Box>
  );
}
