'use client';
import { createTheme } from '@mui/material/styles';
import type { CSSProperties } from 'react';

declare module '@mui/material/styles' {
  interface TypeBackground {
    header: string;
  }
  interface TypeText {
    muted: string;
  }
  interface Palette {
    footer: { background: string; text: string; divider: string };
  }
  interface PaletteOptions {
    footer?: { background: string; text: string; divider: string };
  }
  interface TypographyVariants {
    navLink: CSSProperties;
    langLabel: CSSProperties;
    footnote: CSSProperties;
  }
  interface TypographyVariantsOptions {
    navLink?: CSSProperties;
    langLabel?: CSSProperties;
    footnote?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    navLink: true;
    langLabel: true;
    footnote: true;
  }
}

const fonts = {
  primary: 'var(--font-montserrat), "Helvetica Neue", Arial, sans-serif',
  secondary: 'var(--font-noto-sans), "Helvetica Neue", Arial, sans-serif',
};

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: { main: '#1B5138' },
    secondary: { main: '#B85C0A' },
    text: { primary: '#2B2D2F', muted: '#9E9E9E' },
    background: { default: '#FFFFFF', paper: '#FFFFFF', header: '#F9F9F9' },
    footer: { background: '#1B5138', text: '#FFFFFF', divider: 'rgba(255, 255, 255, 0.1)' },
  },
  typography: {
    fontFamily: fonts.primary,
    button: { textTransform: 'none' },
    navLink: { fontFamily: fonts.primary, fontSize: 14, lineHeight: '20px', fontWeight: 600, letterSpacing: 0 },
    langLabel: { fontFamily: fonts.secondary, fontSize: 14, lineHeight: '20px', fontWeight: 600, letterSpacing: 0 },
    footnote: { fontFamily: fonts.primary, fontSize: 14, lineHeight: '20px', fontWeight: 300, letterSpacing: 0 },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: { navLink: 'span', langLabel: 'span', footnote: 'p' },
      },
    },
  },
});

export default theme;
