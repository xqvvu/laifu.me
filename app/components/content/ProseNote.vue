<script setup lang="ts">
defineProps<{
  icon?: string;
  title?: string;
}>();
</script>

<template>
  <ProseCallout icon="i-lucide-info" tone="note" :title="title">
    <slot />
  </ProseCallout>
</template>
