## 1. Setup

- [x] 1.1 Confirm the hero visual does not need Three.js, Tres.js, or another rendering dependency.
- [x] 1.2 Confirm the home page integration point and existing layout constraints.

## 2. Hero Visual

- [x] 2.1 Create an SSR-visible Orbit Notes component with layered note cards, connected nodes, and decorative structure.
- [x] 2.2 Implement the restrained visual style in `@layer components` using existing site CSS variables and reduced-motion behavior.
- [x] 2.3 Replace the home hero focus aside with the new visual component while keeping title, copy, actions, and article sections intact.

## 3. Verification

- [x] 3.1 Run formatting or targeted code checks for the changed Vue and config files.
- [x] 3.2 Run a production-oriented build or the narrowest meaningful repo check.
- [x] 3.3 Verify the home page visually with Playwright MCP on desktop and mobile viewports.
- [x] 3.4 Validate the OpenSpec change with `openspec validate add-home-orbit-notes-hero --strict`.
