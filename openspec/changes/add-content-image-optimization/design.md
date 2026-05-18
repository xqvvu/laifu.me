## Context

Nuxt Content renders standard Markdown images through prose components. The repository currently has global CSS for `.article-prose img`, but no image optimization module or prose image override. The existing Markdown style guide includes a remote Pexels image, and video embed placeholders can use YouTube poster images separately.

## Goals / Non-Goals

**Goals:**

- Preserve standard Markdown image syntax.
- Route Markdown article images through `NuxtImg`.
- Preserve the existing Nuxt UI click-to-preview behavior for prose images.
- Keep the current article image visual style.
- Configure remote domains needed by current content.

**Non-Goals:**

- Move assets into content folders.
- Add `nuxt-content-assets`.
- Add captions, galleries, or custom MDC image syntax.
- Replace video placeholder images.

## Decisions

- Use `@nuxt/image` because it is the official Nuxt module for image optimization.
- Rely on the existing Nuxt UI prose image component so Markdown images keep the built-in zoom/preview behavior.
- Let `@nuxt/image` provide Nuxt UI's generated image component, so the prose component renders optimized image URLs without a local override.
- Keep styling in CSS via `article-prose` image selectors.
- Configure `images.pexels.com` for the current Markdown test image and `i.ytimg.com` for future compatibility with existing video poster usage, even though video placeholders are not changed in this pass.

## Risks / Trade-offs

- Remote image optimization depends on provider support and configured domains. Mitigation: explicitly configure known domains and verify the rendered Markdown image.
- Nuxt Image may require additional native/image tooling during install/build depending on provider behavior. Mitigation: run install and build/type/lint checks after adding the module.
- A local `ProseImg` override can bypass Nuxt UI's preview behavior. Mitigation: do not override `ProseImg`; verify both optimized URLs and click-to-preview in the browser.
