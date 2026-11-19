import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SectionEyebrow from './SectionEyebrow';

type Props = {
  eyebrow: string;
  title?: string;
  description?: string;
};

// Title and description sit side by side from about 1100px; narrower screens stack them
const wide = '@media (min-width: 1100px)';

// Small heading, optional title and optional description, styled from the OAN style sheet (theme/oan.ts)
export default function SectionHeader({ eyebrow, title, description }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        px: { lg: '6.5px' },
        ...(description && { [wide]: { flexDirection: 'row', alignItems: 'center', gap: 2, minHeight: 91 } }),
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
        {/* Figma mobile: 12px eyebrow in a 30px box */}
        <Box sx={{ '& .MuiTypography-root': { fontSize: { xs: 12, sm: 14 } }, '& > div': { height: { xs: 30, sm: 33 } } }}>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
        </Box>
        {title && <Typography variant="sectionHeadline">{title}</Typography>}
      </Box>
      {description && (
        <Typography
          variant="sectionDescription"
          sx={{
            [wide]: { flex: '0 1 603px' },
            // A line break written in the text (Figma's forced break) only applies at the designed width
            whiteSpace: { xs: 'normal', lg: 'pre-line' },
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}
