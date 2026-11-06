import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageMetadata } from '@/lib/metadata';
import ExploreCtaSection from '@/components/home/ExploreCtaSection';
import ExploreResourcesSection from '@/components/resources/ExploreResourcesSection';
import ResourcesHeroSection from '@/components/resources/ResourcesHeroSection';

export const generateMetadata = ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> =>
  params.then(({ locale }) => getPageMetadata('resources', '/resources', locale));

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ResourcesHeroSection />
      <ExploreResourcesSection />
      <ExploreCtaSection />
    </>
  );
}
