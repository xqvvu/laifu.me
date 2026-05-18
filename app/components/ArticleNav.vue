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
  <nav
    v-if="previous || next"
    aria-label="相邻文章"
    class="grid gap-4 border-t border-(--site-line) pt-8 sm:grid-cols-2"
  >
    <NuxtLink
      v-if="previous"
      class="group rounded-md border border-(--site-line) bg-(--site-panel)/45 p-4 transition-colors hover:border-(--site-accent)"
      :class="{ 'sm:col-span-2': !next }"
      :to="previous.path"
    >
      <span
        class="mb-3 inline-flex items-center gap-2 text-sm text-(--site-muted) group-hover:text-(--site-accent)"
      >
        <UIcon class="size-4" name="i-lucide-arrow-left" />
        上一篇
      </span>
      <p class="font-medium text-(--site-fg)">{{ previous.title }}</p>
      <p v-if="previous.description" class="mt-2 line-clamp-2 text-sm/6 text-(--site-muted)">
        {{ previous.description }}
      </p>
    </NuxtLink>

    <NuxtLink
      v-if="next"
      class="group rounded-md border border-(--site-line) bg-(--site-panel)/45 p-4 text-right transition-colors hover:border-(--site-accent)"
      :class="{ 'sm:col-span-2': !previous }"
      :to="next.path"
    >
      <span
        class="mb-3 inline-flex items-center justify-end gap-2 text-sm text-(--site-muted) group-hover:text-(--site-accent)"
      >
        下一篇
        <UIcon class="size-4" name="i-lucide-arrow-right" />
      </span>
      <p class="font-medium text-(--site-fg)">{{ next.title }}</p>
      <p v-if="next.description" class="mt-2 line-clamp-2 text-sm/6 text-(--site-muted)">
        {{ next.description }}
      </p>
    </NuxtLink>
  </nav>
</template>
