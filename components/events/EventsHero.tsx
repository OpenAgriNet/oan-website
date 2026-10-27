import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/common/PageHero';

export default async function EventsHero() {
  const t = await getTranslations('Events.hero');

  return (
    <PageHero
      eyebrow={t('eyebrow')}
      titleLine1={t('titleLine1')}
      titleLine2={t('titleLine2')}
      description={t('description')}
      image="/images/events-hero.png"
      imageAlt={t('imageAlt')}
      height={349}
      overlay="linear-gradient(90deg, rgba(255, 255, 255, 0.9) 37.391%, rgba(255, 255, 255, 0) 100%)"
    />
  );
}
