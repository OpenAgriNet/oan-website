import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Props = {
  variant?: 'color' | 'white';
};

// Figma mobile logo widths; from sm up the logo stays 95px
const mobileWidth = { color: 54, white: 82 };

export default function Logo({ variant = 'color' }: Props) {
  const t = useTranslations('Nav');

  return (
    <Box
      component={Link}
      href="/"
      aria-label={t('home')}
      sx={{ display: 'inline-flex', flexShrink: 0, width: { xs: mobileWidth[variant], sm: 95 } }}
    >
      <Image
        src="/images/oan-logo.png"
        alt={t('brand')}
        width={95}
        height={56}
        priority={variant === 'color'}
        style={{ width: '100%', height: 'auto', filter: variant === 'white' ? 'brightness(0) invert(1)' : undefined }}
      />
    </Box>
  );
}
