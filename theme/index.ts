'use client';
import { createTheme } from '@mui/material/styles';
import type { CSSProperties } from 'react';

declare module '@mui/material/styles' {
  interface TypeBackground {
    header: string;
    section: string;
    subtle: string;
  }
  interface TypeText {
    muted: string;
    heading: string;
    title: string;
    caption: string;
  }
  interface Palette {
    footer: { background: string; text: string; divider: string };
    card: { shadow: string; iconBackground: string; hoverOverlay: string; border: string; hoverBackground: string; arrowBackground: string; outline: string };
    statCard: { background: string; border: string };
    scrollCue: { circle: string; glow: string };
    tag: { background: string; text: string };
  }
  interface PaletteOptions {
    footer?: { background: string; text: string; divider: string };
    card?: { shadow: string; iconBackground: string; hoverOverlay: string; border: string; hoverBackground: string; arrowBackground: string; outline: string };
    statCard?: { background: string; border: string };
    scrollCue?: { circle: string; glow: string };
    tag?: { background: string; text: string };
  }
  interface TypographyVariants {
    navLink: CSSProperties;
    langLabel: CSSProperties;
    footnote: CSSProperties;
    heroTitle: CSSProperties;
    heroBody: CSSProperties;
    badge: CSSProperties;
    sectionTitle: CSSProperties;
    sectionLead: CSSProperties;
    cardTitle: CSSProperties;
    cardBody: CSSProperties;
    eyebrow: CSSProperties;
    sectionHeading: CSSProperties;
    cueLabel: CSSProperties;
    sectionIntro: CSSProperties;
    blockBody: CSSProperties;
    chip: CSSProperties;
    exploreLink: CSSProperties;
    headline: CSSProperties;
    statValue: CSSProperties;
    statLabel: CSSProperties;
    factLead: CSSProperties;
    factText: CSSProperties;
    actionLabel: CSSProperties;
    displayTitle: CSSProperties;
    label: CSSProperties;
  }
  interface TypographyVariantsOptions {
    navLink?: CSSProperties;
    langLabel?: CSSProperties;
    footnote?: CSSProperties;
    heroTitle?: CSSProperties;
    heroBody?: CSSProperties;
    badge?: CSSProperties;
    sectionTitle?: CSSProperties;
    sectionLead?: CSSProperties;
    cardTitle?: CSSProperties;
    cardBody?: CSSProperties;
    eyebrow?: CSSProperties;
    sectionHeading?: CSSProperties;
    cueLabel?: CSSProperties;
    sectionIntro?: CSSProperties;
    blockBody?: CSSProperties;
    chip?: CSSProperties;
    exploreLink?: CSSProperties;
    headline?: CSSProperties;
    statValue?: CSSProperties;
    statLabel?: CSSProperties;
    factLead?: CSSProperties;
    factText?: CSSProperties;
    actionLabel?: CSSProperties;
    displayTitle?: CSSProperties;
    label?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    navLink: true;
    langLabel: true;
    footnote: true;
    heroTitle: true;
    heroBody: true;
    badge: true;
    sectionTitle: true;
    sectionLead: true;
    cardTitle: true;
    cardBody: true;
    eyebrow: true;
    sectionHeading: true;
    cueLabel: true;
    sectionIntro: true;
    blockBody: true;
    chip: true;
    exploreLink: true;
    headline: true;
    statValue: true;
    statLabel: true;
    factLead: true;
    factText: true;
    actionLabel: true;
    displayTitle: true;
    label: true;
  }
}

const fonts = {
  primary: 'var(--font-montserrat), "Helvetica Neue", Arial, sans-serif',
  secondary: 'var(--font-noto-sans), "Helvetica Neue", Arial, sans-serif',
};

