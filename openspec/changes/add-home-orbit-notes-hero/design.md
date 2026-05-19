## Context

The home page currently renders a text-led hero with a right-side aside describing current interests. The desired direction is a compact visual inspired by connected notes and personal knowledge systems: quieter, smaller, and more immediate than a product mascot.

The page is server-rendered Nuxt 4 with Vue single-file components, Tailwind CSS v4, and Nuxt UI. The visual should be available in the first server-rendered paint, so it must not depend on client-only WebGL initialization for its primary appearance.

## Goals / Non-Goals

**Goals:**

- Add a small decorative hero visual that feels like layered notes connected into a knowledge graph.
- Render the primary visual as SSR-visible HTML/CSS.
- Use theme-aware colors derived from existing CSS variables.
- Respect reduced-motion preferences.
- Keep layout stable across desktop and mobile.

**Non-Goals:**

- Do not introduce Tres.js for this first small scene.
- Do not introduce Three.js or another rendering dependency for this note-card visual.
- Do not redesign the entire home page or change article listing behavior.
- Do not add interactive controls or user-facing configuration.
- Do not create a reusable 3D design system.

## Decisions

### Use HTML/CSS instead of Three.js

Use a normal Vue component plus component-layer CSS for the hero object. The visual is layered note cards, connection lines, and small nodes, which can be represented directly with semantic HTML and CSS. This makes the object visible from SSR HTML and removes the client-side delay from loading Three, mounting a client-only component, creating a WebGL renderer, and rendering the first frame.

Alternatives considered:

- **Tres.js:** Better for larger Vue-composed scenes, but adds an extra integration layer that is not justified by one hero object.
- **Direct Three.js:** Works for true 3D objects, but caused unnecessary first-paint delay for a design that reads as flat note cards.
- **2D canvas:** Still client-rendered and unnecessary for this object.
- **CSS/SVG animation:** CSS is sufficient here and keeps styling in the existing component layer.

### Component-layer styling

Put visual styles in `app/assets/css/main.css` under `@layer components`. This keeps the custom classes visible to the Tailwind lint setup and avoids ESLint ignore exceptions.

### Decorative but accessible rendering

Expose the wrapper with an ARIA label while keeping the internal decorative parts hidden from assistive technology. The existing hero text and buttons remain the meaningful content.

### Reduced-motion handling

Use CSS `@media (prefers-reduced-motion: reduce)` to disable the subtle floating animation.

## Risks / Trade-offs

- CSS pseudo-elements can become hard to tune -> Keep the component small and localize all related classes under `home-hero-visual`.
- The visual is less physically 3D than a WebGL scene -> Use layered cards, rotated planes, shadows, and connected nodes to create depth without renderer cost.
- Animated canvas could overpower the blog tone -> Use low-contrast lines, small dimensions, and slow motion.
- Hydration or SSR issues -> Avoid browser APIs entirely for the primary visual.
