import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

type Props = {
  icon?: string;
  children?: ReactNode;
  size?: number;
  sx?: SxProps<Theme>;
};

export default function IconBadge({ icon, children, size = 52, sx }: Props) {
  return (
    <Box
      aria-hidden
      sx={[
        {
          width: size,
          height: size,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          bgcolor: 'card.iconBackground',
          color: 'primary.main',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
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
