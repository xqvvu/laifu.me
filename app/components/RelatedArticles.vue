<script setup lang="ts">
defineProps<{
  articles?: {
    path: string;
    title: string;
    description: string;
    date: string;
    tags?: string[];
  }[];
}>();
</script>

<template>
  <section v-if="articles?.length">
    <h2 class="text-sm font-semibold text-(--ink-faint)">相关文章</h2>
    <ul class="mt-3 divide-y divide-(--rule)">
      <li v-for="article in articles" :key="article.path">
        <NuxtLink class="related" :to="article.path">
          <span class="related__title">{{ article.title }}</span>
          <time class="related__date" :datetime="article.date">
            {{ formatDate(article.date) }}
          </time>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.related {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 0.7rem;
  color: var(--ink);
  text-decoration: none;
}

.related__title {
  font-size: 0.9375rem;
  line-height: 1.5;
}

.related:hover .related__title {
  text-decoration: underline;
  text-decoration-color: var(--link-underline);
  text-underline-offset: 0.2em;
}

.related__date {
  flex: none;
  color: var(--ink-faint);
  font-size: 0.8125rem;
}
</style>
