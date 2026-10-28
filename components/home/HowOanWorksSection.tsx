import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import ScrollCue from '@/components/common/ScrollCue';
import SectionEyebrow from '@/components/common/SectionEyebrow';
import { BUILDING_BLOCKS_ID } from './sectionIds';

export default async function HowOanWorksSection() {
  const t = await getTranslations('Home.how');
  const tNav = await getTranslations('Nav');

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: 'background.subtle', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'relative',
          maxWidth: 1440,
          minHeight: { lg: 549 },
          mx: 'auto',
          px: { xs: '20px', sm: 4, md: 5, lg: 0 },
          pt: { xs: '21px', sm: 6, lg: '1px' },
          pb: { xs: '30px', sm: 4, lg: 0 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: { xs: '16px', sm: 4, md: 5 },
            pl: { lg: '112px' },
            pr: { lg: '104px' },
          }}
        >
          <Box sx={{ position: 'relative', top: { lg: 1 }, maxWidth: { xs: 335, sm: 573 }, display: 'flex', flexDirection: 'column', gap: 2, textAlign: { xs: 'center', sm: 'left' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '17px', sm: 3 } }}>
              {/* Figma mobile: centered 11px eyebrow */}
              <Box sx={{ '& .MuiTypography-root': { fontSize: { xs: 11, sm: 14 } }, '& > div': { height: { xs: 30, sm: 33 } } }}>
                <SectionEyebrow align={{ xs: 'center', sm: 'left' }}>{t('eyebrow')}</SectionEyebrow>
              </Box>
              <Typography
                variant="sectionHeading"
                sx={{
                  color: { xs: 'text.heading', sm: 'primary.main' },
                  fontSize: { xs: 24, sm: 30, md: 34 },
                  fontWeight: { xs: 600, sm: 700 },
                  letterSpacing: '0.5px',
                }}
              >
                {t.rich('title', {
                  accent: (chunks) => (
                    <Box component="span" sx={{ display: 'block', color: 'secondary.main', fontWeight: 800, letterSpacing: '0.2px' }}>
                      {chunks}
                    </Box>
                  ),
                })}
              </Typography>
            </Box>
            <Typography variant="sectionLead" sx={{
                color: 'text.heading',
                position: 'relative',
                top: { lg: 1 },
                fontSize: { xs: 12, sm: 16 },
                lineHeight: { xs: '17px', sm: '22px' },
              }}>
              {t.rich('description', {
                br: () => <Box component="br" sx={{ display: { xs: 'none', lg: 'inline' } }} />,
              })}
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'relative',
              flexShrink: 0,
              width: { xs: '103%', sm: '100%', md: 'min(46%, 563px)', lg: 563 },
              maxWidth: 563,
              aspectRatio: '1374 / 1145',
              alignSelf: { xs: 'center', md: 'auto' },
              order: { xs: -1, sm: 0 },
            }}
          >
            <Image
              src="/images/home/how-oan-works.png"
              alt={t('imageAlt')}
              fill
              sizes="(min-width: 1360px) 563px, (min-width: 900px) 46vw, 100vw"
              style={{ objectFit: 'cover', mixBlendMode: 'multiply' }}
            />
            <Box sx={{ position: 'absolute', left: '47.96%', top: '47.7%', width: '11.37%' }}>
              <Image
                src="/images/oan-logo.png"
                alt={tNav('brand')}
                width={95}
                height={56}
                sizes="64px"
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            position: { lg: 'absolute' },
            left: { lg: '50%' },
            bottom: { lg: 16 },
            transform: { lg: 'translateX(-50%)' },
            display: 'flex',
            justifyContent: 'center',
            mt: { xs: '25px', sm: 4, lg: 0 },
          }}
        >
          <ScrollCue label={t('cue')} ariaLabel={t('cueAria')} targetId={BUILDING_BLOCKS_ID} />
        </Box>
      </Box>
    </Box>
  );
}
