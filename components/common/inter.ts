import { Inter } from 'next/font/google';

// Figma sets the card tags (e.g. event locations) in Inter; only the cards use it, so it is loaded here rather than in app/fonts.ts
export const inter = Inter({ subsets: ['latin'], weight: '500', display: 'swap' });
