'use client';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { flushSync } from 'react-dom';
import ActionButton from '@/components/common/ActionButton';
import PillBadge from '@/components/common/PillBadge';
import MaskIcon from '@/components/common/MaskIcon';

export type InvolvementTab = {
  key: string;
  icon: string;
  title: string;
  summary: string;
  panel?: {
    image: string;
    badge: string;
    heading: string;
    description: string;
    ways: { title: string; description: string }[];
    action: string;
  };
};

type Props = {
  tabs: InvolvementTab[];
  waysTitle: string;
};

// Figma variant change: Smart Animate, ease-in-out, 300ms
const transition = '300ms ease-in-out';

// Smart Animate morphs layers that exist in both variants and cross-fades their content.
// A view transition does the same: each named element morphs its size and position.
// Text uses the `involve-text` class so it cross-fades at its natural size instead of stretching.
const vt = (name: string, text = false) =>
  ({ viewTransitionName: `involve-${name}`, ...(text && { viewTransitionClass: 'involve-text' }) }) as CSSProperties;

const viewTransitionStyles = {
  '::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*)': {
    animationDuration: '300ms',
    animationTimingFunction: 'ease-in-out',
  },
  '::view-transition-old(*.involve-text), ::view-transition-new(*.involve-text)': {
    width: 'auto',
    height: 'auto',
    objectFit: 'none',
  },
};

// Mobile Figma: a smaller button with no hover arrow
const mobileButton = {
  minHeight: { xs: 42, sm: 52 },
  fontSize: { xs: 12, sm: 14 },
  '& .arrow': { display: { xs: 'none', sm: 'block' } },
};

// Figma's forced line breaks only apply at the designed width
const figmaBreaks = { whiteSpace: { xs: 'normal', lg: 'pre-line' } } as const;

