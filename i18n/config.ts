export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const localeCookie = { name: 'NEXT_LOCALE', maxAge: 60 * 60 * 24 * 365 };
