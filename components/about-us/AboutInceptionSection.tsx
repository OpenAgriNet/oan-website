import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import SectionEyebrow from '@/components/common/SectionEyebrow';
import SiteContainer from '@/components/layout/SiteContainer';

const paragraphs = ['p1', 'p2', 'p3'] as const;

export default async function AboutInceptionSection() {
  const t = await getTranslations('AboutUs.inception');

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: 'background.default', overflow: 'hidden', minHeight: { lg: 398 } }}>
      <Box aria-hidden sx={{ position: 'absolute', inset: 0 }}>
        <Image
          src="/images/about-us/inception-bg.png"
          alt=""
          fill
          sizes="(min-width: 1440px) 1440px, 100vw"
          style={{ objectFit: 'cover', objectPosition: 'left bottom' }}
        />
      </Box>
      <SiteContainer
        sx={{
          position: 'relative',
          pt: { xs: 5, md: '64px', lg: '79px' },
          pb: { xs: 5, md: '64px', lg: '93px' },
          px: { lg: '180px' },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          alignItems: 'center',
          columnGap: { md: 6, lg: '130px' },
          rowGap: { xs: 3, md: 0 },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
          <SectionEyebrow>{t('eyebrow')}</SectionEyebrow>
          <Typography
            variant="headline"
            component="h2"
            sx={{ color: 'text.heading', fontWeight: 800, fontSize: { xs: 22, sm: 26, md: 28 }, lineHeight: { md: '34px' } }}
          >
            {t.rich('title', {
              br: () => <Box component="br" sx={{ display: { xs: 'none', md: 'inline' } }} />,
            })}
          </Typography>
          <Typography variant="blockBody" sx={{ color: 'text.heading', lineHeight: '20px' }}>
            {t('description')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {paragraphs.map((key) => (
            <Typography key={key} variant="blockBody" sx={{ color: 'text.heading', lineHeight: '20px' }}>
              {t(key)}
            </Typography>
          ))}
        </Box>
      </SiteContainer>
    </Box>
  );
}
