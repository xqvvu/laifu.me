<script setup lang="ts">
const route = useRoute();
const path = computed(() => `/blog/${(route.params.slug as string[]).join("/")}`);

const { data: article } = await useAsyncData(`article-${path.value}`, () =>
  queryArticleByPath(path.value),
);

if (!article.value || article.value.draft) {
  throw createError({ statusCode: 404, statusMessage: "Article not found", fatal: true });
}

const { data: surround } = await useAsyncData(`surround-${path.value}`, () =>
  queryArticleSurroundings(path.value),
);

const { data: relatedArticles } = await useAsyncData(`related-${path.value}`, () =>
  queryRelatedArticles({ path: path.value, tags: article.value?.tags }),
);

const tocLinks = computed(() => article.value?.body?.toc?.links ?? []);
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
  link: [{ rel: "canonical", href: () => articleUrl.value }],
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
  <article v-if="article" class="shell-wide pt-12 sm:pt-16">
    <div
      class="grid gap-10 lg:grid-cols-[minmax(0,var(--measure))_11rem] lg:justify-center lg:gap-14"
    >
      <div class="mx-auto w-full max-w-[44rem] min-w-0">
        <header class="mb-10">
          <h1 class="text-3xl font-semibold tracking-tight sm:text-[2.125rem] sm:leading-snug">
            {{ article.title }}
          </h1>
          <p class="mt-4 text-lg/8 text-(--ink-soft)">{{ article.description }}</p>

          <div class="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-(--ink-faint)">
            <time :datetime="article.date">{{ formatDate(article.date, "long") }}</time>
            <template v-if="article.reading">
              <span aria-hidden="true">·</span>
              <span>{{ article.reading.text }}</span>
            </template>
            <template v-if="article.updated">
              <span aria-hidden="true">·</span>
              <span>更新于 {{ formatDate(article.updated, "long") }}</span>
            </template>
          </div>

          <div v-if="article.tags?.length" class="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <NuxtLink
              v-for="tag in article.tags"
              :key="tag"
              class="muted-link hover:text-(--ink)"
              :to="`/tags/${encodeURIComponent(tag)}`"
            >
              #{{ tag }}
            </NuxtLink>
          </div>
        </header>

        <!-- On narrow screens the outline sits above the body. -->
        <details v-if="tocLinks.length" class="toc-inline">
          <summary>目录</summary>
          <ul>
            <li v-for="link in tocLinks" :key="link.id">
              <a :href="`#${link.id}`">{{ link.text }}</a>
            </li>
          </ul>
        </details>

        <ArticleProse :value="article" />

        <footer class="mt-16 border-t border-(--rule) pt-8">
          <ArticleNav :next="surround?.[1]" :previous="surround?.[0]" />
          <RelatedArticles class="mt-10" :articles="relatedArticles || []" />

          <NuxtLink class="muted-link mt-10 inline-block text-sm hover:text-(--ink)" to="/blog">
            ← 全部文章
          </NuxtLink>
        </footer>
      </div>

      <!-- Outline: sticky, plain links, no highlight box. -->
      <aside class="hidden lg:block">
        <nav v-if="tocLinks.length" class="toc" aria-label="目录">
          <p class="text-sm font-semibold text-(--ink-faint)">目录</p>
          <ul class="mt-3">
            <li v-for="link in tocLinks" :key="link.id">
              <a class="toc__link" :href="`#${link.id}`">{{ link.text }}</a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  </article>
</template>

<style scoped>
.toc {
  position: sticky;
  top: 5rem;
  max-height: calc(100vh - 7rem);
  overflow-y: auto;
}

.toc ul {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  border-left: 1px solid var(--rule);
  padding-left: 0.9rem;
  margin: 0;
  list-style: none;
}

.toc__link {
  color: var(--ink-faint);
  font-size: 0.8125rem;
  line-height: 1.5;
  text-decoration: none;
  transition: color 120ms ease;
}

.toc__link:hover {
  color: var(--ink);
}

.toc-inline {
  border: 1px solid var(--rule);
  border-radius: 8px;
  margin-bottom: 2rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
}

.toc-inline summary {
  color: var(--ink-soft);
  cursor: pointer;
  font-weight: 500;
}

.toc-inline ul {
  margin: 0.75rem 0 0;
  padding-left: 1.1rem;
  list-style: disc;
}

.toc-inline li {
  margin-block: 0.35rem;
}

.toc-inline a {
  color: var(--ink-soft);
  text-decoration: none;
}

.toc-inline a:hover {
  color: var(--ink);
}

@media (min-width: 1024px) {
  .toc-inline {
    display: none;
  }
}
</style>
