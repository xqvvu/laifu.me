## ADDED Requirements

### Requirement: Redesigned home hero composition
The home page SHALL render a substantially redesigned hero area that presents the site identity, description, primary actions, and a new editorial visual composition.

#### Scenario: Desktop hero presentation
- **WHEN** a visitor opens the home page on a desktop viewport
- **THEN** the first section presents the site identity, description, actions, and redesigned visual as one cohesive hero composition

#### Scenario: Mobile hero presentation
- **WHEN** a visitor opens the home page on a mobile viewport
- **THEN** the hero content and visual remain readable, ordered, and free of overlapping text or controls

### Requirement: GSAP motion enhancement
The home hero visual SHALL use GSAP for mounted client-side entrance and ambient motion.

#### Scenario: Motion-capable visitor
- **WHEN** the home hero visual mounts and the browser does not request reduced motion
- **THEN** GSAP animates the hero elements with a coordinated entrance and subtle ongoing movement

#### Scenario: Reduced-motion visitor
- **WHEN** the browser reports `prefers-reduced-motion: reduce`
- **THEN** the hero visual renders without continuous ambient GSAP animation

### Requirement: SSR-safe decorative visual
The home hero visual SHALL render its core shapes and text with server-rendered HTML and CSS before GSAP initializes.

#### Scenario: Before hydration
- **WHEN** the home page HTML is served before client hydration finishes
- **THEN** the hero visual structure is already present and visually meaningful

### Requirement: Existing home content preserved
The redesign SHALL preserve the existing home page content flow outside the hero.

#### Scenario: Article sections remain available
- **WHEN** the home page is rendered
- **THEN** the featured article section and recent article section remain visible after the hero
