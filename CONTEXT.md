# laifu.me Context

## Purpose

`laifu.me` is a personal blog for long-form notes about engineering, product thinking, tools, and life systems. The site should stay quiet, text-focused, fast to navigate, and easy to maintain as content grows.

## Domain Glossary

### Blog Article

A long-form Markdown entry under `content/blog/YYYY/slug.md`. Blog Articles are public unless `draft: true` is set in front matter.

### Static Page

A Markdown page under `content/pages/*.md`, used for durable pages such as About.

### Article Listing

A public view over non-draft Blog Articles, ordered newest first. Article Listings appear on the home page, blog index, archive page, tag pages, RSS feed, sitemap, and article-related sections.

### Tag

A front matter label attached to a Blog Article. Tags power tag pages, blog index filters, related articles, and sitemap tag URLs.

### Reading Metadata

Derived information added to Blog Articles during Nuxt Content parsing, including word count and estimated reading time.

### Article Reading Experience

The user-facing article page: metadata, title, prose rendering, table of contents, navigation, and related articles.

### Feed Output

Machine-readable publication surfaces such as RSS and sitemap URLs. Feed Output must exclude draft Blog Articles.

## Current Architecture Notes

- Nuxt pages query Blog Articles directly with `queryCollection(...)`.
- Server Feed Output uses `@nuxt/content/server`.
- Public content surfaces must consistently filter drafts with `.where("draft", "<>", true)`.
- UI should reuse project styling utilities such as `.site-container`, `.article-prose`, and site CSS variables.

## Avoided Vocabulary

- Prefer "Blog Article" over "post" when describing domain behavior.
- Prefer "Article Listing" over "list page" when discussing shared content query behavior.
- Prefer "Feed Output" over "SEO endpoint" for RSS and sitemap behavior.
