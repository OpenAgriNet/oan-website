import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import SectionEyebrow from '@/components/common/SectionEyebrow';
import GalleryTrack from './GalleryTrack';
import SiteContainer from '@/components/layout/SiteContainer';

// The photos, in display order: path and alt text for each (add new ones to the end of this file)
import photos from '@/content/gallery/photos.json';

// every slide is the same five-photo collage: one large photo (409x346) spanning two rows plus four smaller photos (255x160)
const areas = ['a', 'b', 'c', 'd', 'e'] as const;
const PER_SLIDE = areas.length;

// Photos fill the slides five at a time; a last slide with fewer photos shows only those, in the same collage (the free spots stay empty)
const slides = Array.from({ length: Math.max(1, Math.ceil(photos.length / PER_SLIDE)) }, (_, i) =>
  photos.slice(i * PER_SLIDE, (i + 1) * PER_SLIDE),
);


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
        <GalleryTrack label={t('title')} viewAll={t('viewAll')} previousLabel={t('previous')} nextLabel={t('next')}>
          {slides.map((slide, slideIndex) => {
            // Five photos make the Figma collage; any other count is split into equal tiles
            const collage = slide.length === PER_SLIDE;
            return (
            <Box
              component="ul"
              key={slideIndex}
              sx={{
                listStyle: 'none',
                m: 0,
                p: 0,
                display: 'grid',
                gap: { xs: '16px', lg: '25px 20px' },
                // Mobile: photos stacked; from sm the Figma collage (large photo plus four small ones)
                gridTemplateColumns: collage
                  ? { xs: '1fr', sm: '1.6fr 1fr 1fr', lg: '410fr 254fr 254fr' }
                  : { xs: '1fr', sm: slide.length === 3 ? '1fr 1fr 1fr' : slide.length === 1 ? '1fr' : '1fr 1fr' },
                gridAutoRows: collage ? undefined : { sm: '1fr' },
                gridTemplateAreas: collage ? { xs: '"a" "b" "c" "d" "e"', sm: '"a b c" "a d e"' } : undefined,
                // Tablet and up keep the desktop collage proportions, so every slide has the same height
                aspectRatio: { sm: '958 / 347' },
                // Space between slides when the track scrolls sideways
                pr: { sm: slides.length > 1 ? 2 : 0 },
                boxSizing: 'border-box',
              }}
            >
              {slide.map(({ photo, alt }, i) => {
                const area = areas[i];
                return (
                  <Box
                    component="li"
                    key={photo}
                    sx={{
                      gridArea: collage ? area : undefined,
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '12px',
                      // Figma mobile: five full-width photos stacked (338x256 large, 338x161 for the rest)
                      aspectRatio: { xs: area === 'a' ? '338 / 256' : '338 / 161', sm: 'auto' },
                      minHeight: 0,
                    }}
                  >
                    <Image
                      src={photo}
                      alt={alt}
                      fill
                      sizes={area === 'a' ? '(min-width: 900px) 409px, 100vw' : '(min-width: 900px) 255px, 50vw'}
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                );
              })}
            </Box>
            );
          })}
        </GalleryTrack>
      </SiteContainer>
    </Box>
  );
}
