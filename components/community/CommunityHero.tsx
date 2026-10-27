import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import PillBadge from '@/components/common/PillBadge';

// Above 1440px the photo ends inside the page; fading its sides blends the plants at its edges into the white
const edgeFade = 'linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)';

export default async function CommunityHero() {
  const t = await getTranslations('Community.hero');

  return (
    <Box component="section" sx={{ overflow: 'hidden', bgcolor: 'background.paper' }}>
      {/* Like the home hero: the photo sits in the centred 1440px area with the text; below lg it stacks under the text */}
      <Box
        sx={{
          position: 'relative',
          maxWidth: 1440,
          mx: 'auto',
          display: { xs: 'flex', lg: 'block' },
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            position: { xs: 'relative', lg: 'absolute' },
            order: 1,
            inset: { lg: 0 },
            height: { xs: 220, sm: 280, md: 334, lg: 'auto' },
            '@media (min-width: 1441px)': { maskImage: edgeFade },
          }}
        >
          <Image
            src="/images/community-hero.png"
            alt={t('imageAlt')}
            fill
            priority
            sizes="(min-width: 1360px) 1440px, 100vw"
            style={{ objectFit: 'cover', objectPosition: 'right center' }}
          />
        </Box>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: { lg: 'calc(516px + max(80px, 50% - 570px))' },
            // At 1440px the text starts at x=150, as in Figma
            pl: { xs: 2, sm: 4, md: 5, lg: 'max(80px, calc(50% - 570px))' },
            pr: { xs: 2, sm: 4, md: 5, lg: 0 },
            pt: { xs: 6, lg: '74px' },
            pb: { xs: 4, lg: '74px' },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
            <PillBadge icon={null}>{t('eyebrow')}</PillBadge>
            <Typography variant="displayTitle" sx={{ color: 'text.heading', fontSize: { xs: 28, sm: 36 } }}>
              {t('titleLine1')}
              <br />
              <Box component="span" sx={{ color: 'secondary.main' }}>
                {t('titleLine2')}
              </Box>
            </Typography>
          </Box>
          <Typography variant="heroBody" sx={{ color: 'text.heading', maxWidth: 516 }}>
            {t('description')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
