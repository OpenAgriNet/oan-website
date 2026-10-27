'use client';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import MaskIcon from './MaskIcon';

const drop = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
`;
const grow = keyframes`
  0%, 100% { transform: scaleY(0.6); opacity: 0.6; }
  50% { transform: scaleY(1.15); opacity: 1; }
`;
const nudge = keyframes`
  0%, 100% { transform: translateY(-2px); }
  50% { transform: translateY(3px); }
`;

const LOOP = '1.8s cubic-bezier(0.45, 0, 0.55, 1) infinite';

type Props = {
  label: string;
  ariaLabel: string;
  targetId: string;
};

export default function ScrollCue({ label, ariaLabel, targetId }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToTarget = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(targetId)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <Box ref={ref} data-active={active} sx={{ display: 'flex' }}>
      <ButtonBase
        type="button"
        disableRipple
        aria-label={ariaLabel}
        onClick={scrollToTarget}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.5,
          borderRadius: 1,
          cursor: 'pointer',
          bgcolor: 'transparent',
          WebkitTapHighlightColor: 'transparent',
          '&:hover, &:focus, &:active, &.Mui-focusVisible': {
            bgcolor: 'transparent',
          },
          '&:hover .ScrollCue-circle': { boxShadow: '0 6px 12px var(--mui-palette-scrollCue-glow)' },
          '&:active .ScrollCue-circle': { transform: 'scale(0.96)' },
        }}
      >
        <Typography variant="cueLabel" aria-hidden sx={{ color: 'text.primary', whiteSpace: 'nowrap' }}>
          {label}
        </Typography>
        <Box
          aria-hidden
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '@media (prefers-reduced-motion: no-preference)': {
              '&': { animation: active ? `${drop} ${LOOP}` : 'none' },
              '& .ScrollCue-line': { animation: active ? `${grow} ${LOOP}` : 'none' },
              '& .ScrollCue-arrow': { animation: active ? `${nudge} ${LOOP}` : 'none' },
            },
          }}
        >
          <Box
            className="ScrollCue-line"
            sx={{
              width: 2,
              height: 37,
              transformOrigin: 'top',
              background: 'linear-gradient(to bottom, transparent, var(--mui-palette-primary-main))',
            }}
          />
          <Box
            className="ScrollCue-circle"
            sx={{
              width: 42,
              height: 42,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              bgcolor: 'scrollCue.circle',
              color: 'primary.main',
              boxShadow: '0 4px 8px var(--mui-palette-scrollCue-glow)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <MaskIcon className="ScrollCue-arrow" src="/icons/arrow-down.svg" size={21} />
          </Box>
        </Box>
      </ButtonBase>
    </Box>
  );
}
