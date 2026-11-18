import type { Metadata, Viewport } from 'next';
import { hasLocale } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { siteUrl } from '@/lib/metadata';
import { routing } from '@/i18n/routing';
import theme from '@/theme';
import { oan } from '@/theme/oan';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { montserrat, notoSans } from '../fonts';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL(siteUrl),
    title: t('title'),
    description: t('description'),
    icons: { apple: '/icons/pwa/apple-touch-icon.png' },
    appleWebApp: { capable: true, title: t('siteName'), statusBarStyle: 'default' },
  };
}

export const viewport: Viewport = { themeColor: oan.colors.primary };

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${montserrat.variable} ${notoSans.variable}`}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <NextIntlClientProvider locale={locale}>
              <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header />
                <Box component="main" sx={{ flex: 1 }}>
                  {children}
                </Box>
                <Footer />
              </Box>
            </NextIntlClientProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
