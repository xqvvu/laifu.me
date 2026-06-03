## Technical Approach

Create a small `SiteLogo.vue` component in `app/components/` so Nuxt auto-imports it from the components directory. The component renders inline SVG with a hand-tuned stroke that draws a single English `Q`. Using inline SVG keeps the mark SSR-visible, theme-aware through `currentColor`, and easy to animate with CSS.

The animation will use CSS `stroke-dasharray` and `stroke-dashoffset` on each stroke path. A short entrance animation runs on mount because the initial SSR HTML contains the static SVG shape and CSS handles the transition after paint. Hover and focus replay the stroke draw by applying the same keyframes to child paths. `prefers-reduced-motion: reduce` disables animation and shows the complete mark.

## Design Direction

The mark should feel like a quiet hand-written signature rather than a decorative badge:

- round caps and joins, so the path feels written rather than printed;
- compact 48x48 view box that scales cleanly into the existing 36px header slot;
- subtle inner paper panel and border using site CSS variables;
- no new dominant palette, gradients, or large decorative effects.

## Tradeoffs

CSS-only SVG animation is less controllable than GSAP timelines, but the logo interaction is small enough that CSS keeps the bundle simpler and avoids client-only behavior. The project already depends on GSAP, but using it here would add hydration work for a header mark that can be fully expressed with SSR-visible SVG and CSS.

## Accessibility

The parent link already provides navigation to the home page. The SVG will be marked decorative with `aria-hidden="true"` to avoid duplicate announcements beside the `laifu.me` wordmark. Focus-visible styling on the home link will continue to expose the interactive target.

## Verification

- Run formatting/lint or a narrower relevant check after implementation.
- Start the Nuxt dev server and inspect the header at `http://localhost:5173`.
- Confirm the SVG is visible in light and dark modes and does not overlap navigation at mobile width.
