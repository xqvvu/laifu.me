## Why

On mobile browsers, the browser status/safe-area region can remain light after switching the site to dark mode because the app does not publish a theme color for the current color mode. This makes the top system UI visually inconsistent with the page background.

## What Changes

- Add global head metadata for supported color schemes.
- Add reactive mobile browser theme color metadata that follows the current light or dark color mode.
- Keep the existing page layout, palette, and content unchanged.

## Capabilities

### New Capabilities

- `mobile-theme-color`: Covers browser chrome and safe-area color behavior for light and dark site modes.

### Modified Capabilities

None.

## Impact

- Affects the global app shell/head metadata.
- No route, content schema, dependency, or visual layout changes.
