# site-logo Specification

## MODIFIED Requirements

### Requirement: Header logo uses a custom SVG mark

The global header SHALL render a custom SVG mark for the site logo instead of a plain text-in-square character, and the mark geometry SHALL come from a reusable site logo asset source.

#### Scenario: Header renders

- **WHEN** a visitor opens any page with the global header
- **THEN** the home link includes a compact SVG logo mark
- **AND** the mark uses shared logo geometry
- **THEN** the adjacent `laifu.me` wordmark remains available on larger viewports

## ADDED Requirements

### Requirement: Logo mark supports generated app icons

The site logo mark SHALL be available as static favicon and app icon assets derived from the same visual mark as the header logo.

#### Scenario: Browser requests icon metadata

- **WHEN** the browser loads site head links
- **THEN** the page advertises generated icon assets for common browser and platform sizes
- **AND** the generated assets visually match the header logo mark
