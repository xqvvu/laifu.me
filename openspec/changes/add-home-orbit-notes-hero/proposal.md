## Why

The home hero currently uses a plain "now focused on" text aside that feels visually weak compared with the rest of the page. A compact notes-inspired visual can give the first viewport a memorable focal point while keeping the personal blog quiet and text-led.

## What Changes

- Replace the home hero's right-side focus aside with a compact "Orbit Notes" visual that is visible from SSR HTML.
- Use a restrained knowledge-structure motif: layered note cards, small connected nodes, and thin connection lines.
- Keep the visual responsive, accessible, and decorative so the home page content and calls to action remain primary.
- Respect reduced-motion preferences by disabling the subtle CSS float animation.
- Avoid a rendering dependency for this hero so the visual does not wait for client-side WebGL initialization.

## Capabilities

### New Capabilities

- `home-hero-visual`: Home page hero includes a compact decorative notes visual that supports responsive layout, theme-aware styling, SSR visibility, and reduced-motion behavior.

### Modified Capabilities

None.

## Impact

- Affected code: `app/pages/index.vue`, a new home hero visual component under `app/components/`, and component-layer CSS in `app/assets/css/main.css`.
- Dependencies: no rendering dependency is needed; Tres.js and Three.js stay out of this hero.
- User-facing impact: home page first viewport changes visually, without changing content routes, SEO metadata, or blog data fetching.
