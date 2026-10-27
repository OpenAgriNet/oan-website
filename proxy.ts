import { NextResponse, type NextRequest } from 'next/server';
import { hasLocale } from 'next-intl';
import { localeCookie, locales } from './i18n/config';

export default function proxy(request: NextRequest) {
  const [, prefix, ...rest] = request.nextUrl.pathname.split('/');
  if (!hasLocale(locales, prefix)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${rest.join('/')}`;
  const response = NextResponse.redirect(url);
  response.cookies.set(localeCookie.name, prefix, { path: '/', sameSite: 'lax', maxAge: localeCookie.maxAge });
  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
