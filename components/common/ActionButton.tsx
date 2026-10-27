'use client';
import Button, { type ButtonProps } from '@mui/material/Button';
import Link from 'next/link';
import MaskIcon from './MaskIcon';

type Props = Omit<ButtonProps, 'variant' | 'color' | 'href' | 'LinkComponent'> & {
  tone?: 'primary' | 'secondary';
  // Renders a link when set, otherwise a plain button
  href?: string;
};

// Figma button components 110/111: hover is Smart Animate, ease-in-out, 300ms
const transition = '300ms ease-in-out';

export default function ActionButton({ tone = 'primary', sx, children, ...props }: Props) {
  return (
    <Button
      LinkComponent={Link}
      variant="contained"
      color={tone}
      disableElevation
      {...props}
      sx={[
        (theme) => ({
          ...theme.typography.actionLabel,
          minHeight: 52,
          // 23px + the 1px border keeps Figma's 24px padding
          px: '23px',
          borderRadius: '0 8px 0 8px',
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          border: '1px solid',
          borderColor: `${tone}.main`,
          transition: `background-color ${transition}, color ${transition}`,
          '& .arrow': { width: 0, ml: 0, opacity: 0, overflow: 'hidden', transition: `width ${transition}, margin ${transition}, opacity ${transition}` },
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
