import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getTranslations } from 'next-intl/server';
import FeatureCard from '@/components/common/FeatureCard';
import SiteContainer from '@/components/layout/SiteContainer';

type CardItem = { key: string; icon: string; image: string; imagePosition?: string };

const cards: CardItem[] = [
  { key: 'accessible', image: '/images/home/why-accessible.png', imagePosition: '50% 5%', icon: '/icons/why/list.svg' },
  { key: 'localized', image: '/images/home/why-localized.png', icon: '/icons/why/language.svg' },
  { key: 'timely', image: '/images/home/why-timely.png', icon: '/icons/why/calendar.svg' },
  { key: 'coalition', image: '/images/home/why-coalition.png', icon: '/icons/why/token.svg' },
];

export default async function WhyOanSection() {
  const t = await getTranslations('Home.why');

  return (
    <Box component="section" sx={{ bgcolor: 'background.section' }}>
      <SiteContainer sx={{ pt: { xs: 6, lg: '60px' }, pb: { xs: 6, lg: 7 }, px: { lg: 14 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: { xs: 'flex-start', lg: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            minHeight: { lg: 70 },
            mb: { xs: 3, lg: '31px' },
          }}
        >
          <Typography variant="sectionTitle" sx={{ color: 'text.title', fontSize: { xs: 24, md: 28 } }}>
            {t.rich('title', {
              accent: (chunks) => (
                <Box component="span" sx={{ color: 'secondary.main', fontWeight: 900 }}>
                  {chunks}
                </Box>
              ),
            })}
          </Typography>
          <Typography variant="sectionLead" sx={{ color: 'common.black', width: { lg: 529 }, flexShrink: 0 }}>
            {t.rich('lead', {
              br: () => <Box component="br" sx={{ display: { xs: 'none', lg: 'inline' } }} />,
            })}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: 2,
          }}
        >
          {cards.map((card) => (
            <FeatureCard
              key={card.key}
              icon={card.icon}
              image={card.image}
              imagePosition={card.imagePosition}
              title={t(`cards.${card.key}.title`)}
              description={t(`cards.${card.key}.description`)}
            />
          ))}
        </Box>
      </SiteContainer>
    </Box>
  );
}
