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
        sx={{
          px: { xs: '20px', sm: 4, md: 5, lg: 10 },
          pt: { xs: '32px', sm: 5, lg: '60px' },
          pb: { xs: '22px', sm: 5, lg: '60px' },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '24px', sm: 4, lg: '40px' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: { xs: 3, lg: 2 } }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: { xs: '16px', sm: 3 } }}>
            {/* Figma mobile: 11px eyebrow in a 30px box */}
            <Box sx={{ '& .MuiTypography-root': { fontSize: { xs: 11, sm: 14 } }, '& > div': { height: { xs: 30, sm: 33 } } }}>
              <SectionEyebrow>{t('eyebrow')}</SectionEyebrow>
            </Box>
            <Typography
              variant="headline"
              sx={{
                color: 'text.heading',
                fontSize: { xs: 20, sm: 24, md: 28 },
                // Figma mobile: letter spacing is 2% of the font size
                letterSpacing: { xs: '0.4px', sm: '0.56px' },
              }}
            >
              {t.rich('title', {
                br: () => <br />,
              })}
            </Typography>
          </Box>
          <Typography
            variant="blockBody"
            sx={{
              color: 'text.heading',
              lineHeight: { xs: '17px', sm: 1.4 },
              fontSize: { xs: 12, sm: 14 },
              width: { lg: 603 },
              maxWidth: { xs: 335, sm: 'none' },
              flexShrink: 0,
            }}
          >
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
          <ActionButton
            href="#"
            sx={{
              px: '22px',
              fontWeight: 700,
              // Figma mobile: full-width 42px button with a 12px label
              width: { xs: '100%', sm: 'auto' },
              minHeight: { xs: 42, sm: 52 },
              fontSize: { xs: 12, sm: 14 },
            }}
          >
            {t('viewAll')}
          </ActionButton>
        </Box>
      </SiteContainer>
    </Box>
  );
}
