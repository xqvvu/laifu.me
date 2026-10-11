/**
 * The site's complete icon set.
 *
 * Seven icons are used across the whole site, so shipping an icon-font
 * dependency to generate them is more machinery than the job needs. Each
 * entry is the raw body of a Lucide 24×24 stroke icon; `AppIcon` supplies
 * the shared svg attributes. Adding an icon means pasting one more body.
 *
 * Keeping the set in a plain module (rather than inside the component) lets
 * other files resolve names against it — see `resolveIcon`.
 */
export const icons = {
  /** Circle with an "i" — neutral note. */
  info: '<path d="M12 16v-4m0-4h.01"/><circle cx="12" cy="12" r="10"/>',
  /** Lightbulb — tip. */
  lightbulb:
    '<path d="M15 14c.2-1 .7-1.7 1.5-2.5c1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5c.7.7 1.3 1.5 1.5 2.5m0 4h6m-5 4h4"/>',
  /** Crescent — switch to dark. */
  moon: '<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',
  /** Solid triangle — video play. */
  play: '<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/>',
  /** Magnifier — the article search field. */
  search: '<path d="m21 21l-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',
  /** Rays — switch to light. */
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  /** Triangle with "!" — warning. */
  "triangle-alert":
    '<path d="m21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4m0 4h.01"/>',
} as const;

export type IconName = keyof typeof icons;

export const iconNames = Object.keys(icons) as IconName[];

/**
 * Resolve an icon reference to a name this site can render.
 *
 * Frontmatter and directives write icons in the `i-lucide-book-open` form;
 * anything not in the set resolves to `undefined` so callers render without
 * a broken glyph instead of emitting a missing icon.
 */
export function resolveIcon(reference?: string | null): IconName | undefined {
  if (!reference) return undefined;

  const short = reference.replace(/^i-lucide-/, "").replace(/^i-/, "");

  return iconNames.find((name) => name === short);
}
