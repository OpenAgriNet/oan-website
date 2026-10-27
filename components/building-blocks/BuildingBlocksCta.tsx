import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import ActionButton from '@/components/common/ActionButton';
import SectionEyebrow from '@/components/common/SectionEyebrow';

export default async function BuildingBlocksCta() {
  const t = await getTranslations('BuildingBlocks.cta');

  return (
    <Box
      component="section"
      sx={{ position: 'relative', overflow: 'hidden', minHeight: { md: 409 }, bgcolor: 'background.paper' }}
    >
      {/* From lg the illustration keeps its Figma size (1440x409) pinned right; its white left edge blends into the section */}
      <Box sx={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: { xs: '100%', lg: 1440 } }}>
        <Image
          src="/images/building-blocks-cta.png"
          alt=""
          fill
          sizes="(min-width: 1200px) 1440px, 100vw"
          style={{ objectFit: 'cover', objectPosition: 'right center' }}
        />
      </Box>
      {/* Not in Figma: keeps the text readable once the illustration is cropped on smaller screens */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: { lg: 'none' },
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
          px: { xs: 2, sm: 4, md: 5, lg: '120px' },
          py: { xs: 6, md: '70px' },
        }}
      >
        <Box sx={{ maxWidth: 423, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Figma keeps this eyebrow in mixed case; the shared eyebrow variant forces uppercase */}
            <Box sx={{ '& .MuiTypography-root': { textTransform: 'none' } }}>
              <SectionEyebrow>{t('eyebrow')}</SectionEyebrow>
            </Box>
            <Typography variant="headline" sx={{ color: 'text.heading' }}>
              {t('titleLine1')}
              <br />
              <Box component="span" sx={{ color: 'secondary.main', fontWeight: 800 }}>
                {t('titleLine2')}
              </Box>
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 14, lineHeight: 1.4, color: 'text.heading' }}>{t('description')}</Typography>
          {/* In Figma the button row is wider than the 423px text column */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: { sm: 'max-content' } }}>
            <ActionButton>{t('primaryAction')}</ActionButton>
            <ActionButton tone="secondary">{t('secondaryAction')}</ActionButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
