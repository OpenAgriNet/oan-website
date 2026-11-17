import type { EventCategory } from '@/content/events/categories';

// Shape of an event after frontmatter validation (see lib/events.ts). Safe to import from client components.
export type EventSummary = {
  slug: string;
  title: string;
  // Local date and time, ISO yyyy-mm-ddThh:mm
  date: string;
  category: EventCategory;
  section: 'upcoming' | 'past';
  summary: string;
  coverImage: string;
  // Describes the cover image for screen readers; defaults to the title
  imageAlt: string;
  // Green pill on the card, e.g. a location or "Ongoing"
  tag?: string;
  type: 'internal' | 'external';
  externalUrl?: string;
  // Hosted event with a write-up: gets its own page and a link. A hosted event without text is a card only
  hasArticle: boolean;
};
