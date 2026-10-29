import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import SectionEyebrow from '@/components/common/SectionEyebrow';
import SiteContainer from '@/components/layout/SiteContainer';

// Figma mobile: 12px copy; 140% rounds to 17px in Figma's 51px paragraph frames
const descriptionSx = { color: 'text.heading', fontSize: { xs: 12, sm: 14 }, lineHeight: { xs: '17px', sm: '20px' } };

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
          pt: { xs: '24px', sm: 5, md: '64px', lg: '79px' },
          pb: { xs: '32px', sm: 5, md: '64px', lg: '93px' },
          px: { xs: '20px', sm: 4, md: 5, lg: '180px' },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          alignItems: 'center',
          columnGap: { md: 6, lg: '130px' },
          rowGap: { xs: '16px', sm: 3, md: 0 },
        }}
      >
        <Box sx={{ maxWidth: { xs: 335, sm: 'none' }, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
          {/* Figma mobile: 12px eyebrow in a 30px box */}
          <Box sx={{ '& .MuiTypography-root': { fontSize: { xs: 12, sm: 14 } }, '& > div': { height: { xs: 30, sm: 33 } } }}>
            <SectionEyebrow>{t('eyebrow')}</SectionEyebrow>
          </Box>
          <Typography
            variant="headline"
            component="h2"
            sx={{ color: 'text.heading', fontWeight: 800,
              fontSize: { xs: 20, sm: 26, md: 28 },
              lineHeight: { md: '34px' },
              letterSpacing: { xs: '0.4px', sm: '0.56px' },
            }}
          >
            {t.rich('title', {
              br: () => <Box component="br" sx={{ display: { xs: 'inline', sm: 'none', md: 'inline' } }} />,
            })}
          </Typography>
          <Typography variant="blockBody" sx={descriptionSx}>
            {t('description')}
          </Typography>
        </Box>
        <Box sx={{ maxWidth: { xs: 335, sm: 'none' }, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {paragraphs.map((key) => (
            <Typography key={key} variant="blockBody" sx={descriptionSx}>
              {t(key)}
            </Typography>
          ))}
        </Box>
      </SiteContainer>
    </Box>
  );
}
