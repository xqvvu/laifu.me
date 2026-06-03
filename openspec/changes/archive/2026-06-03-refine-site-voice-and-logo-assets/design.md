## Overview

Use a small shared data layer rather than scattering brand strings and SVG path data in components. The implementation should remain static and server-friendly: no client-only runtime, no animation dependency, and no new package.

## Site Voice

The site voice should stay concise, reflective, and practical. Suggested direction:

- Tagline: "把经验写慢，把判断留久。"
- Description: "记录工程、产品、工具与生活系统里的长期判断。少一点噪音，多一点能复用的经验。"
- Principles: "长期记录", "清楚判断", "可复用经验"

These strings should live in `app/utils/site-copy.ts` and feed the homepage and SEO metadata. The footer may use the tagline as a quiet persistent reminder.

## Logo Assets

Move reusable logo geometry into `app/utils/site-logo.ts`:

- `siteLogoViewBox`
- `siteLogoPath`
- `siteLogoPathLength`

`SiteLogo.vue` imports these values. The header animation should follow the antfu.me-inspired stroke logo pattern: draw the mark, hold it long enough to remain readable, then quietly reset and repeat at a low frequency. `public/favicon.svg` duplicates the static SVG output because public assets are not processed by Vite imports. The duplicate is intentional and should be kept visually in sync with `site-logo.ts`.

## Favicon Registration

Nuxt 4 docs recommend serving stable static assets from `public/`. Nuxt SEO Utils detects generated favicon and app icon files in `public/` and injects the platform-specific head links automatically, so do not manually add a single favicon link in `app.head`.

Generate the PNG and ICO variants with the Nuxt SEO utility using `favicon.svg` as the source. The CLI expects the source path relative to `public/`, so the command is:

```bash
pnpm dlx nuxt-seo-utils icons --source favicon.svg
```

The generated assets are `favicon.ico`, `icon-16x16.png`, `icon-32x32.png`, `apple-touch-icon.png`, `icon-192x192.png`, and `icon-512x512.png`. Keep `favicon.svg` as the canonical source asset for regeneration.

## Risks

- SVG path drift between `site-logo.ts` and `public/favicon.svg`; keep both small and obvious.
- Slogan tone is subjective. Keep the copy restrained and easy to revise.
