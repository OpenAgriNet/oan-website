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
      image="/images/community-hero.png"
      imageAlt={t('imageAlt')}
      height={334}
    />
  );
}
