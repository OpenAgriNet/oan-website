import BuildingBlocksSection from '@/components/home/BuildingBlocksSection';
import ExploreCtaSection from '@/components/home/ExploreCtaSection';
import HeroSection from '@/components/home/HeroSection';
import HowOanWorksSection from '@/components/home/HowOanWorksSection';
import ScaleSection from '@/components/home/ScaleSection';
import WhyOanSection from '@/components/home/WhyOanSection';

export default function HomePage() {
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
