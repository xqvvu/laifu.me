## Context

Nuxt 4 supports global Vue page transitions through `app.pageTransition`. The site already has simple CSS transitions for hover states and a GSAP-enhanced home hero, but regular route navigation currently swaps page content without an explicit transition.

## Goals / Non-Goals

**Goals:**

- Add a restrained transition for page navigation.
- Keep the effect readable and fast: no blur, scale, rotation, or long easing.
- Respect `prefers-reduced-motion`.

**Non-Goals:**

- Add GSAP page-transition hooks.
- Animate article body paragraphs, article cards, or scroll position.
- Change route structure, layout structure, or content queries.

## Decisions

- Use Nuxt global `app.pageTransition` rather than per-page `definePageMeta`.
  - Rationale: this creates one consistent behavior with minimal code.
  - Alternative considered: per-page transitions. That would add unnecessary policy across pages.

- Put transition classes in global CSS.
  - Rationale: transition class names are global Vue classes, and this repo already centralizes shared styling in `app/assets/css/main.css`.
  - Alternative considered: `app.vue` style block. Global CSS is easier to keep with existing tokens and motion rules.

## Risks / Trade-offs

- [Risk] Motion may distract readers. -> Mitigation: use a short duration, small vertical offset, and disable movement for reduced-motion visitors.
- [Risk] Transition could affect layout. -> Mitigation: animate only `opacity` and `transform`.
