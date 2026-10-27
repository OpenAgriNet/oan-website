'use client';
/* eslint-disable @next/next/no-img-element */
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
        gap: 3,
      }}
    >
      <GlobalStyles styles={viewTransitionStyles} />
      <Box
        role="tablist"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2 }}
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
                gap: 2,
                width: '100%',
                px: 2,
                py: 3,
                font: 'inherit',
                textAlign: 'left',
                border: '1px solid',
                borderColor: selected ? 'primary.main' : 'rgba(var(--mui-palette-primary-mainChannel) / 0.1)',
                borderTopLeftRadius: '12px',
                borderBottomRightRadius: '12px',
                bgcolor: selected ? 'card.iconBackground' : 'background.paper',
                boxShadow: '0 4px 12px var(--mui-palette-card-shadow)',
                cursor: tab.panel ? 'pointer' : 'default',
                transition: `background-color ${transition}, border-color ${transition}`,
                '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: '2px' },
                '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
                <img src={tab.icon} alt="" width={52} height={52} style={{ flexShrink: 0 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0, color: 'text.heading' }}>
                  <Typography variant="cardTitle" component="span">
                    {tab.title}
                  </Typography>
                  <Typography variant="blockBody" component="span">
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
            alignItems: 'center',
            minHeight: { lg: 650 },
            px: { xs: 3, md: '38px' },
            py: '27px',
            border: '1px solid rgba(35, 35, 35, 0.1)',
            borderRadius: '16px',
            bgcolor: 'background.paper',
          }}
        >
          <Box
            aria-hidden
            style={vt('image')}
            sx={{ position: 'absolute', top: '1px', right: 0, bottom: 0, width: { xs: '100%', sm: 464 } }}
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
              display: { lg: 'none' },
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
            <Box style={vt('pill')} sx={{ display: 'flex', '& .MuiTypography-badge': vt('pill-label', true) }}>
              <PillBadge icon={null}>{active.panel.badge}</PillBadge>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 4, lg: '54px' }, width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minHeight: { lg: 85 }, color: 'text.heading' }}>
                <Typography component="h3" style={vt('heading', true)} sx={{ fontSize: { xs: 20, sm: 24 }, lineHeight: 1.2, fontWeight: 700 }}>
                  {active.panel.heading}
                </Typography>
                <Typography variant="cardBody" style={vt('description', true)} sx={figmaBreaks}>
                  {active.panel.description}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
                  <Box style={vt('divider')} sx={{ height: '1px', bgcolor: 'rgba(35, 35, 35, 0.1)' }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, color: 'text.heading' }}>
                    <Typography component="h4" style={vt('ways-title', true)} sx={{ fontSize: 18, lineHeight: 1.2, fontWeight: 700 }}>
                      {waysTitle}
                    </Typography>
                    <Box component="ul" sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, lg: '33px' }, m: 0, p: 0 }}>
                      {active.panel.ways.map((way, index) => (
                        <Box component="li" key={index} sx={{ display: 'flex', gap: 2, listStyle: 'none' }}>
                          <Box
                            style={vt(`check-${index}`)}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              width: 28,
                              height: 28,
                              borderRadius: '50%',
                              bgcolor: 'success.main',
                            }}
                          >
                            <img src="/icons/check.svg" alt="" width={23.52} height={23.52} />
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
                            <Typography variant="cardTitle" component="span" style={vt(`way-${index}-title`, true)}>
                              {way.title}
                            </Typography>
                            <Typography variant="cardBody" component="span" style={vt(`way-${index}-text`, true)} sx={figmaBreaks}>
                              {way.description}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
                {/* The button morphs its width while the label cross-fades */}
                <ActionButton style={vt('action')}>
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
