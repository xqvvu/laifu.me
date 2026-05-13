<script setup lang="ts">
const { data: articles } = await useAsyncData("archive-posts", () =>
  queryCollection("blog").where("draft", "<>", true).order("date", "DESC").all(),
);

const groups = computed(() => {
  const grouped = new Map<string, typeof articles.value>();

  for (const article of articles.value || []) {
    const date = new Date(article.date);
    const key = `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`;
    const items = grouped.get(key) || [];

    grouped.set(key, [...items, article]);
  }

  return [...grouped.entries()];
});

useSeoMeta({
  title: "归档",
  description: "laifu.me 的文章时间归档。",
});
</script>

<template>
  <section class="site-container py-12 sm:py-16">
    <div class="mb-10">
      <p class="text-sm tracking-[0.16em] text-[var(--site-accent)] uppercase">Archive</p>
      <h1 class="mt-3 text-4xl font-semibold tracking-normal">归档</h1>
      <p class="mt-4 max-w-2xl text-[var(--site-muted)]">按发布时间浏览所有文章。</p>
    </div>

    <div class="max-w-3xl">
      <section
        v-for="[month, items] in groups"
        :key="month"
        class="border-t border-[var(--site-line)] py-8 first:border-t-0 first:pt-0"
      >
        <h2 class="mb-5 text-sm font-semibold text-[var(--site-muted)]">{{ month }}</h2>
        <div class="space-y-5">
          <NuxtLink
            v-for="article in items"
            :key="article.path"
            :to="article.path"
            class="grid gap-2 sm:grid-cols-[120px_1fr] sm:items-baseline"
          >
            <time :datetime="article.date" class="text-sm text-[var(--site-muted)]">
              {{ formatDate(article.date) }}
            </time>
            <span class="text-lg font-medium tracking-normal hover:text-[var(--site-accent)]">
              {{ article.title }}
            </span>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>
