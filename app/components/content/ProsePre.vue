<script setup lang="ts">
/**
 * Overrides the default MDC `ProsePre` so a fenced block can carry a small
 * filename header, taken from the `[filename]` meta in markdown.
 *
 * Inside `::code-group` the filename is already shown as a tab label, so
 * the group sets `hideHeader` through provide() to avoid printing it twice.
 */
const props = withDefaults(
  defineProps<{
    code?: string;
    language?: string | null;
    filename?: string | null;
    highlights?: number[];
    meta?: string | null;
    class?: string | null;
    hideHeader?: boolean;
  }>(),
  {
    code: "",
    language: null,
    filename: null,
    highlights: () => [],
    meta: null,
    class: null,
    hideHeader: undefined,
  },
);

const grouped = inject<{ hidePreHeader: boolean } | null>("prose-code-group", null);

const showHeader = computed(
  () => !(grouped?.hidePreHeader ?? false) && Boolean(props.filename || props.language),
);

const headerLabel = computed(() => props.filename || props.language);
</script>

<template>
  <div class="prose-pre" :class="{ 'prose-pre--grouped': grouped }">
    <p v-if="showHeader" class="prose-pre__header">
      {{ headerLabel }}
    </p>
    <pre :class="props.class"><slot /></pre>
  </div>
</template>

<style scoped>
.prose-pre {
  position: relative;
}

.prose-pre__header {
  margin: 0;
  border: 1px solid var(--rule);
  border-bottom: 0;
  border-radius: 8px 8px 0 0;
  background: color-mix(in srgb, var(--paper-sunk), var(--ink) 3%);
  padding: 0.4rem 1.1rem;
  color: var(--ink-faint);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  line-height: 1.5;
}

.prose-pre__header + pre {
  border-radius: 0 0 8px 8px;
}

/* Inside a tab panel the panel already supplies the frame. */
.prose-pre--grouped :deep(pre) {
  border: 0;
  border-radius: 0;
  background: none;
  margin-block: 0;
  padding: 0;
}
</style>
