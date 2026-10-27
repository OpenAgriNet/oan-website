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
      <Box
        aria-hidden
        sx={{ position: 'absolute', inset: 0, '& img': { objectPosition: { xs: 'left bottom', lg: 'center bottom' } } }}
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
          px: { xs: 2, sm: 4, md: 5, lg: 0 },
          pl: { lg: '80px' },
          pr: { lg: '70px' },
          pt: { xs: 6, lg: '60px' },
          pb: { xs: 6, lg: '67px' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', rowGap: { xs: 2, lg: 0 }, mb: { xs: 4, lg: '41px' }, pt: { lg: '1px' } }}>
          <SectionEyebrow align="center">
            {t('eyebrow')}
          </SectionEyebrow>
          <Typography variant="sectionTitle" sx={{ color: 'text.heading', fontWeight: 600, letterSpacing: '0.2px', fontSize: { xs: 22, sm: 26, md: 28 }, mt: { lg: '15px' } }}>
            {t.rich('title', {
              accent: (chunks) => (
                <Box component="span" sx={{ color: 'secondary.main', fontWeight: 800, letterSpacing: 0 }}>
                  {chunks}
                </Box>
              ),
            })}
          </Typography>
          <Typography variant="sectionIntro" sx={{ color: 'text.heading', maxWidth: 662, mt: { lg: '17px' } }}>
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
            rowGap: 3,
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
