import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodeIcon from '@mui/icons-material/Code';
import LanguageIcon from '@mui/icons-material/Language';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import BlockCard from '@/components/common/BlockCard';
import MaskIcon from '@/components/common/MaskIcon';
import SectionEyebrow from '@/components/common/SectionEyebrow';
import { BUILDING_BLOCKS_ID } from './sectionIds';

const cards = [
  { key: 'languageAi', icon: <MaskIcon src="/icons/blocks/sprout.svg" size={24} />, tagged: true },
  { key: 'authMemory', icon: <MaskIcon src="/icons/blocks/share.svg" size={21} />, tagged: true },
  { key: 'inferenceAi', icon: <CodeIcon sx={{ fontSize: 22 }} />, tagged: true },
  { key: 'beckn', icon: <LanguageIcon sx={{ fontSize: 20 }} /> },
  { key: 'providerOs', icon: <MaskIcon src="/icons/blocks/settings.svg" size={20} />, tagged: true },
  { key: 'observability', icon: <MaskIcon src="/icons/blocks/star.svg" size={16} /> },
  { key: 'resolver', icon: <MaskIcon src="/icons/blocks/exchange.svg" size={20} /> },
];

export default async function BuildingBlocksSection() {
  const t = await getTranslations('Home.blocks');

  return (
    <Box
      component="section"
      id={BUILDING_BLOCKS_ID}
      sx={{ position: 'relative', bgcolor: 'background.default', overflow: 'hidden', scrollMarginTop: { xs: '72px', md: '90px' } }}
    >
      {/* Figma mobile: 375x1141 portrait artwork (30% opacity baked in) pinned to the bottom of the section */}
      <Box
        aria-hidden
        sx={{ display: { xs: 'block', sm: 'none' }, position: 'absolute', left: 0, right: 0, bottom: 0, height: 1141 }}
      >
        <Image
          src="/images/home/building-blocks-bg-mobile.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center bottom' }}
        />
      </Box>
      <Box
        aria-hidden
        sx={{
          display: { xs: 'none', sm: 'block' },
          position: 'absolute',
          inset: 0,
          '& img': { objectPosition: { xs: 'left bottom', lg: 'center bottom' } },
        }}
      >
        <Image
          src="/images/home/building-blocks-bg.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', transform: 'scaleX(-1)', opacity: 0.3 }}
        />
      </Box>
      <Box
        sx={{
          position: 'relative',
          maxWidth: 1440,
          mx: 'auto',
          px: { xs: '20px', sm: 4, md: 5, lg: 0 },
          pl: { lg: '80px' },
          pr: { lg: '70px' },
          pt: { xs: '24px', sm: 6, lg: '60px' },
          pb: { xs: '76px', sm: 6, lg: '67px' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: { xs: 335, sm: 'none' }, mx: { xs: 'auto', sm: 0 }, rowGap: { xs: '16px', sm: 2, lg: 0 }, mb: { xs: '23px', sm: 4, lg: '41px' }, pt: { lg: '1px' } }}>
          {/* Figma mobile: 11px eyebrow */}
          <Box sx={{ '& .MuiTypography-root': { fontSize: { xs: 11, sm: 14 } }, '& > div': { height: { xs: 30, sm: 33 } } }}>
            <SectionEyebrow align="center">{t('eyebrow')}</SectionEyebrow>
          </Box>
          <Typography variant="sectionTitle" sx={{ color: 'text.heading', fontWeight: 600, letterSpacing: '0.2px', fontSize: { xs: 24, sm: 26, md: 28 }, mt: { lg: '15px' } }}>
            {t.rich('title', {
              accent: (chunks) => (
                <Box component="span" sx={{ color: 'secondary.main', fontWeight: 800, letterSpacing: 0 }}>
                  {chunks}
                </Box>
              ),
            })}
          </Typography>
          <Typography
            variant="sectionIntro"
            sx={{
              color: 'text.heading',
              maxWidth: 662,
              mt: { lg: '17px' },
              fontWeight: { xs: 400, sm: 500 },
              fontSize: { xs: 12, sm: 14 },
              lineHeight: { xs: '17px', sm: 1.5 },
            }}
          >
            {t.rich('description', {
              br: () => <Box component="br" sx={{ display: { xs: 'none', lg: 'inline' } }} />,
            })}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            columnGap: { xs: 3, lg: '24.67px' },
            rowGap: { xs: '20px', sm: 3 },
            // Figma mobile: every card is 206px tall
            gridAutoRows: { xs: 'minmax(206px, auto)', sm: 'auto' },
          }}
        >
          {cards.map(({ key, icon, tagged }) => (
            <BlockCard
              key={key}
              icon={icon}
              title={t(`cards.${key}.title`)}
              description={t(`cards.${key}.description`)}
              tag={tagged ? t(`cards.${key}.tag`) : undefined}
              exploreLabel={t('explore')}
              exploreAriaLabel={t('exploreAria', { title: t(`cards.${key}.title`) })}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
