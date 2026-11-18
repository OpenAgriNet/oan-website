import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/common/PageHero';

// Figma Blog hero: the illustration is exported at 2x of the 1440 x 349 hero, so it fills the hero without cropping
export default async function BlogsHero() {
  const t = await getTranslations('Blogs.hero');

  return (
    <PageHero
      eyebrow={t('eyebrow')}
      titleLine1={t('titleLine1')}
      titleLine2Lead={t('titleLine2Lead')}
      titleLine2={t('titleLine2')}
      description={t('description')}
      image="/images/blog-hero.png"
      imageAlt={t('imageAlt')}
      height={349}
      // Figma: the title box is 563px wide, so "Stories, insights and updates" stays on one line
      titleWidth={563}
    />
  );
}
