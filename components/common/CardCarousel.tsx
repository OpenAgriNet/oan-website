'use client';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import type { SxProps, Theme } from '@mui/material/styles';
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  label: string;
  previousLabel: string;
  nextLabel: string;
  // Must set '--carousel-count' (cards visible at once) and '--carousel-gap'; both can be responsive
  sx: SxProps<Theme>;
  itemSx?: SxProps<Theme>;
  children: ReactNode;
};

// Single-row card carousel: arrows appear only when the cards overflow the row
export default function CardCarousel({ label, previousLabel, nextLabel, sx, itemSx, children }: Props) {
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
    <Box role="group" aria-roledescription="carousel" aria-label={label} sx={[{ position: 'relative' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <IconButton
        aria-label={previousLabel}
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
        {Children.map(children, (child) => (
          <Box
            component="li"
            sx={[
              {
                flex: '0 0 auto',
                scrollSnapAlign: 'start',
                width: 'calc((100% - (var(--carousel-count) - 1) * var(--carousel-gap)) / var(--carousel-count))',
              },
              ...(Array.isArray(itemSx) ? itemSx : [itemSx]),
            ]}
          >
            {child}
          </Box>
        ))}
      </Box>
      <IconButton
        aria-label={nextLabel}
        disabled={edge.end}
        onClick={() => scrollByPage(1)}
        sx={{ ...arrowSx, right: 0, transform: 'translate(50%, -50%)' }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
}
