import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageMetadata } from '@/lib/metadata';
import AboutCtaSection from '@/components/about-us/AboutCtaSection';
import AboutHeroSection from '@/components/about-us/AboutHeroSection';
import AboutInceptionSection from '@/components/about-us/AboutInceptionSection';
import AboutTeamSection from '@/components/about-us/AboutTeamSection';
import AboutPartnersSection from '@/components/about-us/AboutPartnersSection';
import AboutStorySection from '@/components/about-us/AboutStorySection';

export const generateMetadata = ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> =>
  params.then(({ locale }) => getPageMetadata('aboutUs', '/about-us', locale));

export default async function AboutUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHeroSection />
      <AboutStorySection />
      <AboutInceptionSection />
      <AboutTeamSection />
      <AboutPartnersSection />
      <AboutCtaSection />
    </>
  );
}
