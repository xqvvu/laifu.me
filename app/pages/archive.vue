<script setup lang="ts">
const { data: articles } = await useAsyncData("archive-posts", () => queryArchiveArticles());
const groups = computed(() => groupArticlesByYear(articles.value || []));

useSeoMeta({
  title: "归档",
  description: "laifu.me 的全部文章，按年份归档。",
});
</script>

<template>
  <div class="shell pt-14 sm:pt-20">
    <header class="max-w-[36rem]">
      <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">归档</h1>
      <p class="mt-4 text-base/7 text-(--ink-soft)">按发布时间浏览所有文章。</p>
    </header>

    <!--
      The year is set very large and very faint behind its list, the way a
      printed index runs a folio. It is decorative structure, so it stays out
      of the accessibility tree and never intercepts a click.
    -->
    <div class="mt-14 max-w-[38rem]">
      <section
        v-for="[year, items] in groups"
        :key="year"
        class="archive-group relative border-t border-(--rule) py-10 first:border-t-0 first:pt-0"
      >
        <span class="archive-year" aria-hidden="true">{{ year }}</span>

        <ul class="relative space-y-2.5">
          <li v-for="article in items" :key="article.path">
            <NuxtLink class="archive-item" :to="article.path">
              <time class="archive-item__date" :datetime="article.date">
                {{ formatDate(article.date) }}
              </time>
              <span class="archive-item__title">{{ article.title }}</span>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.archive-group {
  isolation: isolate;
}

/*
 * Absolutely positioned so it never widens the list; the type size is
 * allowed to overflow the container rather than force a scrollbar.
 */
.archive-year {
  position: absolute;
  top: 1.5rem;
  right: 0;
  z-index: -1;
  color: color-mix(in srgb, var(--ink), transparent 93%);
  font-size: clamp(4.5rem, 9vw, 7rem);
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 1;
  user-select: none;
  pointer-events: none;
}

.archive-item {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.1rem 1.25rem;
  color: var(--ink);
  text-decoration: none;
}

.archive-item__date {
  color: var(--ink-faint);
  font-size: 0.8125rem;
  font-variant-numeric: tabular-nums;
  transition: color 120ms ease;
}

.archive-item__title {
  font-size: 1rem;
  line-height: 1.55;
}

.archive-item:hover .archive-item__title {
  text-decoration: underline;
  text-decoration-color: var(--link-underline);
  text-underline-offset: 0.2em;
}

/* Date and title sit on one baseline once there is room for both. */
@media (min-width: 30rem) {
  .archive-item {
    grid-template-columns: 7rem 1fr;
    align-items: baseline;
  }
}
</style>
