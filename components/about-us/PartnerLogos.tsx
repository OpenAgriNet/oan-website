'use client';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import CardCarousel from '@/components/common/CardCarousel';

export type PartnerLogo = { key: string; src: string; alt: string; width: number; height: number };

type Props = {
  logos: readonly PartnerLogo[];
  label: string;
};

// Five logos fill one desktop row; more than that scroll as a carousel
const MAX_STATIC = 5;

const cardSx = {
  '--logo-scale': { xs: 0.68, sm: 1 },
  minHeight: { xs: 82, sm: 120 },
  height: { xs: 82, sm: 'auto', lg: 120 },
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: { xs: '0 16px', sm: 2 },
  border: '1px solid',
  borderColor: 'card.border',
  borderRadius: '12px 0',
  bgcolor: 'background.paper',
  boxShadow: '0 4px 24px var(--mui-palette-card-shadow)',
  position: 'relative',
  transition: 'transform 200ms ease-out, box-shadow 200ms ease-out',
  // Hover zoom for pointer devices only, so touch screens never get a stuck state
  '@media (hover: hover)': {
    '&:hover': { transform: 'scale(1.05)', boxShadow: '0 8px 28px rgba(0, 0, 0, 0.14)', zIndex: 1 },
  },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
} as const;

const gridItemWidth = { xs: 'calc(50% - 10px)', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 16px)', lg: 'calc(20% - 24px)' };

function LogoImage({ logo }: { logo: PartnerLogo }) {
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      sizes="170px"
      style={{ width: `calc(${logo.width}px * var(--logo-scale))`, maxWidth: '100%', height: 'auto' }}
    />
  );
}

export default function PartnerLogos({ logos, label }: Props) {
  if (logos.length <= MAX_STATIC) {
    return (
      <>
        {/* Mobile: carousel when there is more than two logos */}
        {logos.length > 2 && (
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <LogoCarousel logos={logos} label={label} />
          </Box>
        )}
        <Box
        component="ul"
        sx={{
          display: { xs: logos.length > 2 ? 'none' : 'flex', sm: 'flex' },
          listStyle: 'none',
          m: 0,
          p: 0,
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: { xs: '16px 20px', sm: 2, md: 3, lg: '30px' },
        }}
      >
        {logos.map((logo) => (
          <Box
            component="li"
            key={logo.key}
            sx={{
              ...cardSx,
              // Figma mobile: two 82px cards per row, an odd last card spans the full width
              width: gridItemWidth,
              '&:last-child': { width: { ...gridItemWidth, xs: '100%' } },
            }}
          >
            <LogoImage logo={logo} />
          </Box>
        ))}
        </Box>
      </>
    );
  }
  return <LogoCarousel logos={logos} label={label} />;
}

function LogoCarousel({ logos, label }: Props) {
  const t = useTranslations('AboutUs.partners');

  return (
    <CardCarousel
      label={label}
      previousLabel={t('previous')}
      nextLabel={t('next')}
      sx={{ '--carousel-count': { xs: 2, md: 3, lg: 5 }, '--carousel-gap': { xs: '20px', sm: '16px', md: '24px', lg: '30px' } }}
      itemSx={cardSx}
    >
      {logos.map((logo) => (
        <LogoImage key={logo.key} logo={logo} />
      ))}
    </CardCarousel>
  );
}
