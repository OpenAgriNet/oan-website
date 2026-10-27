import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getTranslations } from 'next-intl/server';
import SectionEyebrow from '@/components/common/SectionEyebrow';
import SiteContainer from '@/components/layout/SiteContainer';
import InvolvementTabs, { type InvolvementTab } from './InvolvementTabs';
import { involvementOptions } from './involvementOptions';

export default async function GetInvolvedSection() {
  const t = await getTranslations('Community.involved');

  const tabs: InvolvementTab[] = involvementOptions.map((tab) => ({
    key: tab.key,
    icon: tab.icon,
    title: t(`tabs.${tab.key}.title`),
    summary: t(`tabs.${tab.key}.summary`),
    panel:
      'image' in tab
        ? {
            image: tab.image,
            badge: t(`tabs.${tab.key}.badge`),
            heading: t(`tabs.${tab.key}.heading`),
            description: t(`tabs.${tab.key}.description`),
            ways: t.raw(`tabs.${tab.key}.ways`) as { title: string; description: string }[],
            action: t(`tabs.${tab.key}.action`),
          }
        : undefined,
  }));

  return (
    <Box component="section" sx={{ pt: { xs: 6, lg: '60px' }, pb: { xs: 6, lg: '60px' } }}>
      <SiteContainer sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 4, lg: '43px' } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            maxWidth: 557,
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          <SectionEyebrow align="center">{t('eyebrow')}</SectionEyebrow>
          <Typography
            variant="sectionTitle"
            sx={{ color: 'text.heading', fontWeight: 800, fontSize: { xs: 24, sm: 28 } }}
          >
            {t('titleStart')}
            <Box component="span" sx={{ color: 'secondary.main' }}>
              {t('titleAccent')}
            </Box>
            {t('titleEnd')}
          </Typography>
          <Typography sx={{ fontSize: 14, lineHeight: 1.4, color: 'text.heading' }}>{t('description')}</Typography>
        </Box>
        <InvolvementTabs tabs={tabs} waysTitle={t('waysTitle')} />
      </SiteContainer>
    </Box>
  );
}
