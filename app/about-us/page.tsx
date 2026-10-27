import AboutCtaSection from '@/components/about-us/AboutCtaSection';
import AboutHeroSection from '@/components/about-us/AboutHeroSection';
import AboutInceptionSection from '@/components/about-us/AboutInceptionSection';
import AboutTeamSection from '@/components/about-us/AboutTeamSection';
import AboutPartnersSection from '@/components/about-us/AboutPartnersSection';
import AboutStorySection from '@/components/about-us/AboutStorySection';

export default function AboutUsPage() {
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
