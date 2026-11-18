// Single source of truth for event categories (shown as the label above each event title).
// An event with a category not listed here fails the build. Labels live in messages/en.json under Events.<section>.categories.
export const eventCategories = ['webinar', 'workshop', 'conference', 'panel-discussion'] as const;

export type EventCategory = (typeof eventCategories)[number];
