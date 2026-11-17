'use client';
import { createTheme } from '@mui/material/styles';
import type { CSSProperties } from 'react';
import { oan, type OanTextStyle } from './oan';

declare module '@mui/material/styles' {
  interface TypeBackground {
    header: string;
    section: string;
    subtle: string;
    sky: string;
    panel: string;
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
    // OAN style sheet text styles (theme/oan.ts)
    pageHeroTitle: CSSProperties;
    pageHeroDescription: CSSProperties;
    sectionHeadline: CSSProperties;
    sectionDescription: CSSProperties;
    cardCategory: CSSProperties;
    cardDate: CSSProperties;
    cardHeading: CSSProperties;
    cardSummary: CSSProperties;
    cardLink: CSSProperties;
    articleTitle: CSSProperties;
    articleHeading: CSSProperties;
    articleBody: CSSProperties;
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
    pageHeroTitle?: CSSProperties;
    pageHeroDescription?: CSSProperties;
    sectionHeadline?: CSSProperties;
    sectionDescription?: CSSProperties;
    cardCategory?: CSSProperties;
    cardDate?: CSSProperties;
    cardHeading?: CSSProperties;
    cardSummary?: CSSProperties;
    cardLink?: CSSProperties;
    articleTitle?: CSSProperties;
    articleHeading?: CSSProperties;
    articleBody?: CSSProperties;
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
    pageHeroTitle: true;
    pageHeroDescription: true;
    sectionHeadline: true;
    sectionDescription: true;
    cardCategory: true;
    cardDate: true;
    cardHeading: true;
    cardSummary: true;
    cardLink: true;
    articleTitle: true;
    articleHeading: true;
    articleBody: true;
  }
}

const { fonts, colors } = oan;

// Builds an MUI text style from an OAN style sheet entry: phone size first, larger screens via media queries
function oanText(style: (typeof oan.text)[OanTextStyle]): CSSProperties {
  const { size, lineHeight, weight, color } = style;
  const css: Record<string, unknown> = {
    fontFamily: fonts.primary,
    fontSize: size.xs,
    lineHeight,
    fontWeight: weight,
    color: color === 'primary' ? colors.primary : colors.text[color],
  };
  if ('letterSpacing' in style) css.letterSpacing = style.letterSpacing.xs;
  if ('uppercase' in style) css.textTransform = 'uppercase';
  if ('underline' in style) css.textDecoration = 'underline';
  for (const bp of ['sm', 'md', 'lg'] as const) {
    const fontSize = (size as Partial<Record<typeof bp, number>>)[bp];
    const letterSpacing = 'letterSpacing' in style ? (style.letterSpacing as Partial<Record<typeof bp, string>>)[bp] : undefined;
    if (fontSize === undefined && letterSpacing === undefined) continue;
    css[`@media (min-width:${oan.breakpoints[bp]}px)`] = { ...(fontSize !== undefined && { fontSize }), ...(letterSpacing !== undefined && { letterSpacing }) };
  }
  return css as CSSProperties;
}

const theme = createTheme({
  cssVariables: true,
  breakpoints: { values: oan.breakpoints },
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.accent },
    success: { main: colors.success },
    text: { primary: colors.text.body, muted: colors.text.muted, heading: colors.text.heading, title: colors.text.title, caption: colors.text.caption },
    background: colors.background,
    statCard: colors.statCard,
    scrollCue: colors.scrollCue,
    tag: colors.tag,
    card: colors.card,
    footer: colors.footer,
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
    // OAN style sheet text styles, generated from theme/oan.ts
    pageHeroTitle: oanText(oan.text.pageHeroTitle),
    pageHeroDescription: oanText(oan.text.pageHeroDescription),
    sectionHeadline: oanText(oan.text.sectionHeadline),
    sectionDescription: oanText(oan.text.sectionDescription),
    cardCategory: oanText(oan.text.cardCategory),
    cardDate: oanText(oan.text.cardDate),
    cardHeading: oanText(oan.text.cardHeading),
    cardSummary: oanText(oan.text.cardSummary),
    cardLink: oanText(oan.text.cardLink),
    articleTitle: oanText(oan.text.articleTitle),
    articleHeading: oanText(oan.text.articleHeading),
    articleBody: oanText(oan.text.articleBody),
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
          pageHeroTitle: 'h1',
          pageHeroDescription: 'p',
          sectionHeadline: 'h2',
          sectionDescription: 'p',
          cardCategory: 'span',
          cardDate: 'span',
          cardHeading: 'h3',
          cardSummary: 'p',
          cardLink: 'span',
          articleTitle: 'h1',
          articleHeading: 'h2',
          articleBody: 'p',
        },
      },
    },
  },
});

export default theme;
