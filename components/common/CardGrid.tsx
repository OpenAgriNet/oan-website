'use client';
import Box from '@mui/material/Box';
import { Children, useState, type ReactNode } from 'react';
import ActionButton from '@/components/common/ActionButton';
import { oan } from '@/theme/oan';

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
  // Cards shown before "View All" (e.g. one row of three on the Events page)
  visible: number;
  // Space between rows of cards; between columns it is always the style sheet's card gap
  rowGap?: { xs: string; sm: string };
  children: ReactNode;
};

// Grid of cards (one column on phones, two on tablets, three from 1100px). "View All" appears only when there are more
// cards than `visible`, and reveals the rest in place
export default function CardGrid({ actionLabel, visible, rowGap = { xs: '24px', sm: oan.layout.cardGap }, children }: Props) {
  const [expanded, setExpanded] = useState(false);
  const cards = Children.toArray(children);
  const hasMore = cards.length > visible;

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
          columnGap: oan.layout.cardGap,
          rowGap,
          [wide]: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
        }}
      >
        {expanded ? cards : cards.slice(0, visible)}
      </Box>
      {hasMore && !expanded && (
        <ActionButton onClick={() => setExpanded(true)} sx={{ alignSelf: 'center', ...mobileButton }}>
          {actionLabel}
        </ActionButton>
      )}
    </>
  );
}
