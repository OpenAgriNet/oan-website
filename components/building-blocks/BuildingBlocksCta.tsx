import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import ActionButton from '@/components/common/ActionButton';
import SectionEyebrow from '@/components/common/SectionEyebrow';

const illustration = '/images/building-blocks-cta-illustration.png';

// Mobile Figma: the buttons share the row and have no hover arrow; on very narrow phones they wrap instead of clipping
const mobileButton = {
  flex: { xs: 1, sm: '0 1 auto' },
  minWidth: { xs: 'max-content', sm: 0 },
  minHeight: { xs: 42, sm: 52 },
  px: { xs: '4px', sm: '23px' },
  fontSize: { xs: 12, sm: 14 },
  '& .arrow': { display: { xs: 'none', sm: 'block' } },
};

export default async function BuildingBlocksCta() {
  const t = await getTranslations('BuildingBlocks.cta');

  return (
    <Box
      component="section"
      sx={{ position: 'relative', overflow: 'hidden', minHeight: { xs: 401, sm: 0, md: 409 }, bgcolor: 'background.paper' }}
    >
      {/* Mobile Figma: the home CTA background at half opacity, with the farmer illustration in the lower part */}
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Image src="/images/home/explore-cta-bg.png" alt="" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.5 }} />
        <Box sx={{ position: 'absolute', left: '-33.71%', top: '36.59%', width: '133.6%', aspectRatio: '1672 / 941' }}>
          <Image src={illustration} alt="" fill sizes="134vw" />
        </Box>
      </Box>
      {/* From lg the illustration keeps its Figma size (1440x409) pinned right; its white left edge blends into the section */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: { xs: '100%', lg: 1440 },
          containerType: 'size',
        }}
      >
        {/* Desktop Figma shows rows 195-670 of the illustration, covering the box from the right, centred vertically */}
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'max(100%, 100cqh * 1672 / 475)',
            aspectRatio: '1672 / 475',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ position: 'absolute', left: 0, top: 'calc(-100% * 195 / 475)', width: '100%', height: 'calc(100% * 941 / 475)' }}>
            <Image src={illustration} alt="" fill sizes="(min-width: 1200px) 1440px, 100vw" />
          </Box>
        </Box>
      </Box>
      {/* Not in Figma: keeps the text readable once the illustration is cropped on smaller screens */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: { xs: 'none', sm: 'block', lg: 'none' },
          background: {
            xs: 'rgba(255, 255, 255, 0.85)',
            md: 'linear-gradient(90deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.6) 55%, rgba(255, 255, 255, 0) 100%)',
          },
        }}
      />
      <Box
        sx={{
          position: 'relative',
          maxWidth: 1440,
          mx: 'auto',
          px: { xs: '20px', sm: 4, md: 5, lg: '120px' },
          py: { xs: '20px', sm: 6, md: '70px' },
        }}
      >
        <Box
          sx={{
            maxWidth: { sm: 423 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', sm: 'stretch' },
            gap: 2,
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
            {/* Figma keeps this eyebrow in mixed case; the shared eyebrow variant forces uppercase */}
            <Box sx={{ '& .MuiTypography-root': { textTransform: 'none', fontSize: { xs: 11, sm: 14 } } }}>
              <SectionEyebrow align={{ xs: 'center', sm: 'left' }}>{t('eyebrow')}</SectionEyebrow>
            </Box>
            <Typography
              variant="headline"
              sx={{ color: 'text.heading', fontSize: { xs: 20, sm: 28 }, letterSpacing: { xs: '0.4px', sm: '0.56px' } }}
            >
              {t('titleLine1')}
              <br />
              <Box component="span" sx={{ color: 'secondary.main', fontWeight: 800 }}>
                {t('titleLine2')}
              </Box>
            </Typography>
          </Box>
          <Typography sx={{ fontSize: { xs: 12, sm: 14 }, lineHeight: 1.4, color: 'text.heading' }}>{t('description')}</Typography>
          {/* In Figma the button row is wider than the 423px text column */}
          <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', sm: 'nowrap' }, gap: 2, width: { xs: '100%', sm: 'max-content' } }}>
            <ActionButton sx={mobileButton}>{t('primaryAction')}</ActionButton>
            <ActionButton tone="secondary" sx={mobileButton}>
              {t('secondaryAction')}
            </ActionButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
