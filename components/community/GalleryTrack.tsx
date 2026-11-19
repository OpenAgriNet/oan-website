'use client';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import ActionButton from '@/components/common/ActionButton';

type Props = { children: ReactNode; label: string; viewAll: string; previousLabel: string; nextLabel: string };

// Same round arrows as the About Us team and partner carousels
const arrowSx = {
  display: { xs: 'none', sm: 'inline-flex' },
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

// Horizontal track of gallery slides moved with the arrows (one slide per press). On mobile the slides stack
// vertically instead, five photos at first and all the rest once "View All" is pressed.
export default function GalleryTrack({ children, label, viewAll, previousLabel, nextLabel }: Props) {
  const slideCount = Children.count(children);
  const [shown, setShown] = useState(1);
  const track = useRef<HTMLDivElement>(null);
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

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        // Figma mobile: the photo column is 338px inside a 335px text column
        width: { xs: 'calc(100% + 3px)', sm: 'auto' },
        alignSelf: { xs: 'flex-start', sm: 'auto' },
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <Box sx={{ position: 'relative' }}>
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
          onScroll={update}
          role="group"
          aria-roledescription="carousel"
          aria-label={label}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: '16px', sm: 0 },
            overflowX: { xs: 'visible', sm: 'auto' },
            scrollSnapType: { sm: 'x mandatory' },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            '& > *': { flex: { sm: '0 0 100%' }, scrollSnapAlign: 'start', minWidth: 0 },
            // Mobile: slides past the ones shown stay hidden until "View All" is pressed
            [`& > *:nth-of-type(n+${shown + 1})`]: { display: { xs: 'none', sm: 'grid' } },
          }}
        >
          {children}
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
      {shown < slideCount && (
        <ActionButton
          tone="secondary"
          onClick={() => setShown(slideCount)}
          sx={{
            display: { xs: 'inline-flex', sm: 'none' },
            width: '100%',
            minHeight: 42,
            fontSize: 12,
            '& .arrow': { display: 'none' },
            // Touch screens keep the hover state after a tap, which turned the button white: stay orange
            '&:hover, &:focus-visible': { bgcolor: 'secondary.main', color: 'secondary.contrastText' },
          }}
        >
          {viewAll}
        </ActionButton>
      )}
    </Box>
  );
}
