import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  color?: 'primary' | 'secondary';
  href?: string;
};

export default function CtaButton({ children, color = 'primary', href }: Props) {
  const linkProps = href ? { component: Link, href } : { component: 'button' as const, type: 'button' as const };

  return (
    <Box
      {...linkProps}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        px: 3,
        border: 0,
        borderTopRightRadius: '8px',
        borderBottomLeftRadius: '8px',
        bgcolor: `${color}.main`,
        color: 'common.white',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        '&:focus-visible': { outline: '2px solid', outlineColor: `${color}.main`, outlineOffset: '2px' },
      }}
    >
      <Typography variant="buttonLabel">{children}</Typography>
    </Box>
  );
}
