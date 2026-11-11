import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getPageMetadata, siteUrl } from '@/lib/metadata';
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
  const t = await getTranslations('Metadata');

  // Organization structured data, home page only. Logo and official social profiles (sameAs) are added once provided.
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: t('siteName'),
    alternateName: 'OAN',
    url: `${siteUrl}/`,
    description: t('description'),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }}
      />
      <HeroSection />
      <WhyOanSection />
      <HowOanWorksSection />
      <BuildingBlocksSection />
      <ScaleSection />
      <ExploreCtaSection />
    </>
  );
}
