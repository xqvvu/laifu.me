<script setup lang="ts">
const route = useRoute();

const pageSize = 8;
const currentPage = computed(() => {
  const page = Number(route.query.page || 1);
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
});

const { data: totalArticles } = await useAsyncData("blog-count", () => queryPublicArticleCount());
const { data: articles } = await useAsyncData(`blog-page-${currentPage.value}`, () =>
  queryPagedArticles(currentPage.value, pageSize),
);
const { data: articleIndex } = await useAsyncData("blog-index", () => queryArticleIndex());

const tags = computed(() => countArticleTags(articleIndex.value || []));

const search = ref("");
const isSearching = computed(() => search.value.trim().length > 0);
const searchResults = computed(() => searchArticleListings(articleIndex.value || [], search.value));
const visibleArticles = computed(() =>
  isSearching.value ? searchResults.value : articles.value || [],
);

const total = computed(() => totalArticles.value || 0);
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)));

useSeoMeta({
  title: "文章",
  description: "laifu.me 的全部文章，按时间排列。",
});
</script>

<template>
  <div class="shell pt-14 sm:pt-20">
    <header class="max-w-[36rem]">
      <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">文章</h1>
      <p class="mt-4 text-base/7 text-(--ink-soft)">
        按时间排列的长期笔记，覆盖工程、产品、工具和个人系统。共 {{ total }} 篇。
      </p>
    </header>

    <div class="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-16">
      <div class="min-w-0">
        <label class="search">
          <AppIcon class="search__icon" name="search" size="1rem" />
          <input
            v-model="search"
            class="search__input"
            type="search"
            placeholder="搜索标题、标签或摘要"
            aria-label="搜索文章"
          />
        </label>

        <p v-if="isSearching" class="mt-4 text-sm text-(--ink-faint)">
          {{ searchResults.length }} 条结果
        </p>

        <div class="mt-2">
          <ArticleCard v-for="article in visibleArticles" :key="article.path" :article="article" />
        </div>

        <p v-if="!visibleArticles.length" class="empty">
          {{ isSearching ? "没有匹配的文章，换个关键词试试。" : "还没有公开的文章。" }}
        </p>

        <nav v-if="!isSearching && totalPages > 1" class="mt-10 flex items-center gap-4 text-sm">
          <NuxtLink
            v-if="currentPage > 1"
            class="muted-link hover:text-(--ink)"
            :to="currentPage === 2 ? '/blog' : { path: '/blog', query: { page: currentPage - 1 } }"
          >
            ← 上一页
          </NuxtLink>
          <span class="text-(--ink-faint)">{{ currentPage }} / {{ totalPages }}</span>
          <NuxtLink
            v-if="currentPage < totalPages"
            class="muted-link ml-auto hover:text-(--ink)"
            :to="{ path: '/blog', query: { page: currentPage + 1 } }"
          >
            下一页 →
          </NuxtLink>
        </nav>
      </div>

      <!-- Tags: a quiet sidebar, no boxes. -->
      <aside class="lg:pt-1">
        <h2 class="text-sm font-semibold text-(--ink-faint)">标签</h2>
        <ul class="mt-3 flex flex-wrap gap-x-3 gap-y-2 lg:flex-col lg:gap-2">
          <li v-for="[tag, count] in tags" :key="tag">
            <NuxtLink class="tag-link" :to="`/tags/${encodeURIComponent(tag)}`">
              <span>{{ tag }}</span>
              <span class="text-(--ink-faint)">{{ count }}</span>
            </NuxtLink>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--rule);
  padding-block: 0.5rem;
}

.search:focus-within {
  border-bottom-color: var(--ink-faint);
}

.search__icon {
  color: var(--ink-faint);
  font-size: 0.95rem;
}

.search__input {
  width: 100%;
  border: 0;
  background: none;
  padding: 0;
  color: var(--ink);
  font: inherit;
  font-size: 0.9375rem;
}

.search__input::placeholder {
  color: var(--ink-faint);
}

.search__input:focus {
  outline: none;
}

.search__input::-webkit-search-cancel-button {
  appearance: none;
}

.empty {
  border-top: 1px solid var(--rule);
  padding-block: 2.5rem;
  color: var(--ink-faint);
  font-size: 0.9375rem;
}

.tag-link {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  border-radius: 4px;
  color: var(--ink-soft);
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 120ms ease;
}

.tag-link:hover {
  color: var(--ink);
}
</style>
