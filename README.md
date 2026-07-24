# laifu.me

Personal blog built with Nuxt 4, Nuxt Content, Nuxt UI and Nuxt SEO.

## Setup

Make sure to install dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

## Content

Blog posts live in `content/blog/*.md`.

```yaml
---
title: "Post title"
description: "Post summary"
date: 2026-05-13
tags: ["Nuxt", "Blog"]
draft: false
featured: true
---
```

## VS Code snippets

Workspace snippets for writing posts live in `.vscode/blog-mdc.code-snippets` (scope: `markdown` / `mdx`).

| Prefix | What it inserts |
| --- | --- |
| `blog` / `blogpost` | Post frontmatter + opening section |
| `blogdraft` | Draft frontmatter (`updated`, `cover`) |
| `note` / `tip` / `warning` | MDC callouts |
| `card` | MDC card |
| `tabs` | MDC tabs |
| `codegroup` | pnpm / npm / bun code group |
| `codecollapse` | Collapsible long code |
| `mdcode` | Code fence with filename |
| `videoplayer` | MP4 / self-hosted video |
| `youtube` / `bilibili` / `vimeo` | Embedded video |
| `blogimg` | Image |
| `blogsection` | H2 section skeleton |

Open a post under `content/blog/`, type a prefix, then accept the snippet.
