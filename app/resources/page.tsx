import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/metadata';
import ExploreCtaSection from '@/components/home/ExploreCtaSection';
import ExploreResourcesSection from '@/components/resources/ExploreResourcesSection';
import ResourcesHeroSection from '@/components/resources/ResourcesHeroSection';

export const generateMetadata = (): Promise<Metadata> => getPageMetadata('resources', '/resources');

export default function ResourcesPage() {
  return (
    <>
      <ResourcesHeroSection />
      <ExploreResourcesSection />
      <ExploreCtaSection />
    </>
  );
}
