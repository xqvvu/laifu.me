<script setup lang="ts">
const props = defineProps<{
  article: {
    path: string;
    title: string;
    description: string;
    date: string;
    body?: unknown;
    tags?: string[];
  };
}>();

const stats = computed(() => (props.article.body ? readingStats(props.article.body) : null));
</script>

<template>
  <article class="group border-b border-[var(--site-line)] py-7 first:pt-0">
    <div class="mb-3 flex flex-wrap items-center gap-3 text-sm text-[var(--site-muted)]">
      <time :datetime="article.date">{{ formatDate(article.date) }}</time>
      <span v-if="stats" aria-hidden="true">/</span>
      <span v-if="stats">{{ stats.wordCountText }}</span>
      <span v-if="stats" aria-hidden="true">/</span>
      <span v-if="stats">{{ stats.text }}</span>
      <span v-if="article.tags?.length" aria-hidden="true">/</span>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="tag in article.tags"
          :key="tag"
          :to="`/tags/${encodeURIComponent(tag)}`"
          class="rounded-md border border-[var(--site-line)] px-2 py-0.5 text-xs hover:border-[var(--site-accent)] hover:text-[var(--site-accent)]"
        >
          {{ tag }}
        </NuxtLink>
      </div>
    </div>

    <NuxtLink :to="article.path" class="block">
      <h2
        class="text-xl font-semibold tracking-normal text-[var(--site-fg)] group-hover:text-[var(--site-accent)] sm:text-2xl"
      >
        {{ article.title }}
      </h2>
      <p class="mt-3 max-w-2xl text-base leading-7 text-[var(--site-muted)]">
        {{ article.description }}
      </p>
    </NuxtLink>
  </article>
</template>
