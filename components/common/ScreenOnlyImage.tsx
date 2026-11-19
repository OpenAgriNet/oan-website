'use client';
import { getImageProps, type ImageProps } from 'next/image';

// 1x1 transparent GIF: what the browser "loads" on screens where the image is hidden
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

type Props = Omit<ImageProps, 'priority' | 'preload'> &
  // Screen widths (px) where the section hides the image with CSS; it is not downloaded there
  ({ hiddenBelow: number; hiddenFrom?: never } | { hiddenFrom: number; hiddenBelow?: never });

// An image that its section hides on some screen sizes (e.g. a desktop hero picture with a separate phone layout).
// A plain <Image> would still be downloaded there; the <picture> source makes the browser fetch nothing instead.
export default function ScreenOnlyImage({ hiddenBelow, hiddenFrom, alt, ...props }: Props) {
  const { props: img } = getImageProps({ alt, ...props });
  const media = hiddenBelow !== undefined ? `(max-width: ${hiddenBelow - 0.02}px)` : `(min-width: ${hiddenFrom}px)`;
  return (
    <picture>
      <source media={media} srcSet={BLANK} />
      <img {...img} alt={alt} />
    </picture>
  );
}
