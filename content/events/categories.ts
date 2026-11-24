// Single source of truth for event categories (shown as the label above each event title).
// An event with a category not listed here fails the build. Labels live in messages/en.json under Events.categories (the same for upcoming and past events).
export const eventCategories = ['webinar', 'workshop', 'conference', 'panel-discussion', 'summit'] as const;

export type EventCategory = (typeof eventCategories)[number];
