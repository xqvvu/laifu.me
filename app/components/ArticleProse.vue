<script setup lang="ts">
import type { Collections } from "@nuxt/content";

defineProps<{
  value: Collections["blog"] | Collections["pages"];
}>();
</script>

<template>
  <ContentRenderer class="article-prose" :value="value" />
</template>

<style>
/*
 * Article typography. Everything is expressed as low-specificity
 * `:where()` rules so a single class can override any part without a
 * cascade fight. Rhythm comes from sibling margins, not per-element
 * margins, so vertical space stays even no matter the content order.
 */
.article-prose {
  color: var(--ink);
  font-size: 1.0625rem;
  line-height: 1.78;
}

.article-prose
  > :where(
    p,
    ul,
    ol,
    blockquote,
    pre,
    table,
    figure,
    details,
    aside,
    .prose-card,
    .prose-tabs,
    .prose-code-group,
    .prose-code-collapse
  ) {
  margin-block: 1.35em;
}

.article-prose > :where(:first-child) {
  margin-block-start: 0;
}

.article-prose > :where(:last-child) {
  margin-block-end: 0;
}

/* Headings: level is signalled by size and space, not by rules or colour. */
.article-prose :where(h2) {
  margin-block: 2.6em 0.9em;
  font-size: 1.4rem;
  line-height: 1.35;
}

.article-prose :where(h3) {
  margin-block: 2em 0.7em;
  font-size: 1.175rem;
  line-height: 1.4;
}

.article-prose :where(h4, h5, h6) {
  margin-block: 1.7em 0.6em;
  font-size: 1rem;
  line-height: 1.5;
}

.article-prose :where(h1, h2, h3, h4, h5, h6) {
  scroll-margin-top: 5rem;
}

/* Anchor links appear on hover only — they should never be visible noise. */
.article-prose :where(h2, h3, h4, h5, h6) > a {
  color: inherit;
  text-decoration: none;
}

.article-prose :where(h1, h2, h3, h4, h5, h6) > a:hover::after {
  margin-left: 0.4em;
  color: var(--ink-faint);
  content: "#";
  font-weight: 400;
}

.article-prose :where(a) {
  color: var(--link);
  text-decoration: underline;
  text-decoration-color: var(--link-underline);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
  transition: text-decoration-color 120ms ease;
}

.article-prose :where(a:hover) {
  text-decoration-color: var(--link);
}

.article-prose :where(strong) {
  color: var(--ink);
  font-weight: 600;
}

.article-prose :where(em) {
  font-style: italic;
}

.article-prose :where(del) {
  color: var(--ink-faint);
}

.article-prose :where(hr) {
  margin-block: 3em;
  border: 0;
  border-top: 1px solid var(--rule);
}

.article-prose :where(ul, ol) {
  padding-inline-start: 1.4em;
}

.article-prose :where(ul) {
  list-style: disc;
}

.article-prose :where(ol) {
  list-style: decimal;
}

.article-prose :where(li) {
  margin-block: 0.45em;
  padding-inline-start: 0.2em;
}

/* Not wrapped in :where() — a pseudo-element is invalid inside it and the
   whole rule gets dropped by the CSS minifier. */
.article-prose li::marker {
  color: var(--ink-faint);
}

.article-prose :where(li > ul, li > ol) {
  margin-block: 0.45em;
}

/* Task lists render without a bullet and with the box where the marker was. */
.article-prose :where(li:has(> input[type="checkbox"])) {
  list-style: none;
  margin-inline-start: -1.2em;
  padding-inline-start: 0;
}

.article-prose :where(input[type="checkbox"]) {
  width: 0.95em;
  height: 0.95em;
  margin-inline-end: 0.5em;
  accent-color: var(--mark);
  vertical-align: -0.08em;
}

.article-prose :where(blockquote) {
  border-inline-start: 2px solid var(--rule);
  padding-inline-start: 1.1em;
  color: var(--ink-soft);
}

.article-prose :where(blockquote) :where(p) {
  margin-block: 0.8em;
}

.article-prose :where(code) {
  border-radius: 4px;
  background: var(--paper-sunk);
  padding: 0.15em 0.36em;
  color: var(--ink);
  font-size: 0.875em;
  overflow-wrap: break-word;
}

/* Blocks escape the measure so long lines get room to breathe. */
.article-prose :where(pre) {
  max-width: 100%;
  overflow-x: auto;
  border: 1px solid var(--rule);
  border-radius: 8px;
  background: var(--paper-sunk);
  padding: 1em 1.1em;
  font-size: 0.855rem;
  line-height: 1.65;
  overscroll-behavior-x: contain;
}

.article-prose :where(pre code) {
  border: 0;
  background: none;
  padding: 0;
  font-size: inherit;
}

.article-prose :where(pre code .line) {
  display: block;
  min-height: 1.65em;
}

.article-prose :where(pre code .line.highlight) {
  margin-inline: -1.1em;
  border-inline-start: 2px solid var(--mark);
  background: color-mix(in srgb, var(--mark), transparent 92%);
  padding-inline: calc(1.1em - 2px);
}

.article-prose :where(table) {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.article-prose :where(th, td) {
  border-bottom: 1px solid var(--rule);
  padding: 0.55em 0.9em;
  text-align: left;
}

.article-prose :where(th) {
  color: var(--ink-soft);
  font-weight: 600;
  white-space: nowrap;
}

.article-prose :where(tbody tr:last-child td) {
  border-bottom: 0;
}

.article-prose :where(img) {
  max-width: 100%;
  height: auto;
  border: 1px solid var(--rule);
  border-radius: 8px;
}

.article-prose :where(kbd) {
  border: 1px solid var(--rule);
  border-bottom-width: 2px;
  border-radius: 5px;
  background: var(--paper-sunk);
  padding: 0.1em 0.4em;
  font-size: 0.82em;
}
</style>
