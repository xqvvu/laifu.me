## Why

The current site logo is a plain filled square containing the Chinese character "来". It is readable, but it feels more like a placeholder than a durable mark for a personal writing site. The requested direction references antfu.me's animated SVG logo: a hand-drawn path that quietly writes itself into view. After visual review, the mark should move away from a Chinese character and use an English letterform instead.

## What Changes

- Replace the text-in-square logo with a custom SVG mark based on a single English `Q`.
- Add restrained stroke-drawing animation on initial render and hover/focus, while preserving a static fallback.
- Keep the logo compact, theme-aware, and aligned with the site's quiet text-focused visual language.
- Keep the navigation structure and `laifu.me` wordmark unchanged.

## Out Of Scope

- Full site rebrand, color palette redesign, or typography changes.
- A copied version of antfu.me's artwork or path data.
- Client-only animation dependencies for the logo.

## Success Criteria

- The logo remains recognizable as a `Q` at header size.
- The logo animates as an SVG writing trace for motion-capable visitors.
- The logo respects `prefers-reduced-motion`.
- The header remains responsive without layout shifts or overlapping text.
