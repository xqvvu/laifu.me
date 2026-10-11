<script setup lang="ts">
import { icons, type IconName } from "~/utils/icons";

/**
 * Renders one of the site's inlined icons. The icon bodies and the
 * reasoning behind inlining them live in `~/utils/icons`.
 */
const props = withDefaults(
  defineProps<{
    name: IconName;
    /** Rendered size; the icon inherits the surrounding font size by default. */
    size?: number | string;
  }>(),
  {
    size: "1em",
  },
);

const body = computed(() => icons[props.name]);
</script>

<template>
  <svg
    class="app-icon"
    :style="{ width: size, height: size }"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    v-html="body"
  />
</template>

<style scoped>
.app-icon {
  display: inline-block;
  flex: none;
  vertical-align: -0.125em;
}
</style>
