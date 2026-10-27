import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import IconBadge from './IconBadge';

type Props = {
  icon: string;
  image: string;
  imagePosition?: string;
  title: string;
  description: string;
};

const ICON_SIZE = 52;
const SHIFT = ICON_SIZE + 12;
const EASE = '0.4s cubic-bezier(0.4, 0, 0.2, 1)';

export default function FeatureCard({ icon, image, imagePosition = 'center', title, description }: Props) {
  return (
    <Box
      component="article"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        px: '27px',
        pt: '18px',
        pb: { xs: '31px', lg: '17px' },
        bgcolor: 'background.paper',
        borderRadius: '0 16px 0 16px',
        boxShadow: '0 4px 12px var(--mui-palette-card-shadow)',
        '& .FeatureCard-bg': { opacity: 0, transition: `opacity ${EASE}` },
        '& .FeatureCard-icon': { transition: `opacity ${EASE}, transform ${EASE}` },
        '& .FeatureCard-text': { transition: `transform ${EASE}` },
        '& .FeatureCard-title, & .FeatureCard-body': { transition: `color ${EASE}` },
        '@media (hover: hover)': {
          '&:hover': {
            '& .FeatureCard-bg': { opacity: 1 },
            '& .FeatureCard-icon': { opacity: 0, transform: 'translateY(-16px)' },
            '& .FeatureCard-text': { transform: `translateY(-${SHIFT}px)` },
            '& .FeatureCard-title, & .FeatureCard-body': { color: 'common.white' },
          },
        },
        '@media (prefers-reduced-motion: reduce)': {
          '& .FeatureCard-bg, & .FeatureCard-icon, & .FeatureCard-text, & .FeatureCard-title, & .FeatureCard-body': {
            transition: 'none',
          },
        },
      }}
    >
      <Box className="FeatureCard-bg" aria-hidden sx={{ position: 'absolute', inset: 0 }}>
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1360px) 292px, (min-width: 600px) 50vw, 100vw"
          style={{ objectFit: 'cover', objectPosition: imagePosition }}
        />
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'card.hoverOverlay', opacity: 0.9 }} />
      </Box>
      <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box className="FeatureCard-icon" sx={{ display: 'flex' }}>
          <IconBadge icon={icon} size={ICON_SIZE} />
        </Box>
        <Box className="FeatureCard-text" sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography className="FeatureCard-title" variant="cardTitle" sx={{ color: 'text.primary' }}>
            {title}
          </Typography>
          <Typography className="FeatureCard-body" variant="cardBody" sx={{ color: 'text.heading' }}>
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
