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
      image="/images/events-hero-photo.png"
      imageAlt={t('imageAlt')}
      height={349}
      overlay="linear-gradient(90deg, rgba(255, 255, 255, 0.9) 37.391%, rgba(255, 255, 255, 0) 100%)"
      // Desktop Figma shows rows 206-703 of the photo
      crop={{ width: 2048, height: 768, top: 206, stripHeight: 497 }}
      // Mobile Figma: 312px tall, photo 832px wide ending 50px past the right edge, fading into the tint from the top
      mobile={{
        height: 312,
        tintHeight: 283,
        textTop: 42,
        photo: { right: -50, top: 0, width: 832 },
        overlay: 'linear-gradient(180deg, rgba(240, 249, 254, 1) 34.6%, rgba(240, 249, 254, 0) 99.8%)',
      }}
    />
  );
}
