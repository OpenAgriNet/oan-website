import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/metadata';
import BuildingBlocksCta from '@/components/building-blocks/BuildingBlocksCta';
import BuildingBlocksGrid from '@/components/building-blocks/BuildingBlocksGrid';
import BuildingBlocksHero from '@/components/building-blocks/BuildingBlocksHero';
import BuildingBlocksOverview from '@/components/building-blocks/BuildingBlocksOverview';

export const generateMetadata = (): Promise<Metadata> => getPageMetadata('buildingBlocks', '/building-blocks');

export default function BuildingBlocksPage() {
  return (
    <>
      <BuildingBlocksHero />
      <BuildingBlocksOverview />
      <BuildingBlocksGrid />
      <BuildingBlocksCta />
    </>
  );
}
