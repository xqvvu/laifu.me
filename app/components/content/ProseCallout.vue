<script setup lang="ts">
/**
 * Shared markup for the `::note` / `::tip` / `::warning` directives.
 * Tones differ only by the colour of the left rule and the icon.
 */
const props = withDefaults(
  defineProps<{
    tone?: "note" | "tip" | "warning";
    title?: string;
  }>(),
  {
    tone: "note",
    title: undefined,
  },
);

const icons = {
  note: "info",
  tip: "lightbulb",
  warning: "triangle-alert",
} as const;

const icon = computed(() => icons[props.tone]);
</script>

<template>
  <aside class="callout" :class="`callout--${tone}`" :role="tone === 'warning' ? 'alert' : 'note'">
    <AppIcon class="callout__icon" :name="icon" />
    <div class="callout__body">
      <p v-if="title" class="callout__title">{{ title }}</p>
      <slot />
    </div>
  </aside>
</template>

<style scoped>
.callout {
  display: flex;
  gap: 0.7rem;
  border-inline-start: 2px solid var(--rule);
  padding-inline-start: 1em;
  color: var(--ink-soft);
}

.callout--note {
  border-inline-start-color: color-mix(in srgb, var(--ink), transparent 55%);
}

.callout--tip {
  border-inline-start-color: #16a34a;
}

.callout--warning {
  border-inline-start-color: #d97706;
}

.callout__icon {
  margin-top: 0.42em;
  color: var(--ink-faint);
}

.callout--tip .callout__icon {
  color: #16a34a;
}

.callout--warning .callout__icon {
  color: #d97706;
}

.callout__body {
  min-width: 0;
  flex: 1;
}

.callout__title {
  margin-block: 0;
  color: var(--ink);
  font-weight: 600;
}

.callout__body :deep(p) {
  margin-block: 0.3em;
}
</style>
