import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getTranslations } from 'next-intl/server';
import ActionButton from '@/components/common/ActionButton';
import SectionEyebrow from '@/components/common/SectionEyebrow';
import SiteContainer from '@/components/layout/SiteContainer';
import ResourceCard from './ResourceCard';

const items = [
  { key: 'whitepapers', icon: '/icons/resources/file-text.svg' },
  { key: 'policy', icon: '/icons/resources/film.svg' },
  { key: 'playbooks', icon: '/icons/resources/folder.svg' },
  { key: 'technical', icon: '/icons/resources/flag.svg' },
  { key: 'reference', icon: '/icons/resources/folder-plus.svg' },
  { key: 'caseStudies', icon: '/icons/resources/hexagon.svg' },
] as const;

export default async function ExploreResourcesSection() {
  const t = await getTranslations('Resources.explore');

  return (
    <Box component="section" sx={{ bgcolor: 'background.default' }}>
      <SiteContainer
        sx={{ py: { xs: 5, lg: '60px' }, display: 'flex', flexDirection: 'column', gap: { xs: 4, lg: '40px' } }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: { xs: 3, lg: 2 } }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
            <SectionEyebrow>{t('eyebrow')}</SectionEyebrow>
            <Typography variant="headline" sx={{ color: 'text.heading', fontSize: { xs: 24, md: 28 } }}>
              {t.rich('title', {
                br: () => <Box component="br" sx={{ display: { xs: 'none', sm: 'inline' } }} />,
              })}
            </Typography>
          </Box>
          <Typography variant="blockBody" sx={{ color: 'text.heading', lineHeight: 1.4, width: { lg: 603 }, flexShrink: 0 }}>
            {t('description')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Box
            sx={{
              width: '100%',
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            }}
          >
            {items.map(({ key, icon }) => (
              <ResourceCard
                key={key}
                icon={icon}
                title={t(`items.${key}.title`)}
                description={t(`items.${key}.description`)}
                href="#"
                exploreAriaLabel={t('exploreAria', { title: t(`items.${key}.title`) })}
              />
            ))}
          </Box>
          <ActionButton href="#" sx={{ px: '22px', fontWeight: 700 }}>
            {t('viewAll')}
          </ActionButton>
        </Box>
      </SiteContainer>
    </Box>
  );
}
