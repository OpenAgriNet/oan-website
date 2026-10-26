import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Props = {
  variant?: 'color' | 'white';
};

export default function Logo({ variant = 'color' }: Props) {
  const t = useTranslations('Nav');

  return (
    <Link href="/" aria-label={t('home')} style={{ display: 'inline-flex', flexShrink: 0 }}>
      <Image
        src="/images/oan-logo.png"
        alt={t('brand')}
        width={95}
        height={56}
        priority={variant === 'color'}
        style={{ width: 95, height: 'auto', filter: variant === 'white' ? 'brightness(0) invert(1)' : undefined }}
      />
    </Link>
  );
}
