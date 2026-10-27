import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import ActionButton from '@/components/common/ActionButton';
import SectionEyebrow from '@/components/common/SectionEyebrow';
import SiteContainer from '@/components/layout/SiteContainer';

const dir = '/images/about-us/partners';

const groups = [
  {
    key: 'institutions',
    logos: [
      { key: 'ekstep', width: 111.91, height: 45.1 },
      { key: 'fide', width: 131, height: 46.63 },
      { key: 'coss', width: 75.5, height: 81.87 },
      { key: 'ondc', width: 124.5, height: 59.25 },
      { key: 'cdpi', width: 155, height: 48.15 },
    ],
  },
  {
    key: 'research',
    logos: [
      { key: 'cgiar', width: 74.75, height: 88.57 },
      { key: 'irri', width: 130.75, height: 55.9 },
      { key: 'kalro', width: 133.25, height: 65.28 },
      { key: 'digitalIndia', file: 'digital-india', width: 169.19, height: 81.21 },
      { key: 'iffcoKisan', file: 'iffco-kissan', width: 129, height: 54 },
    ],
  },
] as const;

export default async function AboutPartnersSection() {
  const t = await getTranslations('AboutUs.partners');

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: 'background.default', overflow: 'hidden' }}>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: { xs: 0, lg: '10px' },
          left: { xs: 0, lg: '-12.78%' },
          width: { xs: '100%', lg: '136.94%' },
          height: { xs: '100%', lg: 'auto' },
          aspectRatio: { lg: '1672 / 941' },
        }}
      >
        <Image
          src="/images/about-us/partners-bg.png"
          alt=""
          fill
          sizes="(min-width: 1440px) 1972px, 100vw"
          style={{ objectFit: 'cover', objectPosition: 'left top' }}
        />
      </Box>
      <SiteContainer
        sx={{
          position: 'relative',
          pt: { xs: 5, lg: '54px' },
          pb: { xs: 5, lg: '58px' },
          pl: { lg: '82px' },
          pr: { lg: '99px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, lg: '40px' },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 683, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px' }}>
          <SectionEyebrow align="center">{t('eyebrow')}</SectionEyebrow>
          <Typography
            variant="headline"
            component="h2"
            sx={{ color: 'text.heading', fontWeight: 800, fontSize: { xs: 22, sm: 26, md: 28 }, lineHeight: { md: '34px' } }}
          >
            {t.rich('title', {
              accent: (chunks) => (
                <Box component="span" sx={{ color: 'secondary.main' }}>
                  {chunks}
                </Box>
              ),
            })}
          </Typography>
          <Typography variant="blockBody" sx={{ color: 'common.black', lineHeight: '20px' }}>
            {t('description')}
          </Typography>
        </Box>
        {groups.map(({ key, logos }) => (
          <Box key={key} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="cardTitle" component="h3" sx={{ color: 'text.heading', lineHeight: '19px' }}>
              {t(`groups.${key}`)}
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                m: 0,
                p: 0,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: { xs: 2, md: 3, lg: '30px' },
              }}
            >
              {logos.map((logo) => (
                <Box
                  component="li"
                  key={logo.key}
                  sx={{
                    width: { xs: 'calc(50% - 8px)', md: 'calc(33.333% - 16px)', lg: 'calc(20% - 24px)' },
                    minHeight: 120,
                    height: { lg: 120 },
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    border: '1px solid',
                    borderColor: 'card.border',
                    borderRadius: '12px 0',
                    bgcolor: 'background.paper',
                    boxShadow: '0 4px 24px var(--mui-palette-card-shadow)',
                  }}
                >
                  <Image
                    src={`${dir}/${'file' in logo ? logo.file : logo.key}.png`}
                    alt={t(`logos.${logo.key}`)}
                    width={logo.width}
                    height={logo.height}
                    sizes="170px"
                    style={{ width: logo.width, maxWidth: '100%', height: 'auto' }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        ))}
        <ActionButton href="#" sx={{ px: '22px', fontWeight: 700, lineHeight: '20px', minWidth: 200 }}>
          {t('cta')}
        </ActionButton>
      </SiteContainer>
    </Box>
  );
}
