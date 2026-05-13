<script setup lang="ts">
const { data: page } = await useAsyncData("about-page", () =>
  queryCollection("pages").path("/pages/about").first(),
);

useSeoMeta({
  title: () => page.value?.title || "关于",
  description: () => page.value?.description || "关于 laifu.me。",
});
</script>

<template>
  <section class="site-container py-12 sm:py-16">
    <div class="max-w-3xl">
      <p class="text-sm tracking-[0.16em] text-[var(--site-accent)] uppercase">About</p>
      <ContentRenderer v-if="page" :value="page" class="article-prose mt-6" />
    </div>
  </section>
</template>
