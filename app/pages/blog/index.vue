<script setup lang="ts">
const route = useRoute();

const pageSize = 5;
const currentPage = computed(() => {
  const page = Number(route.query.page || 1);
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
});

const { data: totalArticles } = await useAsyncData("blog-posts-count", () =>
  queryCollection("blog").where("draft", "<>", true).count("*"),
);

const { data: articles } = await useAsyncData(
  "blog-posts-page",
  () =>
    queryCollection("blog")
      .where("draft", "<>", true)
      .order("date", "DESC")
      .skip((currentPage.value - 1) * pageSize)
      .limit(pageSize)
      .all(),
  {
    watch: [currentPage],
  },
);

const { data: articleIndex } = await useAsyncData("blog-posts-index", () =>
  queryCollection("blog")
    .where("draft", "<>", true)
    .select("path", "title", "description", "date", "tags")
    .order("date", "DESC")
    .all(),
);

const tags = computed(() => {
  const counts = new Map<string, number>();
  for (const article of articleIndex.value || []) {
    for (const tag of article.tags || []) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
});

const search = ref("");

const searchResults = computed(() => {
  const keyword = search.value.trim().toLowerCase();

  if (!keyword) {
    return [];
  }

  return (articleIndex.value || []).filter((article) => {
    const haystack = [article.title, article.description, article.tags?.join(" ")]
      .join(" ")
      .toLowerCase();

    return haystack.includes(keyword);
  });
});

const isSearching = computed(() => search.value.trim().length > 0);
const visibleArticles = computed(() =>
  isSearching.value ? searchResults.value : articles.value || [],
);
const total = computed(() => totalArticles.value || 0);

function pageTo(page: number) {
  return page === 1 ? "/blog" : { path: "/blog", query: { page } };
}

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
            placeholder="搜索标题、标签或摘要"
            size="lg"
          />
          <p class="text-sm whitespace-nowrap text-(--site-muted)">
            <template v-if="isSearching">{{ searchResults.length }} / {{ total }} 篇</template>
            <template v-else>第 {{ currentPage }} 页 · 共 {{ total }} 篇</template>
          </p>
        </div>

        <ArticleCard v-for="article in visibleArticles" :key="article.path" :article="article" />
        <UEmpty
          v-if="!visibleArticles.length"
          class="border-y border-(--site-line) py-12"
          description="换一个关键词试试。"
          icon="i-lucide-search-x"
          title="没有找到文章"
        />

        <UPagination
          v-if="!isSearching && total > pageSize"
          :items-per-page="pageSize"
          :page="currentPage"
          :show-edges="true"
          :to="pageTo"
          :total="total"
          class="mt-8"
          color="neutral"
          size="sm"
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
