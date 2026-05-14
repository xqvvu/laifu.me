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
  <article class="group border-b border-(--site-line) py-7 first:pt-0">
    <div class="mb-3 flex flex-wrap items-center gap-3 text-sm text-(--site-muted)">
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
          class="rounded-md border border-(--site-line) px-2 py-0.5 text-xs hover:border-(--site-accent) hover:text-(--site-accent)"
          :to="`/tags/${encodeURIComponent(tag)}`"
        >
          {{ tag }}
        </NuxtLink>
      </div>
    </div>

    <NuxtLink class="block" :to="article.path">
      <h2
        class="text-xl font-semibold tracking-normal text-(--site-fg) group-hover:text-(--site-accent) sm:text-2xl"
      >
        {{ article.title }}
      </h2>
      <p class="mt-3 max-w-2xl text-base/7 text-(--site-muted)">
        {{ article.description }}
      </p>
    </NuxtLink>
  </article>
</template>
