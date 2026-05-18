<script setup lang="ts">
defineProps<{
  tags?: string[];
}>();
</script>

<template>
  <div v-if="tags?.length" class="flex flex-wrap gap-1.5">
    <NuxtLink
      v-for="tag in tags"
      :key="tag"
      class="rounded-md border border-(--site-line) px-3 py-1 text-sm text-(--site-muted) transition-colors hover:border-(--site-accent) hover:text-(--site-accent)"
      :to="`/tags/${encodeURIComponent(tag)}`"
    >
      {{ tag }}
    </NuxtLink>
  </div>
</template>
