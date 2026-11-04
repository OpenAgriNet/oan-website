import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/metadata';
import CommunityCta from '@/components/community/CommunityCta';
import CommunityHero from '@/components/community/CommunityHero';
import GetInvolvedSection from '@/components/community/GetInvolvedSection';

export const generateMetadata = (): Promise<Metadata> => getPageMetadata('community', '/community');

export default function CommunityPage() {
  return (
    <>
      <CommunityHero />
      <GetInvolvedSection />
      <CommunityCta />
    </>
  );
}
