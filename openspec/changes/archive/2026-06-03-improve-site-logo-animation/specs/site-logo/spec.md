# site-logo Specification

## Purpose

Define the site's compact animated brand mark in the global header.

## ADDED Requirements

### Requirement: Header logo uses a custom SVG mark

The global header SHALL render a custom SVG mark for the site logo instead of a plain text-in-square character.

#### Scenario: Header renders

- **WHEN** a visitor opens any page with the global header
- **THEN** the home link includes a compact SVG logo mark
- **THEN** the adjacent `laifu.me` wordmark remains available on larger viewports

### Requirement: Logo mark remains recognizable and theme-aware

The logo mark SHALL use a single English `Q` letterform and SHALL use existing site color variables or derived values.

#### Scenario: Theme changes

- **WHEN** the visitor views the header in light or dark mode
- **THEN** the logo remains legible and aligned with the surrounding site tone

### Requirement: Logo supports restrained SVG path animation

The logo SHALL provide a subtle stroke-drawing animation for motion-capable visitors.

#### Scenario: Motion-capable visitor views the logo

- **WHEN** the header first renders or the home link is hovered or focused
- **THEN** the logo strokes draw in as a short writing trace

### Requirement: Logo respects reduced motion

The logo SHALL avoid animated stroke movement when the visitor requests reduced motion.

#### Scenario: Reduced-motion visitor views the logo

- **WHEN** the browser reports `prefers-reduced-motion: reduce`
- **THEN** the logo appears complete without stroke-drawing animation
