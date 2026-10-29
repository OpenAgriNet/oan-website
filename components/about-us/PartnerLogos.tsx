'use client';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

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
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'flex',
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
    );
  }
  return <LogoCarousel logos={logos} label={label} />;
}

function LogoCarousel({ logos, label }: Props) {
  const t = useTranslations('AboutUs.partners');
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 1, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [update]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: direction * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
  };

  const arrowSx = {
    position: 'absolute',
    top: '50%',
    zIndex: 2,
    width: 36,
    height: 36,
    color: 'primary.main',
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: 'card.border',
    boxShadow: '0 4px 12px var(--mui-palette-card-shadow)',
    '&:hover': { bgcolor: 'background.paper', borderColor: 'primary.main' },
    '&.Mui-disabled': { opacity: 0, pointerEvents: 'none' },
  } as const;

  return (
    <Box
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      sx={{ position: 'relative', '--carousel-count': { xs: 2, md: 3, lg: 5 }, '--carousel-gap': { xs: '20px', sm: '16px', md: '24px', lg: '30px' } }}
    >
      <IconButton
        aria-label={t('previous')}
        disabled={edge.start}
        onClick={() => scrollByPage(-1)}
        sx={{ ...arrowSx, left: 0, transform: 'translate(-50%, -50%)' }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Box
        ref={track}
        component="ul"
        onScroll={update}
        sx={{
          listStyle: 'none',
          // Padding gives the hover zoom and shadow room inside the scroll area; the negative margin keeps the layout unchanged
          m: '-12px -8px',
          p: '12px 8px',
          display: 'flex',
          gap: 'var(--carousel-gap)',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollPaddingInline: '8px',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {logos.map((logo) => (
          <Box
            component="li"
            key={logo.key}
            sx={{
              ...cardSx,
              flex: '0 0 auto',
              scrollSnapAlign: 'start',
              width: 'calc((100% - (var(--carousel-count) - 1) * var(--carousel-gap)) / var(--carousel-count))',
            }}
          >
            <LogoImage logo={logo} />
          </Box>
        ))}
      </Box>
      <IconButton
        aria-label={t('next')}
        disabled={edge.end}
        onClick={() => scrollByPage(1)}
        sx={{ ...arrowSx, right: 0, transform: 'translate(50%, -50%)' }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
}
