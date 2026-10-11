<script setup lang="ts">
type SurroundArticle = {
  path: string;
  title: string;
  description?: string;
};

defineProps<{
  previous?: SurroundArticle | null;
  next?: SurroundArticle | null;
}>();
</script>

<template>
  <nav v-if="previous || next" class="grid gap-6 sm:grid-cols-2" aria-label="相邻文章">
    <NuxtLink v-if="previous" class="nav-item" :to="previous.path">
      <span class="nav-item__label">← 上一篇</span>
      <span class="nav-item__title">{{ previous.title }}</span>
    </NuxtLink>

    <NuxtLink v-if="next" class="nav-item sm:text-right" :to="next.path">
      <span class="nav-item__label">下一篇 →</span>
      <span class="nav-item__title">{{ next.title }}</span>
    </NuxtLink>
  </nav>
</template>

<style scoped>
.nav-item {
  display: block;
  color: var(--ink);
  text-decoration: none;
}

.nav-item__label {
  display: block;
  margin-bottom: 0.35rem;
  color: var(--ink-faint);
  font-size: 0.8125rem;
}

.nav-item__title {
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.5;
}

.nav-item:hover .nav-item__title {
  text-decoration: underline;
  text-decoration-color: var(--link-underline);
  text-underline-offset: 0.2em;
}
</style>
