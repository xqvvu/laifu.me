<script setup lang="ts">
defineProps<{
  date: string;
  updated?: string;
  reading?: {
    text: string;
    wordCountText: string;
  };
}>();
</script>

<template>
  <div class="flex flex-wrap items-center gap-2 text-sm text-(--site-muted)">
    <time :datetime="date">{{ formatDate(date, "long") }}</time>
    <span v-if="reading" class="text-(--site-line)" aria-hidden="true">/</span>
    <span v-if="reading">{{ reading.wordCountText }}</span>
    <span v-if="reading" class="text-(--site-line)" aria-hidden="true">/</span>
    <span v-if="reading">{{ reading.text }}</span>
    <span v-if="updated" class="text-(--site-line)" aria-hidden="true">/</span>
    <span v-if="updated">更新于 {{ formatDate(updated, "long") }}</span>
  </div>
</template>
