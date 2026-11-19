import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageMetadata } from '@/lib/metadata';
import BuildingBlocksCta from '@/components/building-blocks/BuildingBlocksCta';
import BuildingBlocksGrid from '@/components/building-blocks/BuildingBlocksGrid';
import BuildingBlocksHero from '@/components/building-blocks/BuildingBlocksHero';
import BuildingBlocksOverview from '@/components/building-blocks/BuildingBlocksOverview';

export const generateMetadata = ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> =>
  params.then(({ locale }) => getPageMetadata('buildingBlocks', '/building-blocks', locale));

export default async function BuildingBlocksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BuildingBlocksHero />
      <BuildingBlocksOverview />
      <BuildingBlocksGrid />
      <BuildingBlocksCta />
    </>
  );
}
