<script setup lang="ts">
import { siteCopy } from "~/utils/site-copy";

const { data: featured } = await useAsyncData("home-featured-posts", () => queryFeaturedArticles());

const { data: recent } = await useAsyncData("home-recent-posts", () => queryRecentArticles());

useSeoMeta({
  title: siteCopy.homeTitle,
  description: siteCopy.description,
  ogTitle: siteCopy.title,
  ogDescription: siteCopy.description,
});
</script>

<template>
  <div>
    <section :class="$style.homeHeroShell" class="overflow-hidden border-b border-(--site-line)">
      <div
        class="site-container grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(340px,1.08fr)] lg:items-center"
      >
        <div class="relative z-10">
          <div class="mb-6 flex flex-wrap items-center gap-2 text-sm text-(--site-muted)">
            <span
              class="inline-flex h-8 items-center border border-(--site-line) px-3 text-(--site-fg)"
            >
              {{ siteCopy.heroKicker }}
            </span>
            <span
              v-for="topic in siteCopy.topics"
              :key="topic"
              class="inline-flex h-8 items-center border border-(--site-line) px-3"
            >
              {{ topic }}
            </span>
          </div>

          <h1 class="max-w-3xl text-5xl/14 font-semibold text-(--site-fg) sm:text-7xl/20">
            {{ siteCopy.displayTitle }}
          </h1>

          <p class="mt-5 max-w-2xl text-xl/8 font-medium text-(--site-fg)">
            {{ siteCopy.tagline }}
          </p>

          <p class="mt-6 max-w-2xl text-lg/8 text-(--site-muted)">
            {{ siteCopy.description }}
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <UButton color="neutral" icon="i-lucide-book-open" label="阅读文章" to="/blog" />
            <UButton
              color="neutral"
              icon="i-lucide-user"
              label="了解作者"
              to="/about"
              variant="outline"
            />
          </div>

          <dl class="mt-10 grid max-w-xl grid-cols-3 border-y border-(--site-line) text-sm">
            <div
              v-for="(principle, index) in siteCopy.principles"
              :key="principle.label"
              :class="[
                index === 0 ? 'py-4 pr-4' : '',
                index === 1 ? 'border-x border-(--site-line) p-4' : '',
                index === 2 ? 'py-4 pl-4' : '',
              ]"
            >
              <dt class="text-(--site-muted)">{{ principle.label }}</dt>
              <dd class="mt-1 font-medium text-(--site-fg)">{{ principle.value }}</dd>
            </div>
          </dl>
        </div>

        <HomeHeroVisual />
      </div>
    </section>

    <section class="border-y border-(--site-line) bg-(--site-panel)/60 py-12">
      <div class="site-container">
        <div class="mb-8 flex items-end justify-between gap-4">
          <div>
            <p class="text-sm text-(--site-muted)">Featured</p>
            <h2 class="mt-1 text-2xl font-semibold tracking-normal">精选文章</h2>
          </div>
          <UButton
            color="neutral"
            label="全部文章"
            to="/blog"
            trailing-icon="i-lucide-arrow-right"
            variant="ghost"
          />
        </div>

        <div class="grid gap-5 md:grid-cols-3">
          <NuxtLink
            v-for="article in featured"
            :key="article.path"
            class="group rounded-md border border-(--site-line) bg-(--site-bg) p-5 transition-colors hover:border-(--site-accent)"
            :to="article.path"
          >
            <p class="text-sm text-(--site-muted)">{{ formatDate(article.date) }}</p>
            <h3
              class="mt-3 text-lg font-semibold tracking-normal transition-colors group-hover:text-(--site-accent)"
            >
              {{ article.title }}
            </h3>
            <p class="mt-3 text-sm/6 text-(--site-muted)">{{ article.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="site-container py-12">
      <div class="mb-8">
        <p class="text-sm text-(--site-muted)">Recent</p>
        <h2 class="mt-1 text-2xl font-semibold tracking-normal">最近更新</h2>
      </div>
      <ArticleCard v-for="article in recent" :key="article.path" :article="article" />
    </section>
  </div>
</template>

<style module>
@layer components {
  .homeHeroShell {
    position: relative;
    background:
      linear-gradient(
        90deg,
        color-mix(in srgb, var(--site-line), transparent 72%) 1px,
        transparent 1px
      ),
      linear-gradient(
        180deg,
        color-mix(in srgb, #f97316, transparent 92%) 0%,
        color-mix(in srgb, var(--site-bg), var(--site-panel) 18%) 48%,
        var(--site-bg) 100%
      );
    background-size:
      5rem 5rem,
      auto;
  }

  .homeHeroShell::before {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent 0 9px,
      color-mix(in srgb, var(--site-line), transparent 72%) 9px 10px
    );
    content: "";
    mask-image: linear-gradient(180deg, rgb(0 0 0 / 0.58), transparent 68%);
    pointer-events: none;
  }

  :global(.dark) .homeHeroShell {
    background:
      linear-gradient(
        90deg,
        color-mix(in srgb, var(--site-line), transparent 48%) 1px,
        transparent 1px
      ),
      linear-gradient(
        180deg,
        color-mix(in srgb, #f97316, transparent 94%) 0%,
        color-mix(in srgb, var(--site-bg), var(--site-panel) 24%) 46%,
        var(--site-bg) 100%
      );
    background-size:
      5rem 5rem,
      auto;
  }
}
</style>
