import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/metadata';

const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
if (siteEnv !== 'production' && siteEnv !== 'staging') {
  throw new Error('NEXT_PUBLIC_SITE_ENV must be "production" or "staging". See .env.example.');
}

// Static export only prerenders route handlers marked static
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  // Staging must never be crawled; the CloudFront noindex header is the other layer
  if (siteEnv === 'staging') return { rules: { userAgent: '*', disallow: '/' } };

  return {
    rules: [
      { userAgent: '*', allow: '/' },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
