import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getTranslations } from 'next-intl/server';
import SiteContainer from '@/components/layout/SiteContainer';

export default async function BuildingBlocksOverview() {
  const t = await getTranslations('BuildingBlocks.overview');

  return (
    <Box component="section" sx={{ bgcolor: 'background.subtle', py: { xs: '24px', sm: 5 } }}>
      <SiteContainer
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: { xs: 2, sm: 3 }, textAlign: 'center', px: { xs: '20px', sm: 4, md: 5, lg: 10 } }}
      >
        <Typography
          variant="sectionTitle"
          sx={{ color: 'primary.main', fontWeight: 700, fontSize: { xs: 20, sm: 28 }, letterSpacing: { xs: '0.4px', sm: '0.56px' } }}
        >
          {t('title')}
        </Typography>
        <Typography sx={{ maxWidth: 752, fontSize: { xs: 12, sm: 16 }, lineHeight: 1.4, color: 'text.heading' }}>
          {t('description')}
        </Typography>
      </SiteContainer>
    </Box>
  );
}
