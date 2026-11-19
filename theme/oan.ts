// OAN style sheet: the single place for design values (colours, text styles, layout) taken from Figma.
// theme/index.ts turns these into the MUI theme; pages use the named styles and never hard-code values.
// Changing a value here changes it everywhere it is used.

export const oan = {
  colors: {
    primary: '#1B5138',
    accent: '#B45F06',
    success: '#128937',
    text: { body: '#2B2D2F', muted: '#9E9E9E', heading: '#232323', title: '#171717', caption: '#737373', meta: '#404040' },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
      header: '#F9F9F9',
      section: '#F4F6F1',
      subtle: '#FAFBFA',
      sky: '#ECF7FE',
      panel: '#FAFDFE',
    },
    statCard: { background: '#FAFBF6', border: '#EAEFE3' },
    scrollCue: { circle: '#FFFFFF', glow: 'rgba(134, 219, 168, 0.6)' },
    tag: { background: '#EBF9F1', text: '#1F9254' },
    card: {
      shadow: 'rgba(0, 0, 0, 0.07)',
      iconBackground: '#DAEFC0',
      hoverOverlay: '#006D75',
      border: '#E5E5E5',
      hoverBackground: '#EBF6DB',
      arrowBackground: '#E7F7E9',
      outline: 'rgba(27, 81, 56, 0.1)',
      // Panel and round button borders, e.g. "Inside This Article" on the blog page
      divider: '#D9D9D9',
    },
    footer: { background: '#1B5138', text: '#FFFFFF', divider: 'rgba(255, 255, 255, 0.1)' },
  },

  fonts: {
    primary: 'var(--font-montserrat), "Helvetica Neue", Arial, sans-serif',
    secondary: 'var(--font-noto-sans), "Helvetica Neue", Arial, sans-serif',
  },

  breakpoints: { xs: 0, sm: 600, md: 900, lg: 1360, xl: 1536 },

  // Shared text styles. `size` is per screen size (phone first); `color` points at colors.text or colors.primary
  text: {
    // Page hero (Events, Community): title, e.g. "Connecting ideas, people and possibilities." (second line in the accent colour)
    pageHeroTitle: { size: { xs: 28, sm: 36 }, lineHeight: 1.2, weight: 800, letterSpacing: { xs: '0.2px' }, color: 'heading' },
    // Page hero text under the title
    pageHeroDescription: { size: { xs: 14 }, lineHeight: 1.5, weight: 500, letterSpacing: { xs: '0px' }, color: 'heading' },
    // Section title, e.g. "Explore what's coming up."
    sectionHeadline: { size: { xs: 20, sm: 28 }, lineHeight: 1.2, weight: 600, letterSpacing: { xs: '0.4px', sm: '0.56px' }, color: 'heading' },
    // Paragraph next to a section title
    sectionDescription: { size: { xs: 12, sm: 14 }, lineHeight: 1.4, weight: 400, color: 'heading' },
    // Card label above the title, e.g. "TECHNOLOGY"
    cardCategory: { size: { xs: 14 }, lineHeight: '20px', weight: 500, uppercase: true, color: 'primary' },
    // Card date, e.g. "Oct 15, 2026"
    cardDate: { size: { xs: 12 }, lineHeight: 1.2, weight: 400, color: 'caption' },
    // Card title in a grid
    cardHeading: { size: { xs: 16 }, lineHeight: 1.2, weight: 700, color: 'title' },
    // Card summary in a grid
    cardSummary: { size: { xs: 13 }, lineHeight: 1.4, weight: 400, color: 'heading' },
    // Card link, e.g. "Read More"
    cardLink: { size: { xs: 16 }, lineHeight: 1.5, weight: 700, underline: true, color: 'primary' },
    // Wide featured card (Blog page)
    featuredDate: { size: { xs: 14 }, lineHeight: 1.2, weight: 400, color: 'caption' },
    featuredTitle: { size: { xs: 16, sm: 18 }, lineHeight: 1.2, weight: 700, color: 'title' },
    featuredSummary: { size: { xs: 13, sm: 14 }, lineHeight: 1.6, weight: 400, color: 'heading' },
    // Article pages (event and blog pages with a write-up)
    articleTitle: { size: { xs: 24, sm: 32 }, lineHeight: 1.1875, weight: 700, color: 'title' },
    // Date under the blog title, e.g. "28 Oct 2026, 10:30 AM"
    articleDate: { size: { xs: 16, sm: 20 }, lineHeight: 1.2, weight: 400, color: 'meta' },
    // Section headings in the article, and the blog sidebar titles ("Inside This Article", "Related Blog")
    articleHeading: { size: { xs: 18 }, lineHeight: 1.2, weight: 700, color: 'title' },
    articleBody: { size: { xs: 13 }, lineHeight: '18px', weight: 400, color: 'heading' },
    // "Inside This Article" links (blog page)
    contentsLink: { size: { xs: 14 }, lineHeight: '28px', weight: 400, color: 'title' },
  },

  layout: {
    // Content column at desktop width (Figma: 1293px starting at x=79 on a 1440 frame)
    contentWidth: 1293,
    pagePaddingX: { xs: '20px', sm: '32px', md: '40px', lg: '0px' },
    sectionGap: { xs: '24px', sm: '32px', lg: '36px' },
    cardGap: '30px',
    cardRowGap: '36px',
    card: { radius: '16px', padding: '12px 16px', imageRadius: '8px', imageHeight: 196, shadowHover: '0 8px 28px rgba(0, 0, 0, 0.14)' },
    tag: { radius: '22px', padding: '8px 12px', size: 12, weight: 500 },
    // Blog detail page at 1440px: article column x=80-820, sidebar x=930-1370
    article: { width: 1290, columnGap: '110px', mainWidth: 740, titleWidth: 511, textWidth: 730, sidebarWidth: 440, panelRadius: '12px', imageRadius: '12px' },
  },
} as const;

export type OanTextStyle = keyof typeof oan.text;
