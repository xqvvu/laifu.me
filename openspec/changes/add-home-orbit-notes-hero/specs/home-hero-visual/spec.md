## ADDED Requirements

### Requirement: Home hero renders an orbit notes visual
The home page SHALL render a compact decorative notes visual in the hero area that replaces the previous right-side focus text aside.

#### Scenario: Desktop hero visual is present
- **WHEN** a visitor opens the home page on a desktop viewport
- **THEN** the hero area includes the Orbit Notes visual beside the text content

#### Scenario: Mobile hero visual remains compact
- **WHEN** a visitor opens the home page on a mobile viewport
- **THEN** the Orbit Notes visual remains within the hero flow without overlapping the title, description, or action buttons

### Requirement: Hero visual is theme-aware and restrained
The Orbit Notes visual SHALL use existing site colors or values derived from existing CSS variables, and SHALL avoid introducing a new dominant palette.

#### Scenario: Site theme changes
- **WHEN** the page is rendered in light or dark mode
- **THEN** the visual remains legible while matching the surrounding site tone

### Requirement: Hero visual respects reduced motion
The Orbit Notes visual SHALL avoid continuous animation when the visitor has requested reduced motion.

#### Scenario: Reduced motion is enabled
- **WHEN** the browser reports `prefers-reduced-motion: reduce`
- **THEN** the visual renders without a continuous animation loop

### Requirement: Hero visual is visible without client rendering
The Orbit Notes visual SHALL render its primary shape from server-rendered HTML and CSS without requiring a client-only canvas or WebGL initialization.

#### Scenario: Initial HTML contains the visual
- **WHEN** the home page HTML is served
- **THEN** the notes visual structure is present before client hydration finishes

### Requirement: Hero visual does not replace page content
The Orbit Notes visual SHALL be decorative and SHALL NOT remove the home page title, description, primary actions, featured articles, or recent articles.

#### Scenario: Home content remains available
- **WHEN** the home page is rendered
- **THEN** the title, description, article links, and navigation actions remain visible and usable