const theme = createTheme({
  cssVariables: true,
  breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1360, xl: 1536 } },
  palette: {
    primary: { main: '#1B5138' },
    secondary: { main: '#B45F06' },
    success: { main: '#128937' },
    text: { primary: '#2B2D2F', muted: '#9E9E9E', heading: '#232323', title: '#171717', caption: '#737373' },
    background: { default: '#FFFFFF', paper: '#FFFFFF', header: '#F9F9F9', section: '#F4F6F1', subtle: '#FAFBFA' },
    statCard: { background: '#FAFBF6', border: '#EAEFE3' },
    scrollCue: { circle: '#FFFFFF', glow: 'rgba(134, 219, 168, 0.6)' },
    tag: { background: '#EBF9F1', text: '#1F9254' },
    card: { shadow: 'rgba(0, 0, 0, 0.07)', iconBackground: '#DAEFC0', hoverOverlay: '#006D75', border: '#E5E5E5', hoverBackground: '#EBF6DB', arrowBackground: '#E7F7E9', outline: 'rgba(27, 81, 56, 0.1)' },
    footer: { background: '#1B5138', text: '#FFFFFF', divider: 'rgba(255, 255, 255, 0.1)' },
  },
  typography: {
    fontFamily: fonts.primary,
    button: { textTransform: 'none' },
    navLink: { fontFamily: fonts.primary, fontSize: 14, lineHeight: '20px', fontWeight: 600, letterSpacing: 0 },
    langLabel: { fontFamily: fonts.secondary, fontSize: 14, lineHeight: '20px', fontWeight: 600, letterSpacing: 0 },
    footnote: { fontFamily: fonts.primary, fontSize: 14, lineHeight: '20px', fontWeight: 300, letterSpacing: 0 },
    heroTitle: { fontFamily: fonts.primary, fontSize: 42, lineHeight: 1.2, fontWeight: 800, letterSpacing: '0.2px' },
    heroBody: { fontFamily: fonts.primary, fontSize: 14, lineHeight: 1.5, fontWeight: 500, letterSpacing: 0 },
    badge: { fontFamily: fonts.primary, fontSize: 14, lineHeight: 1.2, fontWeight: 700, letterSpacing: 0 },
    sectionTitle: { fontFamily: fonts.primary, fontSize: 28, lineHeight: 1.2, fontWeight: 400, letterSpacing: '0.56px' },
    sectionLead: { fontFamily: fonts.primary, fontSize: 16, lineHeight: 1.4, fontWeight: 400, letterSpacing: 0 },
    cardTitle: { fontFamily: fonts.primary, fontSize: 16, lineHeight: 1.2, fontWeight: 700, letterSpacing: 0 },
    cardBody: { fontFamily: fonts.primary, fontSize: 13, lineHeight: 1.2, fontWeight: 400, letterSpacing: 0 },
    eyebrow: { fontFamily: fonts.primary, fontSize: 14, lineHeight: 1.5, fontWeight: 700, letterSpacing: 0, textTransform: 'uppercase' },
    sectionHeading: { fontFamily: fonts.primary, fontSize: 34, lineHeight: 1.2, fontWeight: 800, letterSpacing: '0.2px' },
    cueLabel: { fontFamily: fonts.primary, fontSize: 16, lineHeight: 1.2, fontWeight: 700, letterSpacing: 0 },
    sectionIntro: { fontFamily: fonts.primary, fontSize: 14, lineHeight: 1.5, fontWeight: 500, letterSpacing: 0 },
    blockBody: { fontFamily: fonts.primary, fontSize: 14, lineHeight: 1.2, fontWeight: 400, letterSpacing: 0 },
    chip: { fontFamily: fonts.primary, fontSize: 12, lineHeight: 1.2, fontWeight: 400, letterSpacing: '0.2px' },
    exploreLink: { fontFamily: fonts.primary, fontSize: 14, lineHeight: 1.2, fontWeight: 700, letterSpacing: 0 },
    headline: { fontFamily: fonts.primary, fontSize: 28, lineHeight: 1.2, fontWeight: 600, letterSpacing: '0.56px' },
    statValue: { fontFamily: fonts.primary, fontSize: 28, lineHeight: 1, fontWeight: 900, letterSpacing: '0.2px' },
    statLabel: { fontFamily: fonts.primary, fontSize: 14, lineHeight: '20px', fontWeight: 400, letterSpacing: 0 },
    factLead: { fontFamily: fonts.primary, fontSize: 20, lineHeight: '26px', fontWeight: 700, letterSpacing: 0 },
    factText: { fontFamily: fonts.primary, fontSize: 18, lineHeight: '26px', fontWeight: 400, letterSpacing: 0 },
    actionLabel: { fontFamily: fonts.primary, fontSize: 14, lineHeight: '20px', fontWeight: 700, letterSpacing: 0 },
    displayTitle: { fontFamily: fonts.primary, fontSize: 36, lineHeight: 1.2, fontWeight: 800, letterSpacing: '0.2px' },
    label: { fontFamily: fonts.primary, fontSize: 14, lineHeight: 1.2, fontWeight: 700, letterSpacing: 0 },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          navLink: 'span',
          langLabel: 'span',
          footnote: 'p',
          heroTitle: 'h1',
          heroBody: 'p',
          badge: 'span',
          sectionTitle: 'h2',
          sectionLead: 'p',
          cardTitle: 'h3',
          cardBody: 'p',
          eyebrow: 'span',
          sectionHeading: 'h2',
          cueLabel: 'p',
          sectionIntro: 'p',
          blockBody: 'p',
          chip: 'span',
          exploreLink: 'span',
          headline: 'h2',
          statValue: 'p',
          statLabel: 'p',
          factLead: 'span',
          factText: 'span',
          actionLabel: 'span',
          displayTitle: 'h1',
          label: 'span',
        },
      },
    },
  },
});

export default theme;
