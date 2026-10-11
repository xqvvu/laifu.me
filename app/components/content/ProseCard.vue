<script setup lang="ts">
const props = defineProps<{
  title?: string;
  /** An `i-lucide-x` reference from frontmatter; see `resolveIcon`. */
  icon?: string;
  to?: string;
}>();

const iconName = computed(() => resolveIcon(props.icon));
</script>

<template>
  <component
    :is="to ? 'a' : 'div'"
    class="prose-card"
    :href="to"
    :class="{ 'prose-card--link': to }"
  >
    <p v-if="title" class="prose-card__title">
      <AppIcon v-if="iconName" class="prose-card__icon" :name="iconName" />
      {{ title }}
    </p>
    <div class="prose-card__body">
      <slot />
    </div>
  </component>
</template>

<style scoped>
.prose-card {
  display: block;
  border: 1px solid var(--rule);
  border-radius: 8px;
  padding: 1em 1.1em;
  color: inherit;
  text-decoration: none;
}

.prose-card--link {
  transition:
    border-color 140ms ease,
    background-color 140ms ease;
}

.prose-card--link:hover {
  border-color: color-mix(in srgb, var(--ink), transparent 65%);
  background: var(--paper-sunk);
}

.prose-card__title {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-block: 0;
  color: var(--ink);
  font-weight: 600;
}

.prose-card__icon {
  color: var(--ink-faint);
}

.prose-card__body {
  color: var(--ink-soft);
  font-size: 0.95rem;
}

.prose-card__body :deep(p) {
  margin-block: 0.45em 0;
}

.prose-card:not(:has(.prose-card__title)) .prose-card__body :deep(p:first-child) {
  margin-block-start: 0;
}
</style>
