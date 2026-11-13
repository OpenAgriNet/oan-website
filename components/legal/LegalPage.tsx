import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import SiteContainer from '@/components/layout/SiteContainer';

type Section = { heading?: string; paragraphs: string[] };

// Legal copy is kept verbatim from the client document, with light markup: **bold**, [label](url) and bare email addresses
const TOKEN = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)|([\w.+-]+@[\w-]+(?:\.[\w-]+)*\.[a-z]{2,})/g;

function renderText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    const [whole, bold, label, url, email] = match;
    nodes.push(text.slice(last, match.index));
    const key = match.index;
    if (bold) nodes.push(<strong key={key}>{bold}</strong>);
    else if (label) nodes.push(<a key={key} href={url} target="_blank" rel="noopener noreferrer">{label}</a>);
    else nodes.push(<a key={key} href={`mailto:${email}`}>{email}</a>);
    last = match.index + whole.length;
  }
  nodes.push(text.slice(last));
  return nodes;
}

// Footer links jump to these anchors
const documents = [
  { key: 'termsOfUse', id: 'terms-of-use' },
  { key: 'privacyPolicy', id: 'privacy-policy' },
] as const;

export default async function LegalPage() {
  const t = await getTranslations('Legal');

  return (
    <Box component="section" sx={{ bgcolor: 'background.default', py: { xs: 4, md: 8 } }}>
      <SiteContainer sx={{ px: { xs: '20px', sm: 4, md: 5, lg: 10 } }}>
        <Box
          sx={{
            maxWidth: 880,
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 5, md: 7 },
            color: 'text.primary',
            '& p': { fontSize: { xs: 14, sm: 16 }, lineHeight: 1.6, overflowWrap: 'anywhere' },
            '& a': { color: 'primary.main', fontWeight: 600 },
          }}
        >
          <Typography variant="sectionHeading" component="h1" sx={{ color: 'text.heading', fontSize: { xs: 26, md: 34 } }}>
            {t('title')}
          </Typography>
          {documents.map(({ key, id }) => (
            <Box
              key={key}
              id={id}
              component="article"
              // Keeps the heading clear of the sticky header when jumped to from the footer
              sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 }, scrollMarginTop: { xs: '72px', md: '90px' } }}
            >
              <Typography variant="headline" component="h2" sx={{ color: 'text.heading', fontSize: { xs: 22, md: 28 } }}>
                {t(`${key}.title`)}
              </Typography>
              {(t.raw(`${key}.sections`) as Section[]).map(({ heading, paragraphs }, index) => (
                <Box key={heading ?? index} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {heading && (
                    <Typography variant="cardTitle" component="h3" sx={{ color: 'text.title', fontSize: { xs: 16, sm: 18 } }}>
                      {heading}
                    </Typography>
                  )}
                  {paragraphs.map((paragraph) => (
                    <Typography key={paragraph} component="p">
                      {renderText(paragraph)}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </SiteContainer>
    </Box>
  );
}
