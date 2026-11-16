# CloudFront Security Headers — Infra Handoff

This site is a static export (`output: 'export'` in `next.config.ts`) served from S3 via CloudFront. There is no Next.js server at runtime, so response headers cannot be set in application code — they must be configured on the CloudFront distribution itself. This document specifies what infra needs to configure.

## 1. Standard security headers (CloudFront Response Headers Policy)

Create a CloudFront **Response Headers Policy** (Console: CloudFront → Policies → Response headers → Create) and attach it to the distribution's default cache behavior. Use a **custom** policy (not just the AWS managed `SecurityHeadersPolicy`) so the exact values below can be set.

| Header | Value | Notes |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | 2 years. Only enable `preload` once you're certain every subdomain will always be served over HTTPS — it's very hard to reverse. |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-sniffing. |
| `X-Frame-Options` | `DENY` | Legacy fallback for browsers that don't support `frame-ancestors`. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Good default; doesn't leak full URLs cross-origin. |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Disables APIs this site doesn't use. Extend the list if that changes. |
| `Content-Security-Policy` | see below | Needs tuning for Next.js/MUI — see section 2. |

These are all static (same for every request) and configurable directly in a CloudFront Response Headers Policy — no Lambda@Edge needed for this part.

## 2. Content-Security-Policy

Next.js (App Router) injects a small amount of inline `<style>`/`<script>` for hydration data and MUI's emotion-based styling also injects `<style>` tags at runtime. A CSP that blindly blocks `unsafe-inline` for styles will break the page. Recommended starting policy:

```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
font-src 'self' data:;
connect-src 'self';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
```

Notes for whoever sets this up:
- `style-src 'unsafe-inline'` is required because of MUI's runtime style injection. If this needs tightening later, that requires switching to a nonce- or hash-based CSP, which isn't possible with a static CloudFront header (the hash/nonce would have to be generated per-build and baked into both the HTML and the header) — out of scope for now.
- `script-src 'self'` assumes no inline `<script>` tags and no third-party scripts (analytics, etc.) are added. **If analytics/tag-manager scripts get added later, this policy must be revisited** — either allowlist the specific script host or add a nonce.
- `connect-src 'self'` will need the API host added once the separate Node.js backend service (mentioned in the deployment plan as a second CloudFront origin behind `/api/*`) goes live, e.g. `connect-src 'self' https://api.example.com`.
- Test thoroughly after applying — CSP violations show up as silent console errors (`Refused to ...`), not broken builds.

## 3. Staging must not be indexed (two-layer protection)

`app/robots.ts` already blocks staging at the application layer:

```ts
if (siteEnv === 'staging') return { rules: { userAgent: '*', disallow: '/' } };
```

But `robots.txt` is advisory — well-behaved crawlers respect it, but it doesn't stop a page from being indexed if it's linked to from elsewhere, and it does nothing for crawlers that ignore it. The app code's own comment calls out that a second, enforced layer is expected at CloudFront:

```ts
// Staging must never be crawled; the CloudFront noindex header is the other layer
```

**Requirement: the staging CloudFront distribution must add `X-Robots-Tag: noindex, nofollow` to every response.** Unlike the headers in section 1, this must be environment-specific — the production distribution must NOT send this header (it would deindex the real site).

How to implement, in order of preference:

1. **Separate Response Headers Policies per distribution** (simplest, no Lambda@Edge). If staging and production are already separate CloudFront distributions (which they should be, given they point at different S3 buckets/origins), attach a staging-only Response Headers Policy that includes everything in section 1 *plus* `X-Robots-Tag: noindex, nofollow`. Production gets a policy with just the section 1 headers.
2. **Lambda@Edge / CloudFront Functions, only if staging and production share one distribution** (e.g. path- or header-based routing to the same distribution). In that case a CloudFront Function on `viewer-response` can inject the header conditionally based on which origin/behavior served the request. This adds complexity and latency, so prefer option 1 if at all possible.

## 4. Suggested verification after setup

- `curl -sI https://<staging-domain>/` → confirm `x-robots-tag: noindex, nofollow` is present, and that it is **absent** on the production domain.
- `curl -sI https://<production-domain>/` → confirm HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and `Content-Security-Policy` are all present on both staging and production.
- Load the production site in a browser with devtools open and check the console for CSP violation errors on every page (home, about-us, community, resources, events, building-blocks) — fix any legitimate violations by extending the policy rather than loosening `script-src`/`style-src` broadly.
- Confirm `https://<production-domain>/robots.txt` returns `Allow: /` with a `Sitemap:` line, and the staging equivalent returns `Disallow: /`.
