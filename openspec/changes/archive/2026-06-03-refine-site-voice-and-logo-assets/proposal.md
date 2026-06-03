## Why

The home page already describes the site's intent, but the voice can be more durable and reusable across metadata, hero copy, and footer text. The custom logo is currently tied to one Vue component even though it should also power favicon and future brand surfaces.

## What Changes

- Refine homepage and supporting site copy around a concise personal writing voice.
- Introduce reusable site copy constants for title, tagline, description, and principles.
- Extract the logo geometry into a shared asset module used by the header logo component.
- Add an SVG favicon derived from the same logo mark and register it in global head config.
- Keep the existing quiet, text-focused visual direction and avoid broad layout redesign.

## Capabilities

### New Capabilities

- `site-voice`: Defines durable site-level copy, slogans, and principles used by public surfaces.

### Modified Capabilities

- `site-logo`: The site logo mark is reusable across the header component and favicon assets.

## Impact

- Affects homepage copy and metadata in `app/pages/index.vue`.
- Adds shared brand asset/copy utilities under `app/utils/`.
- Updates `SiteLogo` and global Nuxt head links.
- Adds a static SVG favicon under `public/`.
