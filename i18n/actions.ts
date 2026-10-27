'use server';
import { cookies } from 'next/headers';
import { refresh } from 'next/cache';
import { hasLocale } from 'next-intl';
import { localeCookie, locales } from './config';

export async function setLocale(locale: string) {
  if (!hasLocale(locales, locale)) return;
  (await cookies()).set(localeCookie.name, locale, { path: '/', sameSite: 'lax', maxAge: localeCookie.maxAge });
  refresh();
}
