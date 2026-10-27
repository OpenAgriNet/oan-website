import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getTranslations } from 'next-intl/server';
import SiteContainer from '@/components/layout/SiteContainer';

export default async function BuildingBlocksOverview() {
  const t = await getTranslations('BuildingBlocks.overview');

  return (
    <Box component="section" sx={{ bgcolor: 'background.subtle', py: 5 }}>
      <SiteContainer sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textAlign: 'center' }}>
        <Typography variant="sectionTitle" sx={{ color: 'primary.main', fontWeight: 700, fontSize: { xs: 24, sm: 28 } }}>
          {t('title')}
        </Typography>
        <Typography sx={{ maxWidth: 752, fontSize: 16, lineHeight: 1.4, color: 'text.heading' }}>
          {t('description')}
        </Typography>
      </SiteContainer>
    </Box>
  );
}
