import type { ComponentPropsWithoutRef } from 'react';
import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { oan } from '@/theme/oan';

type Props = {
  // Markdown text of a content file (event or blog write-up)
  body: string;
  // Ids for the ## headings, in order, so links can jump to them
  headingIds?: string[];
  // Widest a paragraph may be
  textMaxWidth?: number;
};

// Article text from a Markdown file, styled from the OAN style sheet (theme/oan.ts).
// react-markdown does not render raw HTML, which keeps the write-ups safe
export default function ArticleBody({ body, headingIds = [], textMaxWidth }: Props) {
  let headingIndex = 0;
  const Heading2 = ({ node, ...props }: ComponentPropsWithoutRef<'h2'> & { node?: unknown }) => {
    void node;
    return <h2 id={headingIds[headingIndex++]} {...props} />;
  };

  return (
    <Box
      sx={{
        // `typography` applies a text style from the theme by name
        '& p, & li': { typography: 'articleBody', m: 0, maxWidth: textMaxWidth },
        // Headings land below the sticky header when jumped to
        '& h2, & h3': { typography: 'articleHeading', m: 0, mt: '32px', mb: '11px', scrollMarginTop: '110px' },
        '& > :first-child': { mt: 0 },
        '& p + p, & p + ul, & p + ol, & ul + p, & ol + p': { mt: '12px' },
        '& h3': { fontSize: 16 },
        '& ul, & ol': { pl: 3, my: 0 },
        '& li + li': { mt: 1 },
        '& a': { color: 'primary.main', fontWeight: 600 },
        '& strong': { fontWeight: 700 },
        '& blockquote': { m: 0, my: 3, pl: 2, borderLeft: '3px solid', borderColor: 'primary.main', fontStyle: 'italic' },
        '& img': { maxWidth: '100%', height: 'auto', borderRadius: oan.layout.card.imageRadius },
        '& table': { width: '100%', borderCollapse: 'collapse', my: 3 },
        '& th, & td': { typography: 'articleBody', border: '1px solid', borderColor: 'card.border', p: 1, textAlign: 'left' },
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ h2: Heading2 }}>
        {body}
      </ReactMarkdown>
    </Box>
  );
}
