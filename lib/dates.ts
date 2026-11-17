// Dates in content files (events, blogs) are written without a time zone, as yyyy-mm-dd or yyyy-mm-ddThh:mm,
// and are shown exactly as written
export const toDate = (iso: string) => new Date(iso.includes('T') ? `${iso}:00Z` : iso);

// Figma date format, e.g. "17 Nov 2026, 3:30 PM" (English); the time only when one is given.
// Other languages use their own date and time order
export function formatDateTime(locale: string, iso: string) {
  const when = toDate(iso);
  const day = new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : locale, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(when);
  if (!iso.includes('T')) return day;
  const time = new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : locale, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }).format(when);
  return `${day}, ${time}`;
}