export default function InvolvementTabs({ tabs, waysTitle }: Props) {
  const selectable = tabs.filter((tab) => tab.panel);
  const [activeKey, setActiveKey] = useState(selectable[0]?.key);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const active = selectable.find((tab) => tab.key === activeKey);

  const select = (key: string) => {
    if (key === activeKey) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduceMotion) {
      setActiveKey(key);
      return;
    }
    document.startViewTransition(() => flushSync(() => setActiveKey(key)));
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const index = selectable.findIndex((tab) => tab.key === activeKey);
    const next = selectable[(index + step + selectable.length) % selectable.length];
    select(next.key);
    tabRefs.current[next.key]?.focus();
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 474fr) minmax(0, 782fr)' },
        gap: { xs: '20px', sm: 3 },
      }}
    >
      <GlobalStyles styles={viewTransitionStyles} />
      <Box
        role="tablist"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', sm: 'column' },
          justifyContent: 'space-between',
          gap: { xs: '12px', sm: 2 },
          // Mobile Figma: one row of compact tabs that scrolls sideways, bleeding to the screen edges
          overflowX: { xs: 'auto', sm: 'visible' },
          mx: { xs: '-20px', sm: 0 },
          px: { xs: '20px', sm: 0 },
          pb: { xs: '24px', sm: 0 },
          mb: { xs: '-24px', sm: 0 },
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {tabs.map((tab) => {
          const selected = tab.key === activeKey;
          return (
            <Box
              key={tab.key}
              component="button"
              type="button"
              role="tab"
              id={`involve-tab-${tab.key}`}
              ref={(node: HTMLButtonElement | null) => {
                tabRefs.current[tab.key] = node;
              }}
              aria-selected={selected}
              aria-controls={tab.panel ? 'involve-panel' : undefined}
              aria-disabled={tab.panel ? undefined : true}
              tabIndex={selected ? 0 : -1}
              onClick={tab.panel ? () => select(tab.key) : undefined}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                // Mobile Figma gives the text 170px of the 246px tab, so the arrow sits right after it
                gap: { xs: '2px', sm: 2 },
                flex: { xs: '0 0 246px', sm: 'none' },
                width: { xs: 246, sm: '100%' },
                px: { xs: 1, sm: 2 },
                py: { xs: 1, sm: 3 },
                font: 'inherit',
                textAlign: 'left',
                border: '1px solid',
                borderColor: selected ? 'primary.main' : 'rgba(var(--mui-palette-primary-mainChannel) / 0.1)',
                borderTopLeftRadius: '12px',
                borderBottomRightRadius: '12px',
                bgcolor: selected ? 'card.iconBackground' : 'background.paper',
                boxShadow: { xs: '0 4px 24px var(--mui-palette-card-shadow)', sm: '0 4px 12px var(--mui-palette-card-shadow)' },
                cursor: tab.panel ? 'pointer' : 'default',
                transition: `background-color ${transition}, border-color ${transition}`,
                '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: '2px' },
                '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, minWidth: 0 }}>
                <Box component="img" src={tab.icon} alt="" sx={{ flexShrink: 0, width: { xs: 32, sm: 52 }, height: 'auto' }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '4px', sm: 1 }, minWidth: 0, color: 'text.heading' }}>
                  <Typography variant="cardTitle" component="span" sx={{ fontSize: { xs: 12, sm: 16 } }}>
                    {tab.title}
                  </Typography>
                  <Typography variant="blockBody" component="span" sx={{ fontSize: { xs: 11, sm: 14 } }}>
                    {tab.summary}
                  </Typography>
                </Box>
              </Box>
              <MaskIcon src="/icons/chevron-down.svg" size={18} sx={{ color: 'primary.main', transform: 'rotate(-90deg)' }} />
            </Box>
          );
        })}
      </Box>
      {active?.panel && (
        <Box
          role="tabpanel"
          id="involve-panel"
          aria-labelledby={`involve-tab-${active.key}`}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: { xs: 'flex-start', sm: 'center' },
            minHeight: { xs: 541, sm: 0, lg: 650 },
            px: { xs: '12px', sm: 3, md: '38px' },
            pt: { xs: 2, sm: '27px' },
            pb: { xs: '34px', sm: '27px' },
            border: '1px solid rgba(35, 35, 35, 0.1)',
            borderRadius: '16px',
            bgcolor: { xs: 'background.panel', sm: 'background.paper' },
          }}
        >
          <Box
            aria-hidden
            style={vt('image')}
            sx={{
              position: 'absolute',
              top: { xs: 'auto', sm: '1px' },
              right: 0,
              bottom: 0,
              // Mobile Figma: a 248x375 photo in the bottom corner at 40% opacity
              width: { xs: 248, sm: 464 },
              height: { xs: 375, sm: 'auto' },
              opacity: { xs: 0.4, sm: 1 },
              overflow: 'hidden',
              borderBottomRightRadius: { xs: '16px', sm: 0 },
            }}
          >
            {selectable.map((tab) => (
              <Image
                key={tab.key}
                src={tab.panel!.image}
                alt=""
                fill
                sizes="464px"
                style={{ objectFit: 'cover', opacity: tab.key === active.key ? 1 : 0 }}
              />
            ))}
          </Box>
          {/* Not in Figma: keeps the copy readable once the panel is narrower than the 782px design */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              display: { xs: 'none', sm: 'block', lg: 'none' },
              background: {
                xs: 'rgba(255, 255, 255, 0.85)',
                sm: 'linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 60%, rgba(255, 255, 255, 0) 100%)',
              },
            }}
          />
          <Box
            sx={{
              position: 'relative',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '26px',
            }}
          >
            {/* The pill background morphs its width while the label cross-fades */}
            <Box
              style={vt('pill')}
              sx={{
                display: 'flex',
                '& .MuiTypography-badge': { ...vt('pill-label', true), fontSize: { xs: 11, sm: 14 } },
                '& > :first-child': { height: { xs: 23, sm: 30 } },
              }}
            >
              <PillBadge icon={null}>{active.panel.badge}</PillBadge>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 4, lg: '54px' }, width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minHeight: { xs: 85, sm: 0, lg: 85 }, color: 'text.heading' }}>
                <Typography component="h3" style={vt('heading', true)} sx={{ fontSize: { xs: 18, sm: 24 }, lineHeight: 1.2, fontWeight: 700 }}>
                  {active.panel.heading}
                </Typography>
                <Typography variant="cardBody" style={vt('description', true)} sx={{ ...figmaBreaks, fontSize: { xs: 12, sm: 13 } }}>
                  {active.panel.description}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, sm: 4 }, alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
                  <Box style={vt('divider')} sx={{ height: '1px', bgcolor: 'rgba(35, 35, 35, 0.1)' }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, color: 'text.heading' }}>
                    <Typography component="h4" style={vt('ways-title', true)} sx={{ fontSize: { xs: 16, sm: 18 }, lineHeight: 1.2, fontWeight: 700 }}>
                      {waysTitle}
                    </Typography>
                    <Box component="ul" sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '33px', sm: 3, lg: '33px' }, m: 0, p: 0 }}>
                      {active.panel.ways.map((way, index) => (
                        <Box component="li" key={index} sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, listStyle: 'none' }}>
                          <Box
                            style={vt(`check-${index}`)}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              width: { xs: 24, sm: 28 },
                              height: { xs: 24, sm: 28 },
                              borderRadius: '50%',
                              bgcolor: 'success.main',
                            }}
                          >
                            <Box component="img" src="/icons/check.svg" alt="" sx={{ width: { xs: 14, sm: 23.52 }, height: 'auto' }} />
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
                            <Typography variant="cardTitle" component="span" style={vt(`way-${index}-title`, true)} sx={{ fontSize: { xs: 14, sm: 16 } }}>
                              {way.title}
                            </Typography>
                            <Typography
                              variant="cardBody"
                              component="span"
                              style={vt(`way-${index}-text`, true)}
                              sx={{ ...figmaBreaks, fontSize: { xs: 12, sm: 13 } }}
                            >
                              {way.description}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
                {/* The button morphs its width while the label cross-fades */}
                <ActionButton style={vt('action')} sx={mobileButton}>
                  <span style={vt('action-label', true)}>{active.panel.action}</span>
                </ActionButton>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
