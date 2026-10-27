// Card order and photos; all copy lives in messages/en.json under Events.<section>.items
export const upcomingEvents = [
  { key: 'webinar', image: '/images/events-webinar.png' },
  { key: 'workshop', image: '/images/events-workshop.png' },
  { key: 'conference', image: '/images/events-conference.png' },
] as const;

export const pastEvents = [
  { key: 'digitalAgriculture', image: '/images/events-past-digital-agriculture.png' },
  { key: 'workshop', image: '/images/events-past-workshop.png' },
  { key: 'conference', image: '/images/events-conference.png' },
] as const;
