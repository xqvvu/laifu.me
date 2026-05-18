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
    <div class="flex items-center justify-between border-b border-(--site-line) pb-3">
      <h2 class="text-sm font-semibold text-(--site-muted)">相关文章</h2>
      <UIcon class="size-4 text-(--site-muted)" name="i-lucide-link" />
    </div>
    <div class="mt-4 grid gap-3">
      <NuxtLink
        v-for="article in articles"
        :key="article.path"
        class="group rounded-md border border-(--site-line) p-4 transition-colors hover:border-(--site-accent) hover:bg-(--site-panel)"
        :to="article.path"
      >
        <div class="mb-3 flex flex-wrap items-center gap-2 text-xs text-(--site-muted)">
          <time :datetime="article.date">{{ formatDate(article.date) }}</time>
          <span v-if="article.tags?.length" class="text-(--site-line)" aria-hidden="true"> / </span>
          <span v-for="tag in article.tags" :key="tag">{{ tag }}</span>
        </div>
        <p class="font-medium text-(--site-fg) group-hover:text-(--site-accent)">
          {{ article.title }}
        </p>
        <p class="mt-2 line-clamp-2 text-sm/6 text-(--site-muted)">
          {{ article.description }}
        </p>
      </NuxtLink>
    </div>
  </section>
</template>
