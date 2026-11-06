import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageMetadata } from '@/lib/metadata';
import BuildingBlocksSection from '@/components/home/BuildingBlocksSection';
import ExploreCtaSection from '@/components/home/ExploreCtaSection';
import HeroSection from '@/components/home/HeroSection';
import HowOanWorksSection from '@/components/home/HowOanWorksSection';
import ScaleSection from '@/components/home/ScaleSection';
import WhyOanSection from '@/components/home/WhyOanSection';

export const generateMetadata = ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> =>
  params.then(({ locale }) => getPageMetadata('home', '/', locale));

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <WhyOanSection />
      <HowOanWorksSection />
      <BuildingBlocksSection />
      <ScaleSection />
      <ExploreCtaSection />
    </>
  );
}
