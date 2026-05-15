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
    <div class="grid gap-12 lg:grid-cols-[1fr_260px]">
      <div>
        <div class="mb-10">
          <p class="text-sm tracking-[0.16em] text-(--site-accent) uppercase">Blog</p>
          <h1 class="mt-3 text-4xl font-semibold tracking-normal">文章</h1>
          <p class="mt-4 max-w-2xl text-(--site-muted)">
            按时间整理的长期笔记，覆盖工程、产品、工具和个人系统。
          </p>
        </div>

        <div
          class="mb-8 flex flex-col gap-3 border-y border-(--site-line) py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <UInput
            v-model="search"
            class="w-full sm:max-w-md"
            icon="i-lucide-search"
            placeholder="搜索标题、标签或正文"
            size="lg"
          />
          <p class="text-sm whitespace-nowrap text-(--site-muted)">
            {{ filteredArticles.length }} / {{ articles?.length || 0 }} 篇
          </p>
        </div>

        <ArticleCard v-for="article in filteredArticles" :key="article.path" :article="article" />
        <UEmpty
          v-if="!filteredArticles.length"
          class="border-y border-(--site-line) py-12"
          description="换一个关键词试试。"
          icon="i-lucide-search-x"
          title="没有找到文章"
        />
      </div>

      <aside class="lg:sticky lg:top-24 lg:self-start">
        <div class="border-l border-(--site-line) pl-5">
          <h2 class="mb-4 text-sm font-semibold">标签</h2>
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="[tag, count] in tags"
              :key="tag"
              class="inline-flex items-center gap-1.5 rounded-md border border-(--site-line) px-3 py-1.5 text-sm text-(--site-muted) transition-colors hover:border-(--site-accent) hover:text-(--site-accent)"
              :to="`/tags/${encodeURIComponent(tag)}`"
            >
              <span>{{ tag }}</span>
              <span class="text-xs text-(--site-muted)">{{ count }}</span>
            </NuxtLink>
          </div>
          <UButton
            class="mt-6"
            color="neutral"
            icon="i-lucide-archive"
            label="按时间归档"
            size="sm"
            to="/archive"
            variant="outline"
          />
        </div>
      </aside>
    </div>
  </section>
</template>
