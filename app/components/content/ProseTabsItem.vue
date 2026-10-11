<script setup lang="ts">
const props = defineProps<{
  label?: string;
  icon?: string;
}>();

const tabs = inject<{ name: string; register: () => number }>("prose-tabs");
const index = tabs ? tabs.register() : 0;
const groupName = tabs?.name || `tabs-standalone-${useId()}`;
const inputId = `${groupName}-${index}`;
</script>

<template>
  <div class="prose-tab">
    <input
      :id="inputId"
      class="prose-tab__input"
      type="radio"
      :name="groupName"
      :checked="index === 0"
    />
    <label class="prose-tab__label" :for="inputId">
      <span v-if="props.icon" class="prose-tab__icon" :class="props.icon" aria-hidden="true" />
      {{ props.label }}
    </label>
    <div class="prose-tab__panel">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.prose-tab {
  display: contents;
}

.prose-tab__input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.prose-tab__label {
  display: inline-flex;
  order: 0;
  align-items: center;
  gap: 0.35rem;
  border-bottom: 2px solid transparent;
  margin-inline: 0.15rem;
  padding: 0.6rem 0.7rem;
  color: var(--ink-faint);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 120ms ease;
}

.prose-tab__label:hover {
  color: var(--ink-soft);
}

.prose-tab__icon {
  font-size: 0.9rem;
}

.prose-tab__input:checked + .prose-tab__label {
  border-bottom-color: var(--ink);
  color: var(--ink);
}

.prose-tab__input:focus-visible + .prose-tab__label {
  outline: 2px solid var(--mark);
  outline-offset: -2px;
}

.prose-tab__panel {
  display: none;
  order: 1;
  width: 100%;
  border-top: 1px solid var(--rule);
  padding: 0.35rem 0.2rem;
}

.prose-tab__input:checked ~ .prose-tab__panel {
  display: block;
}

.prose-tab__panel :deep(> :first-child) {
  margin-block-start: 0;
}

.prose-tab__panel :deep(> :last-child) {
  margin-block-end: 0;
}

/*
 * A panel is already a framed region, so code inside it drops its own
 * border, background and filename header — nesting both reads as clutter.
 */
.prose-tab__panel :deep(.prose-pre) {
  margin: 0;
}

.prose-tab__panel :deep(.prose-pre__header) {
  display: none;
}

.prose-tab__panel :deep(pre) {
  border: 0;
  border-radius: 0;
  background: none;
  margin: 0;
  padding: 0;
}
</style>
