<script setup lang="ts">
defineProps<{
  icon?: string;
  title?: string;
}>();
</script>

<template>
  <ProseCallout icon="i-lucide-lightbulb" tone="tip" :title="title">
    <slot />
  </ProseCallout>
</template>
