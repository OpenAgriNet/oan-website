import EventsHero from '@/components/events/EventsHero';
import EventsSection from '@/components/events/EventsSection';
import { pastEvents, upcomingEvents } from '@/components/events/eventItems';

export default function EventsPage() {
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
