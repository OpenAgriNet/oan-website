// Card order and photos; all copy lives in messages/en.json under Events.<section>.items
// Add an event's `href` (registration, recording, article) to show its View Details / View Highlights link
export type EventItem = { key: string; image: string; href?: string };

export const upcomingEvents: EventItem[] = [
  { key: 'webinar', image: '/images/events-webinar.png' },
  // Hidden for now as per client review; only the first upcoming event is shown
  // { key: 'workshop', image: '/images/events-workshop.png' },
  // { key: 'conference', image: '/images/events-conference.png' },
];

export const pastEvents: EventItem[] = [
  { key: 'digitalAgriculture', image: '/images/events-past-digital-agriculture.png' },
  { key: 'workshop', image: '/images/events-past-workshop.png' },
  { key: 'conference', image: '/images/events-conference.png' },
];
