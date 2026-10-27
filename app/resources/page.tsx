import ExploreCtaSection from '@/components/home/ExploreCtaSection';
import ExploreResourcesSection from '@/components/resources/ExploreResourcesSection';
import ResourcesHeroSection from '@/components/resources/ResourcesHeroSection';

export default function ResourcesPage() {
  return (
    <>
      <ResourcesHeroSection />
      <ExploreResourcesSection />
      <ExploreCtaSection />
    </>
  );
}
