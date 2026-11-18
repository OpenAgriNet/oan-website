import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from '@/i18n/navigation';
import type { BlogSummary } from '@/lib/blogTypes';

type Props = { blog: BlogSummary; label: string };

// "Read More": hosted blogs open their own page, external blogs open the article's site in a new tab.
// A hosted blog with no article text yet has nowhere to go, so no link is shown
export default function BlogLink({ blog, label }: Props) {
  const external = blog.type === 'external' && blog.externalUrl;
  if (!external && !blog.hasArticle) return null;
  const content = (
    <Typography variant="cardLink" component="span">
      {label}
      {/* Gives each link a unique accessible name without changing what is shown */}
      <Box component="span" sx={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}>
        {`: ${blog.title}`}
      </Box>
    </Typography>
  );

  return (
    // Server component: links are rendered directly (not as a MUI `component`) and styled through this wrapper
    <Box
      sx={{
        position: 'relative',
        '& a': { color: 'primary.main', textUnderlinePosition: 'from-font', whiteSpace: 'nowrap' },
        '& a:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: '2px', borderRadius: '2px' },
      }}
    >
      {external ? (
        <a href={blog.externalUrl} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <Link href={`/blogs/${blog.slug}`}>{content}</Link>
      )}
    </Box>
  );
}
