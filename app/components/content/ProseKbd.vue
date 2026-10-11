<script setup lang="ts">
/** `:kbd{value="⌘"}` — an inline key cap. */
defineProps<{
  value?: string;
}>();
</script>

<template>
  <kbd>{{ value }}</kbd>
</template>
