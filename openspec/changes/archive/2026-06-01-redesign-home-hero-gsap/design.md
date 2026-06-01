## Context

The home page currently uses a restrained two-column hero with a small CSS-only decorative visual. The new work should make the first viewport feel more authored and memorable without turning the personal blog into a marketing landing page. The implementation must fit Nuxt 4, Vue SFCs, Nuxt auto-imported components, and the existing article listing flow.

## Goals / Non-Goals

**Goals:**

- Create a completely new hero composition with an editorial, night-reading-console aesthetic.
- Keep the content surface quiet and readable: `laifu.me`, the description, and the two main actions remain immediately available.
- Render the visual structure with SSR-friendly HTML/CSS before GSAP runs.
- Use GSAP in `onMounted` with scoped selectors, cleanup via `ctx.revert()`, and reduced-motion handling.
- Keep the change local to the home hero and its visual component.

**Non-Goals:**

- Redesign the whole site, article cards, navigation, or article reading layout.
- Change content queries, SEO metadata, RSS, sitemap, or Nuxt Content schema.
- Add canvas, WebGL, or client-only rendering for the primary visual.

## Decisions

- Use one enhanced `HomeHeroVisual.vue` component rather than splitting the hero into many new components.
  - Rationale: the behavior is decorative and local; a single SFC keeps the change easy to maintain.
  - Alternative considered: a global animation plugin. This would be excessive for one home hero.

- Add `gsap` as a direct dependency and import it only in the visual component.
  - Rationale: the user explicitly requested GSAP, and direct component import keeps the dependency obvious.
  - Alternative considered: CSS-only keyframes. That would not satisfy the GSAP requirement.

- Use `gsap.context(root)` and `gsap.matchMedia()` from `onMounted`.
  - Rationale: selectors stay scoped to the component, animations are reverted on unmount, and reduced-motion behavior is centralized.
  - Alternative considered: raw `document.querySelectorAll`. That is more fragile in Nuxt/Vue and harder to clean up.

- Use CSS variables and local component styles for the new palette.
  - Rationale: the hero can be visually fresh while still adapting to light/dark mode and the existing site tokens.
  - Alternative considered: broad global palette changes. That would create unrelated visual churn.

## Risks / Trade-offs

- [Risk] GSAP adds client JavaScript to the home page. -> Mitigation: animate only the hero visual, avoid plugins, and keep the SSR visual complete without JS.
- [Risk] A bold hero could overpower the blog's text-first tone. -> Mitigation: use restrained copy, compact controls, neutral materials, and an editorial layout rather than a product-style hero.
- [Risk] Motion can distract or cause discomfort. -> Mitigation: honor `prefers-reduced-motion: reduce` and keep ambient movement subtle.
