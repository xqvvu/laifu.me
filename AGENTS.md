# AGENTS.md

This repo is a personal blog built with Nuxt 4, Nuxt Content, Nuxt UI, Tailwind CSS v4, and Nuxt SEO. When working here, prefer small, project-shaped changes over broad rewrites.

## Use `nuxt-remote` First

For Nuxt-related work, use the `nuxt-remote` MCP before relying on memory.

- Use `list_documentation_pages` and `get_documentation_page` for Nuxt 4 docs, especially routing, data fetching, server routes, rendering, deployment, and directory conventions.
- Use `get_module` or `list_modules` before changing module setup for `@nuxt/content`, `@nuxt/ui`, `@nuxtjs/seo`, `@nuxt/fonts`, or other Nuxt modules.
- Use `get_changelog` when behavior may depend on recent Nuxt or official module releases.
- Use `list_deploy_providers` / `get_deploy_provider` when touching deployment or hosting assumptions.
- After checking docs, align the implementation with this codebase's existing patterns instead of introducing a new architecture.

## Project Shape

- App code lives in `app/`.
- Pages live in `app/pages/` and use Nuxt file-based routing.
- Shared components live in `app/components/`.
- Global styling lives in `app/assets/css/main.css`.
- Content lives in `content/`.
- Blog posts live in `content/blog/*.md`.
- Static pages live in `content/pages/*.md`.
- Content schema is defined in `content.config.ts`.
- RSS and sitemap support live in `server/routes/rss.xml.ts` and `server/api/__sitemap__/urls.ts`.

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
- Use Nuxt composables such as `useAsyncData`, `useSeoMeta`, `useSchemaOrg`, and Nuxt Content helpers.
- Query content with `queryCollection(...)`; server routes should use `@nuxt/content/server`.
- Filter draft blog posts with `.where("draft", "<>", true)` in public listings and feeds.
- Keep SEO metadata current for user-facing pages.
- Prefer existing helpers: `formatDate` in `app/utils/date.ts` for app templates, and `readingStats` in `utils/reading-time.ts` for Content parsing.
- Do not add client-only behavior unless the feature genuinely needs it.

## Content Rules

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

## UI And Styling

- Prefer Nuxt UI components already used in the app (`UButton`, `UInput`, `UPagination`, `UContentToc`, `UIcon`, `UEmpty`).
- Use lucide icons through Iconify classes such as `i-lucide-book-open`.
- Keep the visual style quiet and text-focused: restrained borders, compact cards, neutral colors, and readable spacing.
- Reuse CSS variables from `app/assets/css/main.css`: `--site-bg`, `--site-fg`, `--site-muted`, `--site-line`, `--site-panel`, and `--site-accent`.
- Use `.site-container` for page width and `.article-prose` for rendered article content.
- Avoid unrelated palette or layout redesigns.

## Formatting And Quality

- Formatting is handled by `oxfmt`; markdown is intentionally excluded from `pnpm format`.
- ESLint includes Nuxt, Vue, Tailwind class validation, and mdclint.
- Before finishing code changes, run the narrowest useful checks. For broader changes, run:

```bash
pnpm check
```

If `pnpm check` is too broad for the change, at least run the relevant lint, typecheck, or build command and report what was run.
