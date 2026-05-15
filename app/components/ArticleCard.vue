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
    <div class="mb-3 flex flex-wrap items-center gap-2 text-sm text-(--site-muted)">
      <time :datetime="article.date">{{ formatDate(article.date) }}</time>
      <span v-if="stats" class="text-(--site-line)" aria-hidden="true">/</span>
      <span v-if="stats">{{ stats.wordCountText }}</span>
      <span v-if="stats" class="text-(--site-line)" aria-hidden="true">/</span>
      <span v-if="stats">{{ stats.text }}</span>
      <span v-if="article.tags?.length" class="text-(--site-line)" aria-hidden="true">/</span>
      <div class="flex flex-wrap gap-1.5">
        <NuxtLink
          v-for="tag in article.tags"
          :key="tag"
          class="rounded-md border border-(--site-line) px-2 py-0.5 text-xs transition-colors hover:border-(--site-accent) hover:text-(--site-accent)"
          :to="`/tags/${encodeURIComponent(tag)}`"
        >
          {{ tag }}
        </NuxtLink>
      </div>
    </div>

    <NuxtLink
      class="block rounded-md py-2 transition-colors hover:bg-(--site-panel)"
      :to="article.path"
    >
      <h2
        class="text-xl font-semibold tracking-normal text-(--site-fg) transition-colors group-hover:text-(--site-accent) sm:text-2xl"
      >
        {{ article.title }}
      </h2>
      <div class="mt-3 flex items-center gap-3">
        <p class="max-w-2xl flex-1 text-base/7 text-(--site-muted)">
          {{ article.description }}
        </p>
        <UIcon
          class="mt-1 ml-auto size-4 shrink-0 text-(--site-muted) opacity-0 transition-opacity group-hover:opacity-100"
          name="i-lucide-arrow-up-right"
        />
      </div>
    </NuxtLink>
  </article>
</template>
