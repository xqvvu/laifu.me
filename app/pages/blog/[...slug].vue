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
    <div class="grid gap-10 lg:grid-cols-[minmax(0,720px)_260px] lg:items-start">
      <div>
        <NuxtLink
          class="mb-8 inline-flex items-center gap-2 text-sm text-[var(--site-muted)] hover:text-[var(--site-accent)]"
          to="/blog"
        >
          <UIcon class="size-4" name="i-lucide-arrow-left" />
          返回文章
        </NuxtLink>

        <header class="mb-10 border-b border-[var(--site-line)] pb-8">
          <div class="mb-4 flex flex-wrap items-center gap-3 text-sm text-[var(--site-muted)]">
            <time :datetime="article.date">{{ formatDate(article.date, "long") }}</time>
            <span v-if="stats">{{ stats.wordCountText }}</span>
            <span v-if="stats">{{ stats.text }}</span>
            <span v-if="article.updated">更新于 {{ formatDate(article.updated, "long") }}</span>
          </div>
          <h1 class="text-4xl font-semibold tracking-normal text-[var(--site-fg)] sm:text-5xl">
            {{ article.title }}
          </h1>
          <p class="mt-5 text-lg leading-8 text-[var(--site-muted)]">
            {{ article.description }}
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <NuxtLink
              v-for="tag in article.tags"
              :key="tag"
              class="rounded-md border border-[var(--site-line)] px-3 py-1 text-sm text-[var(--site-muted)] hover:border-[var(--site-accent)] hover:text-[var(--site-accent)]"
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

        <footer class="mt-14 border-t border-[var(--site-line)] pt-8">
          <div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p class="text-sm text-[var(--site-muted)]">
                发布于 {{ formatDate(article.date, "long") }}
                <span v-if="article.updated">
                  · 更新于 {{ formatDate(article.updated, "long") }}
                </span>
                <span v-if="stats"> · {{ stats.wordCountText }} · {{ stats.text }}</span>
              </p>

              <div v-if="article.tags?.length" class="mt-4 flex flex-wrap gap-2">
                <NuxtLink
                  v-for="tag in article.tags"
                  :key="tag"
                  class="rounded-md border border-[var(--site-line)] px-3 py-1 text-sm text-[var(--site-muted)] hover:border-[var(--site-accent)] hover:text-[var(--site-accent)]"
                  :to="`/tags/${encodeURIComponent(tag)}`"
                >
                  {{ tag }}
                </NuxtLink>
              </div>
            </div>

            <NuxtLink
              class="inline-flex items-center gap-2 text-sm font-medium text-[var(--site-muted)] hover:text-[var(--site-accent)]"
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
              class="group rounded-md border border-[var(--site-line)] p-4 transition-colors hover:border-[var(--site-accent)]"
              :class="{ 'sm:col-span-2': !surround?.[1] }"
              :to="surround[0].path"
            >
              <span
                class="mb-3 inline-flex items-center gap-2 text-sm text-[var(--site-muted)] group-hover:text-[var(--site-accent)]"
              >
                <UIcon class="size-4" name="i-lucide-arrow-left" />
                上一篇
              </span>
              <p class="font-medium text-[var(--site-fg)]">{{ surround[0].title }}</p>
              <p class="mt-2 line-clamp-2 text-sm leading-6 text-[var(--site-muted)]">
                {{ surround[0].description }}
              </p>
            </NuxtLink>

            <NuxtLink
              v-if="surround?.[1]"
              class="group rounded-md border border-[var(--site-line)] p-4 text-right transition-colors hover:border-[var(--site-accent)]"
              :class="{ 'sm:col-span-2': !surround?.[0] }"
              :to="surround[1].path"
            >
              <span
                class="mb-3 inline-flex items-center justify-end gap-2 text-sm text-[var(--site-muted)] group-hover:text-[var(--site-accent)]"
              >
                下一篇
                <UIcon class="size-4" name="i-lucide-arrow-right" />
              </span>
              <p class="font-medium text-[var(--site-fg)]">{{ surround[1].title }}</p>
              <p class="mt-2 line-clamp-2 text-sm leading-6 text-[var(--site-muted)]">
                {{ surround[1].description }}
              </p>
            </NuxtLink>
          </nav>
        </footer>
      </div>

      <aside class="hidden lg:sticky lg:top-24 lg:block">
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
