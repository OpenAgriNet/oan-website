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
      <SiteContainer sx={{ pt: { xs: 6, lg: '82px' }, pb: { xs: 6, lg: '75px' } }}>
        <Box sx={{ maxWidth: 1017, mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SectionEyebrow align="center">{t('eyebrow')}</SectionEyebrow>
          <Typography
            variant="headline"
            sx={{ color: 'text.primary', textAlign: 'center', mt: { xs: 2, lg: '8px' }, fontSize: { xs: 22, sm: 26, md: 28 } }}
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
              mt: { xs: 3, lg: '25px' },
            }}
          >
            {stats.map((key) => (
              <StatCard key={key} value={t(`stats.${key}.value`)} label={t(`stats.${key}.label`)} />
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px', mt: '13px', textAlign: 'left' }}>
            <IconBadge size={32}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  bgcolor: 'primary.main',
                  maskImage: 'url(/icons/blocks/sprout.svg)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                }}
              />
            </IconBadge>
            <Typography component="p" variant="factText" sx={{ color: 'text.heading', pt: { lg: '2px' } }}>
              {t.rich('fact', {
                lead: (chunks) => (
                  <Typography component="span" variant="factLead" sx={{ color: 'primary.main' }}>
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
