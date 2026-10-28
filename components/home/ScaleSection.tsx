import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getTranslations } from 'next-intl/server';
import IconBadge from '@/components/common/IconBadge';
import SectionEyebrow from '@/components/common/SectionEyebrow';
import StatCard from '@/components/common/StatCard';
import SiteContainer from '@/components/layout/SiteContainer';

const stats = ['farmers', 'people', 'market'] as const;

export default async function ScaleSection() {
  const t = await getTranslations('Home.scale');

  return (
    <Box component="section" sx={{ bgcolor: 'background.default' }}>
      <SiteContainer
        sx={{
          px: { xs: '20px', sm: 4, md: 5, lg: 10 },
          pt: { xs: '32px', sm: 6, lg: '82px' },
          pb: { xs: '32px', sm: 6, lg: '75px' },
        }}
      >
        <Box sx={{ maxWidth: 1017, mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Figma mobile: 11px eyebrow */}
          <Box sx={{ '& .MuiTypography-root': { fontSize: { xs: 11, sm: 14 } }, '& > div': { height: { xs: 30, sm: 33 } } }}>
            <SectionEyebrow align="center">{t('eyebrow')}</SectionEyebrow>
          </Box>
          <Typography
            variant="headline"
            sx={{
              color: 'text.primary',
              textAlign: 'center',
              maxWidth: { xs: 335, sm: 'none' },
              mt: { xs: '7.5px', sm: 2, lg: '8px' },
              fontSize: { xs: 20, sm: 26, md: 28 },
              letterSpacing: { xs: '0.3px', sm: '0.56px' },
            }}
          >
            {t.rich('title', {
              br: () => <Box component="br" sx={{ display: { xs: 'none', md: 'inline' } }} />,
            })}
          </Typography>
          <Box
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 2,
              mt: { xs: '23.5px', sm: 3, lg: '25px' },
            }}
          >
            {stats.map((key) => (
              <StatCard key={key} value={t(`stats.${key}.value`)} label={t(`stats.${key}.label`)} />
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              // Figma mobile: left-aligned row, 6px wider than the column so the fact stays on one line
              justifyContent: { xs: 'flex-start', sm: 'center' },
              alignSelf: { xs: 'flex-start', sm: 'auto' },
              width: { xs: 'calc(100% + 6px)', sm: 'auto' },
              gap: '9px',
              mt: '13px',
              textAlign: 'left',
            }}
          >
            <IconBadge size={32} sx={{ width: { xs: 24, sm: 32 }, height: { xs: 24, sm: 32 } }}>
              <Box
                sx={{
                  width: { xs: 12, sm: 16 },
                  height: { xs: 12, sm: 16 },
                  bgcolor: 'primary.main',
                  maskImage: 'url(/icons/blocks/sprout.svg)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                }}
              />
            </IconBadge>
            <Typography
              component="p"
              variant="factText"
              sx={{
                color: 'text.heading',
                pt: { lg: '2px' },
                position: 'relative',
                top: { xs: '3px', sm: 0 },
                fontSize: { xs: 12, sm: 18 },
                lineHeight: { xs: '18px', sm: '26px' },
              }}
            >
              {t.rich('fact', {
                lead: (chunks) => (
                  <Typography component="span" variant="factLead" sx={{ color: 'primary.main', fontSize: { xs: 14, sm: 20 }, lineHeight: { xs: '18px', sm: '26px' } }}>
                    {chunks}
                  </Typography>
                ),
              })}
            </Typography>
          </Box>
        </Box>
      </SiteContainer>
    </Box>
  );
}
