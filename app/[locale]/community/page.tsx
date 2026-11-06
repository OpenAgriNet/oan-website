import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageMetadata } from '@/lib/metadata';
import CommunityCta from '@/components/community/CommunityCta';
import CommunityHero from '@/components/community/CommunityHero';
import GetInvolvedSection from '@/components/community/GetInvolvedSection';

export const generateMetadata = ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> =>
  params.then(({ locale }) => getPageMetadata('community', '/community', locale));

export default async function CommunityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <CommunityHero />
      <GetInvolvedSection />
      <CommunityCta />
    </>
  );
}
