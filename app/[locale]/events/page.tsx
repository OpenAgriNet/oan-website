import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageMetadata } from '@/lib/metadata';
import EventsHero from '@/components/events/EventsHero';
import EventsSection from '@/components/events/EventsSection';
import { pastEvents, upcomingEvents } from '@/components/events/eventItems';

export const generateMetadata = ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> =>
  params.then(({ locale }) => getPageMetadata('events', '/events', locale));

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <EventsHero />
      <EventsSection
        section="upcoming"
        items={upcomingEvents}
        background="/images/events-upcoming-bg.png"
        pt={60}
        pb={37}
        mobilePt={32}
        mobilePb={40}
      />
      <EventsSection section="past" items={pastEvents} pt={60} pb={64} mobilePt={0} mobilePb={28} />
    </>
  );
}
