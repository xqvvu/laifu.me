## Why

The current home hero is quiet and serviceable, but it no longer matches the user's request for a complete, original visual redesign. The home page should make `laifu.me` feel like a deliberate writing space while preserving the blog's fast, text-focused character.

## What Changes

- Replace the current two-column home hero composition with a new editorial "night reading console" hero.
- Add a GSAP-powered entrance and ambient animation layer that runs only after mount and respects reduced-motion preferences.
- Replace the existing decorative notes visual with a larger, responsive hero visual made from semantic HTML and CSS.
- Preserve the home page title, description, navigation actions, featured articles, recent articles, and public content queries.
- Keep the implementation scoped to the home hero and its decorative visual.

## Capabilities

### New Capabilities

- `home-hero-gsap-experience`: Covers the redesigned home hero layout, decorative visual, responsiveness, accessibility, and GSAP motion behavior.

### Modified Capabilities

- None.

## Impact

- Affected code: `app/pages/index.vue`, `app/components/HomeHeroVisual.vue`, and possibly global CSS/font configuration if the design needs shared tokens.
- Dependencies: Add `gsap` if it is not already installed.
- APIs and content model: No changes.
