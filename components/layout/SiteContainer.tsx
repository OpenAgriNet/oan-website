import Box, { type BoxProps } from '@mui/material/Box';

export default function SiteContainer({ sx, ...props }: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        { width: '100%', maxWidth: 1440, mx: 'auto', px: { xs: 2, sm: 4, md: 5, lg: 10 } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
