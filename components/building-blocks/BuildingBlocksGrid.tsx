import Box from '@mui/material/Box';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import SiteContainer from '@/components/layout/SiteContainer';
import BuildingBlockCard from './BuildingBlockCard';
import { blocks } from './blocks';

export default async function BuildingBlocksGrid() {
  const t = await getTranslations('BuildingBlocks');

  return (
    <Box component="section" id="building-blocks" sx={{ position: 'relative', pt: '60px', pb: '66px' }}>
      <Image
        src="/images/building-blocks-grid-bg.png"
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: 'fill' }}
      />
      <SiteContainer sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: 4,
            maxWidth: 1078,
            mx: 'auto',
          }}
        >
          {blocks.map(({ key, icon }, index) => (
            <BuildingBlockCard
              key={key}
              icon={icon}
              number={String(index + 1).padStart(2, '0')}
              title={t(`blocks.${key}.title`)}
              description={t(`blocks.${key}.description`)}
              capabilitiesLabel={t('capabilitiesLabel')}
              capabilities={t.raw(`blocks.${key}.capabilities`) as string[]}
            />
          ))}
        </Box>
      </SiteContainer>
    </Box>
  );
}
