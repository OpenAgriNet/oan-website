import { Inter } from 'next/font/google';

// Figma sets the event location tags in Inter; only this page uses it, so it is loaded here rather than in app/fonts.ts
export const inter = Inter({ subsets: ['latin'], weight: '500', display: 'swap' });
