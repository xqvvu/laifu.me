# AGENTS.md

This repo is a personal blog built with Nuxt 4, Nuxt Content, Tailwind CSS v4, and
Nuxt SEO. When working here, prefer small, project-shaped changes over broad rewrites.

## Agent skills

### Issue tracker

Issues and PRDs are tracked in GitHub Issues for `xqvvu/laifu.me`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default Matt Pocock skill label vocabulary: `needs-triage`, `needs-info`,
`ready-for-agent`, `ready-for-human`, and `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Read the root `README.md` for architecture and content conventions before making
structural changes.

## Use `nuxt-remote` First

For Nuxt-related work, use the `nuxt-remote` MCP before relying on memory.

- Use `list_documentation_pages` and `get_documentation_page` for Nuxt 4 docs, especially
  routing, data fetching, server routes, rendering, deployment, and directory conventions.
- Use `get_module` or `list_modules` before changing module setup for `@nuxt/content`,
  `@nuxtjs/color-mode`, `@nuxt/fonts`, `@nuxtjs/seo`, or other Nuxt modules.
- Use `get_changelog` when behavior may depend on recent Nuxt or official module releases.
- After checking docs, align the implementation with this codebase's existing patterns
  instead of introducing a new architecture.

## Testing Research

- For Nuxt testing changes, check Nuxt docs with `nuxt-remote` first. Prefer the official
  `@nuxt/test-utils` guidance when adding unit, Nuxt-runtime, or end-to-end test structure.
- For Playwright setup or test authoring, check the official Playwright docs first.
- Use Playwright Test for repeatable E2E coverage. Do not add Playwright MCP as a project
  dependency.
- Do not assume a test script exists; inspect `package.json` before running or documenting
  Playwright commands.

## Page Debugging

- `pnpm test:e2e` runs the Chromium E2E suite.
- `pnpm test:e2e:headed` runs tests with a visible browser.
- `pnpm test:e2e:ui` opens Playwright UI mode.
- `pnpm test:e2e:report` opens the last HTML report.
- `pnpm test:e2e:codegen` starts codegen against `http://localhost:5173`; run `pnpm dev` first.

## Project Shape

- App code lives in `app/`.
- Pages live in `app/pages/` and use Nuxt file-based routing.
- Shared components live in `app/components/`.
- MDC container components live in `app/components/content/` and are registered in the
  `contentComponents` map in `nuxt.config.ts`.
- Global styling and design tokens live in `app/assets/css/main.css`.
- Content lives in `content/`. Blog posts live in `content/blog/YYYY/slug.md`, static pages
  in `content/pages/*.md`.
- Content schema is defined in `content.config.ts`.
- Pure, runtime-agnostic helpers live in `utils/`; browser wrappers in `app/utils/`; server
  wrappers in `server/utils/`.

## Commands

Use pnpm.

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm check
```

The dev server script uses port `5173`.

## Code Conventions

- Use TypeScript and Vue single-file components.
- Use Nuxt composables such as `useAsyncData`, `useSeoMeta`, `useSchemaOrg`, and Nuxt
  Content helpers.
- Query content with `queryCollection(...)`; server routes should use `@nuxt/content/server`.
- Filter draft blog posts with `.where("draft", "<>", true)` in public listings and feeds.
  `queryPublicArticleCount` and the `publicBlog` helper in `app/utils/article-listing.ts`
  already do this.
- Keep SEO metadata current for user-facing pages.
- Prefer existing helpers: `formatDate` in `app/utils/date.ts` and `readingStats` in
  `utils/reading-time.ts`.
- Do not add client-only behavior unless the feature genuinely needs it.

## Content Rules

Place new blog posts under a year folder, for example
`content/blog/2026/nuxt-content-structure.md`. This maps to `/blog/2026/nuxt-content-structure`.

Blog front matter should match the schema in `content.config.ts`.

```yaml
---
title: "Post title"
description: "Post summary"
date: 2026-05-13
updated: 2026-05-14
tags: ["Nuxt", "Blog"]
draft: false
featured: true
---
```

- `title`, `description`, and `date` are required.
- `updated`, `tags`, `cover`, `draft`, and `featured` are optional.
- Keep markdown compatible with Nuxt Content / MDC and `mdclint`.
- `content/blog/2026/markdown-style-guide.md` is the reference for every supported
  directive and Markdown element. Update it when adding a new MDC component.

## UI And Styling

- When designing or substantially revising pages, use the local `frontend-design` skill to
  shape the visual direction before implementation.
- The design language is deliberately plain: near-monochrome, no card chrome around
  listings, one reading measure, generous whitespace, and a dot-grid backdrop. New UI
  should look like it belongs to a printed page, not a dashboard.
- Use the tokens in `app/assets/css/main.css`: `--ink`, `--ink-soft`, `--ink-faint`,
  `--paper`, `--paper-sunk`, `--rule`, `--rule-soft`, `--link`, `--mark`.
- Use the `.shell` / `.shell-wide` / `.measure` utilities for page width instead of ad-hoc
  max-widths.
- Article body styles belong in `ArticleProse.vue`; keep them low-specificity `:where()`
  rules so any single class can override them.
- Icons: add a body to `app/utils/icons.ts` and render it with `<AppIcon name="…" />`.
  There is no icon font or icon dependency.
- Scoped styles do not apply to vnodes a component creates in its own render function
  (Vue attaches the scope id in the parent's render). When building markup that way, use
  namespaced global classes instead — see `ProseCodeGroup.vue`.

## Formatting And Quality

- Formatting is handled by `oxfmt`; markdown is intentionally excluded from `pnpm format`.
- Before finishing code changes, run the narrowest useful checks. For broader changes run:

```bash
pnpm check
```

If `pnpm check` is too broad, at least run the relevant lint, typecheck, or build command
and report what was run.
