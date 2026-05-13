<script setup lang="ts">
const route = useRoute();
const tag = computed(() => decodeURIComponent(route.params.tag as string));

const { data: articles } = await useAsyncData(`tag-${tag.value}`, () =>
  queryCollection("blog").where("draft", "<>", true).order("date", "DESC").all(),
);

const taggedArticles = computed(() =>
  (articles.value || []).filter((article) => article.tags?.includes(tag.value)),
);

useSeoMeta({
  title: () => `标签：${tag.value}`,
  description: () => `laifu.me 中带有 ${tag.value} 标签的文章。`,
});
</script>

<template>
  <section class="site-container py-12 sm:py-16">
    <NuxtLink
      to="/blog"
      class="mb-8 inline-flex items-center gap-2 text-sm text-[var(--site-muted)] hover:text-[var(--site-accent)]"
    >
      <UIcon name="i-lucide-arrow-left" class="size-4" />
      返回文章
    </NuxtLink>

    <header class="mb-10">
      <p class="text-sm tracking-[0.16em] text-[var(--site-accent)] uppercase">Tag</p>
      <h1 class="mt-3 text-4xl font-semibold tracking-normal">{{ tag }}</h1>
      <p class="mt-4 text-[var(--site-muted)]">{{ taggedArticles.length }} 篇文章</p>
    </header>

    <ArticleCard v-for="article in taggedArticles" :key="article.path" :article="article" />
  </section>
</template>
