import { cookies, headers } from 'next/headers';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, localeCookie, locales } from './config';

function fromAcceptLanguage(header: string | null) {
  return header
    ?.split(',')
    .map((part) => part.split(';')[0].trim().split('-')[0].toLowerCase())
    .find((code) => hasLocale(locales, code));
}

export default getRequestConfig(async () => {
  const saved = (await cookies()).get(localeCookie.name)?.value;
  const requested = saved ?? fromAcceptLanguage((await headers()).get('accept-language'));
  const locale = hasLocale(locales, requested) ? requested : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
