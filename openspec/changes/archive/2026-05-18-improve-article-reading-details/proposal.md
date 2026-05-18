## Why

Article pages are readable overall, but live page inspection showed friction in long-form reading details on mobile and in rich Markdown content. The highest-impact issues are the mobile table of contents taking over the first article viewport, code blocks appearing to break their container, and collapsed long-code sections crowding following content.

## What Changes

- Make the mobile article table of contents collapsed by default while keeping the desktop sidebar table of contents visible.
- Tighten article code block overflow boundaries so horizontally scrollable code is visually contained on small screens.
- Add spacing and containment around collapsible long-code blocks so their overlay and expand control do not collide with the next article section.

## Capabilities

### New Capabilities

- `article-reading-experience`: Covers responsive article reading behavior for table of contents and rich Markdown blocks.

### Modified Capabilities

None.

## Impact

- Affects `app/pages/blog/[...slug].vue` mobile table-of-contents configuration.
- Affects `app/assets/css/main.css` article prose styles for code block containment and collapsed long-code spacing.
- No API, content schema, dependency, or route changes.
