'use client';
import Button, { type ButtonProps } from '@mui/material/Button';
import Link from 'next/link';
import MaskIcon from './MaskIcon';

type Props = Omit<ButtonProps<typeof Link>, 'component' | 'variant' | 'color'> & {
  tone?: 'primary' | 'secondary';
};

export default function ActionButton({ tone = 'primary', sx, children, ...props }: Props) {
  return (
    <Button
      component={Link}
      variant="contained"
      color={tone}
      disableElevation
      {...props}
      sx={[
        (theme) => ({
          ...theme.typography.actionLabel,
          minHeight: 52,
          px: '25px',
          borderRadius: '0 8px 0 8px',
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          border: '2px solid',
          borderColor: `${tone}.main`,
          transition: 'background-color 0.25s ease, color 0.25s ease',
          '& .arrow': { width: 0, ml: 0, opacity: 0, overflow: 'hidden', transition: 'width 0.25s ease, margin 0.25s ease, opacity 0.25s ease' },
          '&:hover, &:focus-visible': {
            bgcolor: 'background.paper',
            color: `${tone}.main`,
            '& .arrow': { width: 20, ml: '10px', opacity: 1 },
          },
          '&:focus-visible': { outline: `2px solid ${theme.palette[tone].main}`, outlineOffset: 2 },
          '@media (prefers-reduced-motion: reduce)': { transition: 'none', '& .arrow': { transition: 'none' } },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
      <MaskIcon className="arrow" src="/icons/arrow-right.svg" size={20} />
    </Button>
  );
}
