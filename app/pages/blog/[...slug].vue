<script setup lang="ts">
const route = useRoute();
const path = computed(() => `/blog/${(route.params.slug as string[]).join("/")}`);

const { data: article } = await useAsyncData(`blog-${path.value}`, () =>
  queryCollection("blog").path(path.value).first(),
);

if (!article.value || article.value.draft) {
  throw createError({ statusCode: 404, statusMessage: "Article not found", fatal: true });
}

const { data: surround } = await useAsyncData(`surround-${path.value}`, () =>
  queryCollectionItemSurroundings("blog", path.value, {
    fields: ["title", "description"],
  }),
);

const { data: relatedArticles } = await useAsyncData(`related-${path.value}`, async () => {
  const currentTags = article.value?.tags || [];

  if (!currentTags.length) {
    return [];
  }

  const posts = await queryCollection("blog")
    .where("draft", "<>", true)
    .order("date", "DESC")
    .all();

  return posts
    .filter((post) => post.path !== path.value)
    .map((post) => ({
      ...post,
      relevance: (post.tags || []).filter((tag) => currentTags.includes(tag)).length,
    }))
    .filter((post) => post.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance || +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);
});

const stats = computed(() => (article.value ? readingStats(article.value.body) : null));
const tocLinks = computed(() => article.value?.body?.toc?.links ?? []);
const hasToc = computed(() => tocLinks.value.length > 0);

useSeoMeta({
  title: () => article.value?.title || "文章",
  description: () => article.value?.description || "",
  ogTitle: () => article.value?.title || "文章",
  ogDescription: () => article.value?.description || "",
});

useSchemaOrg([
  defineArticle({
    headline: () => article.value?.title || "",
    description: () => article.value?.description || "",
    datePublished: () => article.value?.date || "",
    dateModified: () => article.value?.updated || article.value?.date || "",
  }),
]);
</script>

