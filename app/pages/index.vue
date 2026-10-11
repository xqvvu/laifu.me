<script setup lang="ts">
import { siteCopy } from "~/utils/site-copy";

const { data: recent } = await useAsyncData("home-posts", () => queryRecentArticles(6));

useSeoMeta({
  title: siteCopy.pageTitle,
  description: siteCopy.description,
  ogTitle: siteCopy.tagline,
  ogDescription: siteCopy.description,
  ogType: "website",
});
</script>

<template>
  <div class="shell pt-14 sm:pt-20">
    <!-- Intro: name as the only large type on the page, then plain prose. -->
    <section class="max-w-[36rem]">
      <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">{{ siteCopy.author }}</h1>
      <p class="mt-5 text-lg/8 text-(--ink-soft)">{{ siteCopy.tagline }}</p>

      <div class="mt-8 space-y-4 text-base/7 text-(--ink-soft)">
        <p v-for="paragraph in siteCopy.intro" :key="paragraph">{{ paragraph }}</p>
      </div>

      <div class="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <NuxtLink
          v-for="link in siteCopy.links"
          :key="link.label"
          class="prose-link"
          :to="link.href"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink class="prose-link" to="/about">关于</NuxtLink>
      </div>
    </section>

    <!-- Facts: a thin definition list, aligned in two columns. -->
    <dl class="mt-14 grid gap-x-6 gap-y-4 border-t border-(--rule) pt-8 sm:grid-cols-3">
      <div v-for="fact in siteCopy.facts" :key="fact.label">
        <dt class="text-sm text-(--ink-faint)">{{ fact.label }}</dt>
        <dd class="mt-1 text-sm text-(--ink-soft)">{{ fact.value }}</dd>
      </div>
    </dl>

    <!-- Recent writing: the page's actual payload. -->
    <section class="mt-20">
      <div class="flex items-baseline justify-between gap-4">
        <h2 class="text-sm font-semibold text-(--ink-faint)">最近写的</h2>
        <NuxtLink class="muted-link text-sm hover:text-(--ink)" to="/blog">全部文章 →</NuxtLink>
      </div>

      <div class="mt-4">
        <ArticleCard v-for="article in recent" :key="article.path" :article="article" />
      </div>
    </section>
  </div>
</template>
