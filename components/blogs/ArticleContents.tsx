'use client';
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { BlogHeading } from '@/lib/blogTypes';
import { oan } from '@/theme/oan';

type Props = { label: string; headings: BlogHeading[] };

// Figma: 28px rows 12px apart; the green marker on the grey track sits beside the current row
const ROW = 28;
const ROW_GAP = 12;
// A section counts as being read once its heading passes the middle of the window, so short articles still step through every section
const readLine = () => Math.max(140, window.innerHeight / 2);

// "Inside This Article": the article's section headings; the marker follows the section being read
export default function ArticleContents({ label, headings }: Props) {
  const [active, setActive] = useState(0);
  // After a click the page jumps to that section; keep it marked even if the page cannot scroll that far
  const clickedAt = useRef(0);

  useEffect(() => {
    const update = () => {
      if (Date.now() - clickedAt.current < 1000) return;
      // At the top of the page reading starts at the first section
      if (window.scrollY <= 0) {
        setActive(0);
        return;
      }
      // At the end of the page the last sections may never reach the line, so the last one is marked
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        setActive(headings.length - 1);
        return;
      }
      const line = readLine();
      let current = 0;
      headings.forEach(({ id }, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [headings]);

  return (
    <Box
      component="nav"
      aria-label={label}
      sx={{
        p: '19px 30px 11px 29px',
        border: '1px solid',
        borderColor: 'card.divider',
        borderRadius: oan.layout.article.panelRadius,
        bgcolor: 'background.header',
      }}
    >
      <Typography variant="articleHeading" component="h2">
        {label}
      </Typography>
      <Box sx={{ position: 'relative', mt: '8px', pl: '27px' }}>
        <Box aria-hidden sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, borderRadius: '4px', bgcolor: 'card.divider' }} />
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            left: 0,
            top: active * (ROW + ROW_GAP),
            width: 8,
            height: 25,
            borderRadius: '4px',
            bgcolor: 'primary.main',
            transition: 'top 200ms ease-out',
            '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          }}
        />
        <Box component="ol" sx={{ listStyle: 'none', m: 0, p: '0 0 29px', display: 'flex', flexDirection: 'column', gap: `${ROW_GAP}px` }}>
          {headings.map(({ id, text }, i) => (
            <li key={id}>
              <Box
                component="a"
                href={`#${id}`}
                aria-current={i === active ? 'location' : undefined}
                onClick={() => {
                  clickedAt.current = Date.now();
                  setActive(i);
                }}
                sx={{
                  display: 'block',
                  px: '4px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  bgcolor: i === active ? 'card.outline' : 'transparent',
                  transition: 'background-color 200ms ease-out',
                  '@media (hover: hover)': { '&:hover': { bgcolor: 'card.outline' } },
                  '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: '1px' },
                }}
              >
                <Typography variant="contentsLink" sx={{ display: 'block' }}>
                  {text}
                </Typography>
              </Box>
            </li>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
