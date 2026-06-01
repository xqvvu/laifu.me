# subtle-page-transition Specification

## Purpose
Define the restrained global Nuxt page transition used to make route changes feel smoother without adding extra animation libraries or distracting from reading.

## Requirements
### Requirement: Global page transition
The site SHALL apply a subtle transition when navigating between Nuxt pages.

#### Scenario: Navigating between pages
- **WHEN** a visitor navigates from one page to another using site navigation
- **THEN** the page content changes with a short fade and small vertical movement

### Requirement: Reduced-motion support
The page transition SHALL respect the visitor's reduced-motion preference.

#### Scenario: Reduced-motion visitor navigates
- **WHEN** the browser reports `prefers-reduced-motion: reduce`
- **THEN** route changes avoid animated movement and complete without a visible transition delay
