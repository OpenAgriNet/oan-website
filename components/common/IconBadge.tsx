import Box from '@mui/material/Box';
import type { ReactNode } from 'react';

type Props = {
  icon?: string;
  children?: ReactNode;
  size?: number;
};

export default function IconBadge({ icon, children, size = 52 }: Props) {
  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        bgcolor: 'card.iconBackground',
        color: 'primary.main',
      }}
    >
      {icon ? (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: 'primary.main',
            maskImage: `url(${icon})`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
          }}
        />
      ) : (
        children
      )}
    </Box>
  );
}
