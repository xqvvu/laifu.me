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
    .select("path", "title", "description", "date", "tags")
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

const tocLinks = computed(() => article.value?.body?.toc?.links ?? []);
const hasToc = computed(() => tocLinks.value.length > 0);
const site = useSiteConfig();
const articleUrl = computed(() => new URL(path.value, site.url).toString());

useSeoMeta({
  title: () => article.value?.title || "文章",
  description: () => article.value?.description || "",
  ogTitle: () => article.value?.title || "文章",
  ogDescription: () => article.value?.description || "",
  ogType: "article",
  ogUrl: () => articleUrl.value,
  ogSiteName: site.name,
  ogLocale: site.defaultLocale,
  articlePublishedTime: () => article.value?.date || "",
  articleModifiedTime: () => article.value?.updated || article.value?.date || "",
  articleTag: () => article.value?.tags || [],
  twitterCard: "summary",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: () => articleUrl.value,
    },
  ],
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
          <ArticleMeta
            class="mb-4"
            :date="article.date"
            :reading="article.reading"
            :updated="article.updated"
          />
          <h1 class="text-4xl font-semibold tracking-normal text-(--site-fg) sm:text-5xl">
            {{ article.title }}
          </h1>
          <p class="mt-5 text-lg/8 text-(--site-muted)">
            {{ article.description }}
          </p>
          <ArticleTags class="mt-6" :tags="article.tags" />
        </header>

        <div v-if="hasToc" class="mb-8 lg:hidden">
          <UContentToc
            color="neutral"
            highlight
            highlight-color="neutral"
            :links="tocLinks"
            title="目录"
          />
        </div>

        <ContentRenderer class="article-prose" :value="article" />

        <footer class="mt-14 border-t border-(--site-line) pt-8">
          <div class="flex justify-end">
            <NuxtLink
              class="inline-flex items-center gap-2 text-sm font-medium text-(--site-muted) transition-colors hover:text-(--site-accent)"
              to="/blog"
            >
              全部文章
              <UIcon class="size-4" name="i-lucide-arrow-right" />
            </NuxtLink>
          </div>

          <ArticleNav class="mt-8" :next="surround?.[1]" :previous="surround?.[0]" />
          <RelatedArticles class="mt-10" :articles="relatedArticles || []" />
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
