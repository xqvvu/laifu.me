## Why

Article Listing behavior is currently repeated across Nuxt pages, Feed Output, and prerender route generation. The repeated `draft` filtering, date ordering, Tag aggregation, and related-article ranking make the codebase easy to drift as Blog Article rules grow.

This change deepens the Article Listing module so callers get consistent public Blog Article behavior through a smaller interface.

## What Changes

- Add a shared Article Listing module for public Blog Article queries and derived listing behavior.
- Move repeated draft filtering, newest-first ordering, Tag aggregation, search matching, archive grouping, and related-article ranking behind that module.
- Update Nuxt pages and Feed Output to call the shared module instead of duplicating Article Listing rules.
- Keep user-facing routes, visual design, and content schema unchanged.
- Add focused tests for shared Article Listing behavior and keep existing E2E coverage passing.

## Capabilities

### New Capabilities

- `article-listing`: Defines consistent public Blog Article listing, Tag aggregation, search, archive grouping, related article selection, and Feed Output source behavior.

### Modified Capabilities

- None.

## Impact

- Affected app pages: home, blog index, archive, tag, and article detail.
- Affected Feed Output: RSS and sitemap URL generation.
- Affected build utilities: prerender route generation.
- No new runtime dependencies are expected.
- Existing Nuxt Content query usage remains the storage adapter behind the Article Listing module.
