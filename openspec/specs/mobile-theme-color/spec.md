# mobile-theme-color Specification

## Purpose
Ensure mobile browser chrome and safe-area colors follow the site's light and dark modes.

## Requirements

### Requirement: Mobile browser theme color follows site mode
The app SHALL publish browser theme color metadata that matches the current site color mode.

#### Scenario: Dark mode is active on mobile
- **WHEN** the reader switches the site to dark mode on a mobile browser
- **THEN** the document theme color resolves to the dark site background color

#### Scenario: Light mode is active on mobile
- **WHEN** the reader switches the site to light mode on a mobile browser
- **THEN** the document theme color resolves to the light site background color

### Requirement: Supported color schemes are declared
The app SHALL declare that both light and dark color schemes are supported.

#### Scenario: Browser evaluates document color scheme
- **WHEN** the document head is rendered
- **THEN** the browser can detect that the app supports both light and dark color schemes
