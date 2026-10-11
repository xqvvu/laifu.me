<script setup lang="ts">
const route = useRoute();
const tag = computed(() => decodeURIComponent(route.params.tag as string));

const { data: articles } = await useAsyncData(`tag-${tag.value}`, () => queryTagArticles());
const taggedArticles = computed(() => filterArticlesByTag(articles.value || [], tag.value));

useSeoMeta({
  title: () => `标签：${tag.value}`,
  description: () => `laifu.me 中带有 ${tag.value} 标签的文章。`,
});
</script>

<template>
  <div class="shell pt-14 sm:pt-20">
    <header class="max-w-[36rem]">
      <p class="text-sm text-(--ink-faint)">
        <NuxtLink class="muted-link hover:text-(--ink)" to="/blog">文章</NuxtLink>
        <span aria-hidden="true"> / </span>
        <span>标签</span>
      </p>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{{ tag }}</h1>
      <p class="mt-4 text-base/7 text-(--ink-soft)">{{ taggedArticles.length }} 篇文章</p>
    </header>

    <div class="mt-10 max-w-[44rem]">
      <ArticleCard v-for="article in taggedArticles" :key="article.path" :article="article" />
    </div>
  </div>
</template>