<template>
  <article v-if="article" class="site-container py-12 sm:py-16">
    <div class="grid gap-12 lg:grid-cols-[minmax(0,720px)_minmax(0,260px)] lg:items-start">
      <div class="min-w-0">
        <NuxtLink
          class="mb-8 inline-flex items-center gap-2 text-sm text-(--site-muted) transition-colors hover:text-(--site-accent)"
          to="/blog"
        >
          <UIcon class="size-4" name="i-lucide-arrow-left" />
          返回文章
        </NuxtLink>

        <header class="mb-10 border-b border-(--site-line) pb-8">
          <div class="mb-4 flex flex-wrap items-center gap-2 text-sm text-(--site-muted)">
            <time :datetime="article.date">{{ formatDate(article.date, "long") }}</time>
            <span v-if="stats" class="text-(--site-line)" aria-hidden="true">/</span>
            <span v-if="stats">{{ stats.wordCountText }}</span>
            <span v-if="stats" class="text-(--site-line)" aria-hidden="true">/</span>
            <span v-if="stats">{{ stats.text }}</span>
            <span v-if="article.updated" class="text-(--site-line)" aria-hidden="true">/</span>
            <span v-if="article.updated">更新于 {{ formatDate(article.updated, "long") }}</span>
          </div>
          <h1 class="text-4xl font-semibold tracking-normal text-(--site-fg) sm:text-5xl">
            {{ article.title }}
          </h1>
          <p class="mt-5 text-lg/8 text-(--site-muted)">
            {{ article.description }}
          </p>
          <div class="mt-6 flex flex-wrap gap-1.5">
            <NuxtLink
              v-for="tag in article.tags"
              :key="tag"
              class="rounded-md border border-(--site-line) px-3 py-1 text-sm text-(--site-muted) transition-colors hover:border-(--site-accent) hover:text-(--site-accent)"
              :to="`/tags/${encodeURIComponent(tag)}`"
            >
              {{ tag }}
            </NuxtLink>
          </div>
        </header>

        <div v-if="hasToc" class="mb-8 lg:hidden">
          <UContentToc
            color="neutral"
            default-open
            highlight
            highlight-color="neutral"
            :links="tocLinks"
            title="目录"
          />
        </div>

        <ContentRenderer class="article-prose" :value="article" />

        <footer class="mt-14 border-t border-(--site-line) pt-8">
          <div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p class="text-sm text-(--site-muted)">
                发布于 {{ formatDate(article.date, "long") }}
                <span v-if="article.updated">
                  · 更新于 {{ formatDate(article.updated, "long") }}
                </span>
                <span v-if="stats"> · {{ stats.wordCountText }} · {{ stats.text }}</span>
              </p>

              <div v-if="article.tags?.length" class="mt-4 flex flex-wrap gap-1.5">
                <NuxtLink
                  v-for="tag in article.tags"
                  :key="tag"
                  class="rounded-md border border-(--site-line) px-3 py-1 text-sm text-(--site-muted) transition-colors hover:border-(--site-accent) hover:text-(--site-accent)"
                  :to="`/tags/${encodeURIComponent(tag)}`"
                >
                  {{ tag }}
                </NuxtLink>
              </div>
            </div>

            <NuxtLink
              class="inline-flex items-center gap-2 text-sm font-medium text-(--site-muted) transition-colors hover:text-(--site-accent)"
              to="/blog"
            >
              全部文章
              <UIcon class="size-4" name="i-lucide-arrow-right" />
            </NuxtLink>
          </div>

          <nav
            v-if="surround?.some(Boolean)"
            aria-label="相邻文章"
            class="mt-8 grid gap-4 sm:grid-cols-2"
          >
            <NuxtLink
              v-if="surround?.[0]"
              class="group rounded-md border border-(--site-line) bg-(--site-panel)/45 p-4 transition-colors hover:border-(--site-accent)"
              :class="{ 'sm:col-span-2': !surround?.[1] }"
              :to="surround[0].path"
            >
              <span
                class="mb-3 inline-flex items-center gap-2 text-sm text-(--site-muted) group-hover:text-(--site-accent)"
              >
                <UIcon class="size-4" name="i-lucide-arrow-left" />
                上一篇
              </span>
              <p class="font-medium text-(--site-fg)">{{ surround[0].title }}</p>
              <p class="mt-2 line-clamp-2 text-sm/6 text-(--site-muted)">
                {{ surround[0].description }}
              </p>
            </NuxtLink>

            <NuxtLink
              v-if="surround?.[1]"
              class="group rounded-md border border-(--site-line) bg-(--site-panel)/45 p-4 text-right transition-colors hover:border-(--site-accent)"
              :class="{ 'sm:col-span-2': !surround?.[0] }"
              :to="surround[1].path"
            >
              <span
                class="mb-3 inline-flex items-center justify-end gap-2 text-sm text-(--site-muted) group-hover:text-(--site-accent)"
              >
                下一篇
                <UIcon class="size-4" name="i-lucide-arrow-right" />
              </span>
              <p class="font-medium text-(--site-fg)">{{ surround[1].title }}</p>
              <p class="mt-2 line-clamp-2 text-sm/6 text-(--site-muted)">
                {{ surround[1].description }}
              </p>
            </NuxtLink>
          </nav>

          <section v-if="relatedArticles?.length" class="mt-10">
            <div class="flex items-center justify-between border-b border-(--site-line) pb-3">
              <h2 class="text-sm font-semibold text-(--site-muted)">相关文章</h2>
              <UIcon class="size-4 text-(--site-muted)" name="i-lucide-link" />
            </div>
            <div class="mt-4 grid gap-3">
              <NuxtLink
                v-for="related in relatedArticles"
                :key="related.path"
                class="group rounded-md border border-(--site-line) p-4 transition-colors hover:border-(--site-accent) hover:bg-(--site-panel)"
                :to="related.path"
              >
                <div class="mb-3 flex flex-wrap items-center gap-2 text-xs text-(--site-muted)">
                  <time :datetime="related.date">{{ formatDate(related.date) }}</time>
                  <span v-if="related.tags?.length" class="text-(--site-line)" aria-hidden="true">
                    /
                  </span>
                  <span v-for="tag in related.tags" :key="tag">{{ tag }}</span>
                </div>
                <p class="font-medium text-(--site-fg) group-hover:text-(--site-accent)">
                  {{ related.title }}
                </p>
                <p class="mt-2 line-clamp-2 text-sm/6 text-(--site-muted)">
                  {{ related.description }}
                </p>
              </NuxtLink>
            </div>
          </section>
        </footer>
      </div>

      <aside class="hidden min-w-0 overflow-hidden lg:sticky lg:top-24 lg:block">
        <UContentToc
          v-if="hasToc"
          color="neutral"
          highlight
          highlight-color="neutral"
          :links="tocLinks"
          title="目录"
        />
      </aside>
    </div>
  </article>
</template>
