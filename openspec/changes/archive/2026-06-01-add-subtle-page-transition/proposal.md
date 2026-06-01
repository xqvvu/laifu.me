## Why

The site can benefit from a calmer route-change feel without adding more GSAP to a text-first blog. A small Vue/Nuxt page transition can make navigation feel intentional while keeping reading surfaces quiet.

## What Changes

- Add a global, subtle page transition for Nuxt route changes.
- Use CSS-only opacity and small vertical movement with a short duration.
- Respect reduced-motion preferences by disabling transition movement and duration.
- Keep Hero GSAP unchanged and avoid adding new animation dependencies.

## Capabilities

### New Capabilities

- `subtle-page-transition`: Covers the global page transition behavior for route changes.

### Modified Capabilities

- None.

## Impact

- Affected code: `nuxt.config.ts` and global CSS.
- APIs, content schema, RSS, sitemap, and Nuxt Content queries: no changes.
