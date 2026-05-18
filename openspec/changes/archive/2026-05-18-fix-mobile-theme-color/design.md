## Context

The site already stores its current theme through Nuxt UI color mode and defines matching CSS variables in `app/assets/css/main.css`. Mobile browser status/safe-area colors are controlled by document head metadata such as `theme-color`, not only by body background CSS.

## Goals / Non-Goals

**Goals:**

- Ensure mobile browser chrome uses the light site background in light mode and the dark site background in dark mode.
- Keep the metadata reactive when the user toggles color mode.
- Use existing Nuxt `useHead` and `useColorMode` APIs.

**Non-Goals:**

- Redesign the app header or safe-area padding.
- Change the site's color palette.
- Add dependencies.

## Decisions

- Put reactive metadata in `AppShell.vue`, where `useColorMode()` and the theme toggle already live.
- Use `meta name="color-scheme"` to declare both supported schemes and a single reactive `theme-color` value derived from current mode.
- Match `theme-color` to existing `--site-bg` values: `#f7f5f0` for light and `#050505` for dark.

## Risks / Trade-offs

- Browser support varies, especially in standalone PWA-like modes. Mitigation: use standard metadata that improves supported mobile browsers without affecting unsupported ones.
