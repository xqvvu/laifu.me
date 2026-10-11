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
  <div class="shell pt-14 sm:pt-20">
    <div class="max-w-[44rem]">
      <ArticleProse v-if="page" :value="page" />
    </div>
  </div>
</template>
