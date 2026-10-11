<script setup lang="ts">
/**
 * Tabs for `::tabs` / `::tabs-item`. Implemented with native radio inputs so
 * it needs no client-side state and survives prerendering as plain HTML.
 * Items register themselves with the group to get a shared `name`.
 */
const props = defineProps<{
  name?: string;
}>();

const groupName = props.name || `tabs-${useId()}`;
let counter = 0;

provide("prose-tabs", {
  name: groupName,
  register: () => counter++,
});
</script>

<template>
  <div class="prose-tabs">
    <slot />
  </div>
</template>

<style scoped>
/* Flex-wrap turns the labels into a single row and lets every panel sit
   full-width on the row below. */
.prose-tabs {
  display: flex;
  flex-wrap: wrap;
  margin-block: 1.35em;
  border: 1px solid var(--rule);
  border-radius: 8px;
  overflow: hidden;
}
</style>
