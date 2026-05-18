## Why

Markdown images currently render as plain image elements with CSS styling only. As blog posts start using more images, article images should use Nuxt's image optimization pipeline while preserving simple Markdown authoring.

## What Changes

- Add the official `@nuxt/image` module.
- Configure image optimization for local public images and the current remote image domains used by content.
- Keep Nuxt UI's prose image renderer in place so standard Markdown images keep the existing click-to-preview behavior while rendering through `NuxtImg` under the hood.
- Keep Markdown authoring unchanged: writers can continue using `![alt](src)`.

## Capabilities

### New Capabilities

- `content-image-optimization`: Covers optimized rendering for images authored in Nuxt Content Markdown.

### Modified Capabilities

None.

## Impact

- Affects Nuxt module setup and package dependencies.
- Adds a Content prose override component.
- Affects rendered article images, including the existing Markdown style guide image.
- Preserves the existing Nuxt UI image zoom/preview interaction.
