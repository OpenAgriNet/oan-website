import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import SectionEyebrow from '@/components/common/SectionEyebrow';
import SiteContainer from '@/components/layout/SiteContainer';

const dir = '/images/community/gallery';

// Figma 1440: one large photo (409x346) spanning two rows, four smaller photos (255x160) beside it
const photos = [
  { key: 'one', file: 'gallery-01.png', area: 'a' },
  { key: 'two', file: 'gallery-02.png', area: 'b' },
  { key: 'three', file: 'gallery-03.png', area: 'c' },
  { key: 'four', file: 'gallery-04.png', area: 'd' },
  { key: 'five', file: 'gallery-05.png', area: 'e' },
] as const;

export default async function GallerySection() {
  const t = await getTranslations('Community.gallery');

  return (
    <Box component="section" sx={{ bgcolor: 'background.section' }}>
      <SiteContainer
        sx={{
          px: { xs: '20px', sm: 4, md: 5 },
          // Figma 1440: 80px left, 72px right, 72px top and bottom (491px section)
          pl: { lg: '81px' },
          pr: { lg: '72px' },
          py: { xs: '32px', sm: 6, lg: '72px' },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
          gap: { xs: '20px', sm: 4, md: 4, lg: '30px' },
        }}
      >
        <Box sx={{ flex: { md: '0 0 30%', lg: '0 0 299px' }, textAlign: { xs: 'center', md: 'left' }, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Figma mobile: centred eyebrow with underline; from sm a plain left-aligned label */}
          <Box sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiTypography-root': { fontSize: 14 }, '& > div': { height: 33 } }}>
            <SectionEyebrow align="center">{t('eyebrow')}</SectionEyebrow>
          </Box>
          <Typography variant="eyebrow" sx={{ display: { xs: 'none', sm: 'block' }, color: 'primary.main', fontSize: 14 }}>
            {t('eyebrow')}
          </Typography>
          <Typography
            variant="sectionTitle"
            component="h2"
            sx={{ color: 'text.heading', fontWeight: 800, fontSize: { xs: 20, sm: 28 }, lineHeight: { xs: '26px', sm: '34px' }, letterSpacing: { xs: '0.4px', sm: '0.56px' } }}
          >
            {t('title')}
          </Typography>
          <Typography
            variant="blockBody"
            sx={{ color: 'text.body', fontSize: 14, lineHeight: '19.6px' }}
          >
            {t('description')}
          </Typography>
        </Box>
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            flex: 1,
            minWidth: 0,
            // Figma mobile: the photo column is 338px inside a 335px text column
            width: { xs: 'calc(100% + 3px)', sm: 'auto' },
            alignSelf: { xs: 'flex-start', sm: 'auto' },
            display: 'grid',
            gap: { xs: '16px', lg: '25px 20px' },
            // Mobile: five photos stacked; sm: large photo on top, four small ones in a 2x2 grid; from md the Figma layout
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1.6fr 1fr 1fr', lg: '410fr 254fr 254fr' },
            gridTemplateAreas: { xs: '"a" "b" "c" "d" "e"', sm: '"a a" "b c" "d e"', md: '"a b c" "a d e"' },
            aspectRatio: { md: '958 / 347' },
          }}
        >
          {photos.map(({ key, file, area }) => (
            <Box
              component="li"
              key={key}
              sx={{
                gridArea: area,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
                // Figma mobile: five full-width photos stacked (338x256 large, 338x161 for the rest)
                aspectRatio: { xs: area === 'a' ? '338 / 256' : '338 / 161', sm: area === 'a' ? '409 / 346' : '255 / 160', md: 'auto' },
                minHeight: 0,
              }}
            >
              <Image
                src={`${dir}/${file}`}
                alt={t(`images.${key}`)}
                fill
                sizes={area === 'a' ? '(min-width: 900px) 409px, 100vw' : '(min-width: 900px) 255px, 50vw'}
                style={{ objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Box>
      </SiteContainer>
    </Box>
  );
}
