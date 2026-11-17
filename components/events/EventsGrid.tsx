'use client';
import Box from '@mui/material/Box';
import { Children, useState, type ReactNode } from 'react';
import ActionButton from '@/components/common/ActionButton';

// One row of cards on desktop; "View All" appears only when there are more, and reveals the rest in place
const VISIBLE = 3;

// Three cards need about 1100px; below that they wrap
const wide = '@media (min-width: 1100px)';

// Mobile Figma: a full-width, smaller button with no hover arrow
const mobileButton = {
  width: { xs: '100%', sm: 'auto' },
  minHeight: { xs: 42, sm: 52 },
  fontSize: { xs: 12, sm: 14 },
  '& .arrow': { display: { xs: 'none', sm: 'block' } },
};

type Props = {
  actionLabel: string;
  children: ReactNode;
};

export default function EventsGrid({ actionLabel, children }: Props) {
  const [expanded, setExpanded] = useState(false);
  const cards = Children.toArray(children);
  const hasMore = cards.length > VISIBLE;

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
          gap: { xs: 3, sm: '30px' },
          [wide]: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
        }}
      >
        {expanded ? cards : cards.slice(0, VISIBLE)}
      </Box>
      {hasMore && !expanded && (
        <ActionButton onClick={() => setExpanded(true)} sx={{ alignSelf: 'center', ...mobileButton }}>
          {actionLabel}
        </ActionButton>
      )}
    </>
  );
}
