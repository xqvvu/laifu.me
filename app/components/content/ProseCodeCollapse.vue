<script setup lang="ts">
/**
 * `::code-collapse` — long code kept out of the way behind a native
 * `<details>`, so the reader scrolls past less and the page stays light.
 */
withDefaults(
  defineProps<{
    name?: string;
  }>(),
  {
    name: "展开代码",
  },
);
</script>

<template>
  <details class="prose-code-collapse">
    <summary>{{ name }}</summary>
    <div class="prose-code-collapse__body">
      <slot />
    </div>
  </details>
</template>

<style scoped>
.prose-code-collapse {
  margin-block: 1.35em;
  border: 1px solid var(--rule);
  border-radius: 8px;
  overflow: hidden;
}

.prose-code-collapse summary {
  border-bottom: 1px solid transparent;
  padding: 0.65rem 1rem;
  color: var(--ink-soft);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  user-select: none;
}

.prose-code-collapse summary:hover {
  color: var(--ink);
}

.prose-code-collapse[open] summary {
  border-bottom-color: var(--rule);
}

.prose-code-collapse__body :deep(pre) {
  border: 0;
  border-radius: 0;
  margin-block: 0;
}
</style>
