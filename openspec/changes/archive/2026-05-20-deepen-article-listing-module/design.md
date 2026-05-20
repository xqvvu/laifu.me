## Context

The site has one Blog Article collection backed by Nuxt Content. Public Article Listing behavior is currently implemented directly in callers: home, blog index, archive, tag pages, article detail related articles, RSS, sitemap, and prerender route generation.

The repeated rules are small individually, but their interface leaks implementation details into every caller: each caller must remember how to exclude drafts, how to order Blog Articles, which fields to select, how to derive Tags, and how to match related articles.

## Goals / Non-Goals

**Goals:**

- Concentrate public Blog Article listing behavior in one Article Listing module.
- Keep Nuxt pages and Feed Output callers small and explicit.
- Preserve existing URLs, visual design, Nuxt Content schema, and user-facing behavior.
- Make listing behavior easier to test without relying only on E2E routes.

**Non-Goals:**

- Do not change Markdown front matter schema.
- Do not add a generic repository layer or alternate storage adapter.
- Do not redesign the blog UI.
- Do not change article rendering, table of contents, or markdown prose behavior.

## Decisions

### Use framework-specific modules instead of a generic repository

Create a shared Article Listing module around Nuxt Content queries and pure derivation helpers. This gives callers a smaller interface while keeping the implementation close to the framework APIs the project already uses.

Alternative considered: introduce a storage-neutral repository interface. Rejected because there is only one adapter, Nuxt Content; one adapter would create a hypothetical seam without leverage.

### Split app and server adapters where Nuxt requires different imports

Nuxt app code uses auto-imported `queryCollection(...)`; server handlers import `queryCollection` from `@nuxt/content/server` and pass the event. The Article Listing module can share pure derivation helpers, but app and server query adapters should remain separate to respect Nuxt Content's runtime contexts.

Alternative considered: one universal query wrapper. Rejected because it would obscure the required event parameter in server code and make the interface harder to use correctly.

### Keep Feed Output escaping local to RSS

The Article Listing module owns which Blog Articles and Tags appear. RSS XML serialization still owns XML escaping and feed string construction because that is Feed Output formatting, not Article Listing behavior.

Alternative considered: move all RSS generation behind Article Listing. Rejected because it would mix listing rules with feed serialization.

## Risks / Trade-offs

- Shared modules may become too broad -> Keep exported functions named around domain behaviors such as public article index, Tag counts, archive groups, and related articles.
- App/server query code can still duplicate field lists -> Prefer small dedicated functions per surface rather than one highly parameterized function.
- Type inference from Nuxt Content may be awkward across shared modules -> Start with local structural types for listing fields and let callers keep precise article detail types where needed.
