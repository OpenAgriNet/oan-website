import { getLocale, getTranslations } from 'next-intl/server';
import CardGrid from '@/components/common/CardGrid';
import ContentCard from '@/components/common/ContentCard';
import Section from '@/components/common/Section';
import SectionHeader from '@/components/common/SectionHeader';
import { eventHref } from '@/lib/events';
import { formatDateTime } from '@/lib/dates';
import type { EventSummary } from '@/lib/eventTypes';

type Props = {
  section: 'upcoming' | 'past';
  // Event files from content/events/<locale> (see lib/events.ts)
  items: EventSummary[];
  background?: string;
  // Figma spacing above and below the content at desktop width
  pt: number;
  pb: number;
  // Figma spacing above and below the content on mobile
  mobilePt: number;
  mobilePb: number;
};

// Upcoming or past events: section header, then one row of event cards with "View All" when there are more
export default async function EventsSection({ section, items, background, pt, pb, mobilePt, mobilePb }: Props) {
  const t = await getTranslations(`Events.${section}`);
  const tCategory = await getTranslations('Events.categories');
  const locale = await getLocale();

  return (
    <Section background={background} pt={{ xs: mobilePt, lg: pt }} pb={{ xs: mobilePb, lg: pb }}>
      <SectionHeader eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
      <CardGrid actionLabel={t('action')} visible={3}>
        {items.map((item) => (
          <ContentCard
            key={item.slug}
            image={item.coverImage}
            imageAlt={item.imageAlt}
            category={tCategory(item.category)}
            date={formatDateTime(locale, item.date)}
            title={item.title}
            summary={item.summary}
            tag={item.tag}
            linkLabel={item.linkLabel ?? t('linkLabel')}
            href={eventHref(item)}
          />
        ))}
      </CardGrid>
    </Section>
  );
}
