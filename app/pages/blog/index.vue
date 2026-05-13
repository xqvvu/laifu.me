<script setup lang="ts">
const { data: articles } = await useAsyncData("blog-posts", () =>
  queryCollection("blog").where("draft", "<>", true).order("date", "DESC").all(),
);

const tags = computed(() => {
  const counts = new Map<string, number>();
  for (const article of articles.value || []) {
    for (const tag of article.tags || []) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
});

const search = ref("");

const filteredArticles = computed(() => {
  const keyword = search.value.trim().toLowerCase();

  if (!keyword) {
    return articles.value || [];
  }

  return (articles.value || []).filter((article) => {
    const haystack = [
      article.title,
      article.description,
      article.tags?.join(" "),
      extractTextFromBody(article.body),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(keyword);
  });
});

useSeoMeta({
  title: "文章",
  description: "laifu.me 的全部文章。",
});
</script>

<template>
  <section class="site-container py-12 sm:py-16">
    <div class="grid gap-10 lg:grid-cols-[1fr_260px]">
      <div>
        <div class="mb-10">
          <p class="text-sm tracking-[0.16em] text-[var(--site-accent)] uppercase">Blog</p>
          <h1 class="mt-3 text-4xl font-semibold tracking-normal">文章</h1>
          <p class="mt-4 max-w-2xl text-[var(--site-muted)]">
            按时间整理的长期笔记，覆盖工程、产品、工具和个人系统。
          </p>
        </div>

        <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <UInput
            v-model="search"
            icon="i-lucide-search"
            placeholder="搜索标题、标签或正文"
            size="lg"
            class="w-full sm:max-w-md"
          />
          <p class="text-sm text-[var(--site-muted)]">
            {{ filteredArticles.length }} / {{ articles?.length || 0 }} 篇
          </p>
        </div>

        <ArticleCard v-for="article in filteredArticles" :key="article.path" :article="article" />
        <UEmpty
          v-if="!filteredArticles.length"
          icon="i-lucide-search-x"
          title="没有找到文章"
          description="换一个关键词试试。"
          class="border-y border-[var(--site-line)] py-12"
        />
      </div>

      <aside class="lg:sticky lg:top-24 lg:self-start">
        <h2 class="mb-4 text-sm font-semibold">标签</h2>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            v-for="[tag, count] in tags"
            :key="tag"
            :to="`/tags/${encodeURIComponent(tag)}`"
            class="rounded-md border border-[var(--site-line)] px-3 py-1.5 text-sm text-[var(--site-muted)] hover:border-[var(--site-accent)] hover:text-[var(--site-accent)]"
          >
            {{ tag }} {{ count }}
          </NuxtLink>
        </div>
        <UButton
          to="/archive"
          label="按时间归档"
          icon="i-lucide-archive"
          variant="outline"
          color="neutral"
          size="sm"
          class="mt-6"
        />
      </aside>
    </div>
  </section>
</template>
