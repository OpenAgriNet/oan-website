import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { eventCategories, type EventCategory } from '@/content/events/categories';
import { toDate } from './dates';
import type { EventSummary } from './eventTypes';

// Build-time only (uses fs), the same approach as lib/blogs.ts.
// One folder per locale (content/events/<locale>/<slug>.md). A locale only shows events in its own folder.
const dirFor = (locale: string) => path.join(process.cwd(), 'content/events', locale);

export type Event = EventSummary & { body: string };

function fail(file: string, msg: string): never {
  throw new Error(`Invalid event "${file}": ${msg}`);
}

function parse(locale: string, file: string): Event {
  const { data, content } = matter(fs.readFileSync(path.join(dirFor(locale), file), 'utf8'));
  const slug = file.replace(/\.md$/, '');
  const str = (k: string) => (typeof data[k] === 'string' && data[k].trim() ? (data[k] as string) : fail(file, `"${k}" is required`));
  // The time is optional ("yyyy-mm-dd" or "yyyy-mm-ddThh:mm"); gray-matter turns a bare yyyy-mm-dd into a Date object
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : str('date');
  if (!/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(date) || Number.isNaN(toDate(date).getTime()))
    fail(file, '"date" must be a real date: yyyy-mm-dd, or "yyyy-mm-ddThh:mm" in quotes');
  if (!eventCategories.includes(data.category)) fail(file, `unknown category "${data.category}" (allowed: ${eventCategories.join(', ')})`);
  if (data.section !== 'upcoming' && data.section !== 'past') fail(file, '"section" must be upcoming or past');
  if (data.type !== 'internal' && data.type !== 'external') fail(file, '"type" must be internal or external');
  if (data.type === 'external' && !/^https:\/\//.test(data.externalUrl ?? '')) fail(file, 'external events need an https "externalUrl"');
  return {
    slug,
    title: str('title'),
    date,
    category: data.category as EventCategory,
    section: data.section,
    summary: str('summary'),
    coverImage: str('coverImage'),
    imageAlt: typeof data.imageAlt === 'string' && data.imageAlt.trim() ? data.imageAlt : str('title'),
    tag: typeof data.tag === 'string' && data.tag.trim() ? data.tag : undefined,
    type: data.type,
    externalUrl: data.type === 'external' ? data.externalUrl : undefined,
    hasArticle: data.type === 'internal' && content.trim().length > 0,
    body: content,
  };
}

export function getAllEvents(locale: string): Event[] {
  const dir = dirFor(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => parse(locale, f));
}

// Upcoming: soonest first. Past: most recent first. Events on the same date keep their file-name order
export const getEvents = (locale: string, section: 'upcoming' | 'past') =>
  getAllEvents(locale)
    .filter((e) => e.section === section)
    .sort((a, b) => (section === 'upcoming' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)));

export const getEventBySlug = (locale: string, slug: string) => getAllEvents(locale).find((e) => e.slug === slug);
// Only hosted events with a write-up get a detail page (and a sitemap entry)
export const getEventSlugs = (locale: string) => getAllEvents(locale).filter((e) => e.hasArticle).map((e) => e.slug);
// Where an event card links to: its own page, an external site, or nowhere
export const eventHref = (e: EventSummary) => (e.type === 'external' ? e.externalUrl : e.hasArticle ? `/events/${e.slug}` : undefined);
// Strip the body so the client bundle only carries card data
export function toSummary(event: Event): EventSummary {
  const { body, ...summary } = event;
  void body;
  return summary;
}
