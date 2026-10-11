<script setup lang="ts">
defineProps<{
  icon?: string;
  title?: string;
}>();
</script>

<template>
  <ProseCallout icon="i-lucide-triangle-alert" tone="warning" :title="title">
    <slot />
  </ProseCallout>
</template>
