import Box, { type BoxProps } from '@mui/material/Box';

type Props = Omit<BoxProps, 'children'> & {
  src: string;
  size?: number | string;
};

export default function MaskIcon({ src, size = 24, sx, ...props }: Props) {
  return (
    <Box
      aria-hidden
      {...props}
      sx={[
        {
          width: size,
          height: size,
          flexShrink: 0,
          bgcolor: 'currentColor',
          maskImage: `url(${src})`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
