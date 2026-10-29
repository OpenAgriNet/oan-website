import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/common/PageHero';

export default async function CommunityHero() {
  const t = await getTranslations('Community.hero');

  return (
    <PageHero
      eyebrow={t('eyebrow')}
      titleLine1={t('titleLine1')}
      titleLine2={t('titleLine2')}
      description={t('description')}
      image="/images/community-hero-photo.png"
      imageAlt={t('imageAlt')}
      height={334}
      // Desktop Figma shows rows 176-664 of the photo
      crop={{ width: 2103, height: 748, top: 176, stripHeight: 488 }}
      // Mobile Figma: 506px tall, photo 948px wide ending 41px past the right edge
      mobile={{ height: 506, tintHeight: 283, photo: { right: -41, top: 169, width: 948 } }}
    />
  );
}
