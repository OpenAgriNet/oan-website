import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import ActionButton from '@/components/common/ActionButton';
import SectionEyebrow from '@/components/common/SectionEyebrow';
import EventCard from './EventCard';

type Props = {
  section: 'upcoming' | 'past';
  items: readonly { key: string; image: string }[];
  background?: string;
  // Figma spacing above and below the content at desktop width
  pt: number;
  pb: number;
  // Figma spacing above and below the content on mobile
  mobilePt: number;
  mobilePb: number;
};

// Mobile Figma: a full-width, smaller button with no hover arrow
const mobileButton = {
  width: { xs: '100%', sm: 'auto' },
  minHeight: { xs: 42, sm: 52 },
  fontSize: { xs: 12, sm: 14 },
  '& .arrow': { display: { xs: 'none', sm: 'block' } },
};

// Three cards and the side-by-side header need about 1100px; below that they wrap
const wide = '@media (min-width: 1100px)';

export default async function EventsSection({ section, items, background, pt, pb, mobilePt, mobilePb }: Props) {
  const t = await getTranslations(`Events.${section}`);

  return (
    <Box component="section" sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* The mobile design has no section background */}
      {background && (
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Image src={background} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </Box>
      )}
      <Box sx={{ position: 'relative', maxWidth: 1440, mx: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 3, sm: 4, lg: '36px' },
            px: { xs: '20px', sm: 4, md: 5, lg: 0 },
            pt: { xs: `${mobilePt}px`, sm: 6, lg: `${pt}px` },
            pb: { xs: `${mobilePb}px`, sm: 6, lg: `${pb}px` },
            // At 1440px the cards span x=79 to 1372 and the header x=85.5 to 1365.5, as in Figma
            width: { lg: 1293 },
            ml: { lg: 'calc(50% - 641px)' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              px: { lg: '6.5px' },
              [wide]: { flexDirection: 'row', alignItems: 'center', gap: 2, minHeight: 91 },
            }}
          >
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
              <Box sx={{ '& .MuiTypography-root': { fontSize: { xs: 12, sm: 14 } }, '& > div': { height: { xs: 30, sm: 33 } } }}>
                <SectionEyebrow>{t('eyebrow')}</SectionEyebrow>
              </Box>
              <Typography
                variant="headline"
                sx={{ color: 'text.heading', fontSize: { xs: 20, sm: 28 }, letterSpacing: { xs: '0.4px', sm: '0.56px' } }}
              >
                {t('title')}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: 12, sm: 14 },
                lineHeight: 1.4,
                color: 'text.heading',
                [wide]: { flex: '0 1 603px' },
                // Figma's forced line break only applies at the designed width
                whiteSpace: { xs: 'normal', lg: 'pre-line' },
              }}
            >
              {t('description')}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
              gap: { xs: 3, sm: '30px' },
              [wide]: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
            }}
          >
            {items.map((item) => (
              <EventCard
                key={item.key}
                image={item.image}
                imageAlt={t(`items.${item.key}.imageAlt`)}
                type={t(`items.${item.key}.type`)}
                date={t(`items.${item.key}.date`)}
                title={t(`items.${item.key}.title`)}
                description={t(`items.${item.key}.description`)}
                tag={t(`items.${item.key}.tag`)}
                linkLabel={t('linkLabel')}
              />
            ))}
          </Box>
          <ActionButton sx={{ alignSelf: 'center', ...mobileButton }}>{t('action')}</ActionButton>
        </Box>
      </Box>
    </Box>
  );
}
