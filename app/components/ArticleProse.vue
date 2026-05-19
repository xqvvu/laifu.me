<script setup lang="ts">
import type { Collections } from "@nuxt/content";

defineProps<{
  value: Collections["blog"] | Collections["pages"];
}>();
</script>

<template>
  <ContentRenderer :class="$style.prose" :value="value" />
</template>

<style module>
@layer components {
  .prose {
    width: 100%;
    max-width: 720px;
    min-width: 0;
  }

  .prose :where(h1, h2, h3, h4) {
    scroll-margin-top: 96px;
    letter-spacing: 0;
  }

  .prose :where(p, li) {
    line-height: 1.85;
  }

  .prose :where(pre) {
    max-width: 100%;
    overflow: auto;
    border: 1px solid var(--site-line);
    overscroll-behavior-x: contain;
  }

  .prose :where(pre.shiki) {
    max-width: 100%;
    overflow-x: auto;
    white-space: pre;
  }

  .prose :where(pre code) {
    display: block;
    width: max-content;
    min-width: 100%;
  }

  .prose :where(pre code .line) {
    min-height: 1.5rem;
  }

  .prose :where(pre code .line.highlight) {
    border-left: 2px solid var(--site-accent);
  }

  .prose :where(.group, [class*="group"]):has(> pre) {
    max-width: 100%;
    overflow: hidden;
  }

  .prose :where([class*="group"] > pre) {
    scrollbar-width: thin;
  }

  .prose :where(.group, [class*="group"]):has(> pre + button:last-child) {
    margin-bottom: 3rem;
  }

  .prose
    :where(.group, [class*="group"]):has(> pre + button:last-child)
    + :where(h1, h2, h3, h4, p, figure) {
    margin-top: 3rem;
  }

  .prose :where(table) {
    display: block;
    max-width: 100%;
    overflow-x: auto;
    white-space: nowrap;
  }

  :global(.dark) .prose :where(pre) {
    background-color: #090909 !important;
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.04);
  }

  .prose :where(img) {
    max-width: 100%;
    height: auto;
    border: 1px solid var(--site-line);
    border-radius: 8px;
  }
}
</style>
