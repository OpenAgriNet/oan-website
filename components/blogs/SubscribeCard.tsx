import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import ActionButton from '@/components/common/ActionButton';
import { oan } from '@/theme/oan';

type Props = { title: string; description: string; buttonLabel: string };

// Figma "Stay updated with OpenAgriNet" card (440 x 199): the farmer illustration fills the card behind the text.
// The button has no action yet (no newsletter service so far)
export default function SubscribeCard({ title, description, buttonLabel }: Props) {
  return (
    <Box
      component="aside"
      sx={{
        position: 'relative',
        minHeight: 199,
        boxSizing: 'border-box',
        p: '28px 30px 42px',
        borderRadius: oan.layout.article.panelRadius,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        // Figma (440px card) shows the picture centred; on narrower cards (zoomed in, smaller screens) its right side, with
        // the farmer, stays in view
        '& > img': { objectPosition: { xs: 'right center', lg: 'center' } },
      }}
    >
      <Image src="/images/blog-subscribe.png" alt="" fill sizes="440px" style={{ objectFit: 'cover' }} />
      {/* On cards narrower than Figma's the farmer sits closer to the text: a soft white fade keeps the text readable */}
      <Box
        aria-hidden
        sx={{
          display: { xs: 'block', lg: 'none' },
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0) 75%)',
        }}
      />
      <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant="articleHeading" component="h2">
          {title}
        </Typography>
        {/* Narrower below 1360px, where the card is narrower and the farmer sits closer to the text */}
        <Typography variant="articleBody" sx={{ mt: '11px', maxWidth: { xs: 200, lg: 240 } }}>
          {description}
        </Typography>
        <ActionButton sx={{ mt: '24px', minHeight: 36, fontSize: 12, lineHeight: '16px' }}>{buttonLabel}</ActionButton>
      </Box>
    </Box>
  );
}
