<script setup lang="ts">
defineProps<{
  article: {
    path: string;
    title: string;
    description: string;
    date: string;
    reading?: {
      text: string;
      wordCountText: string;
    };
    tags?: string[];
  };
}>();
</script>

<template>
  <NuxtLink class="post" :to="article.path">
    <h2 class="post__title">{{ article.title }}</h2>
    <p class="post__desc">{{ article.description }}</p>
    <p class="post__meta">
      <time :datetime="article.date">{{ formatDate(article.date) }}</time>
      <template v-if="article.reading">
        <span aria-hidden="true">·</span>
        <span>{{ article.reading.text }}</span>
      </template>
      <template v-if="article.tags?.length">
        <span aria-hidden="true">·</span>
        <span>{{ article.tags.join(" / ") }}</span>
      </template>
    </p>
  </NuxtLink>
</template>

<style scoped>
/*
 * A listing row is a link, not a card. No border, no background: the
 * title carries the weight and the whole row is the hit target.
 */
.post {
  display: block;
  border-radius: 6px;
  margin-inline: -0.75rem;
  padding: 0.7rem 0.75rem 0.85rem;
  text-decoration: none;
  transition: background-color 140ms ease;
}

.post:hover {
  background: var(--paper-sunk);
}

.post__title {
  margin: 0;
  color: var(--ink);
  font-size: 1.0625rem;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0;
}

.post:hover .post__title {
  text-decoration: underline;
  text-decoration-color: var(--link-underline);
  text-underline-offset: 0.2em;
}

.post__desc {
  margin: 0.3rem 0 0;
  color: var(--ink-soft);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.post__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 0.5rem 0 0;
  color: var(--ink-faint);
  font-size: 0.8125rem;
}
</style>
