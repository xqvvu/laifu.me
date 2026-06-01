<script setup lang="ts">
const { data: featured } = await useAsyncData("home-featured-posts", () => queryFeaturedArticles());

const { data: recent } = await useAsyncData("home-recent-posts", () => queryRecentArticles());

useSeoMeta({
  title: "laifu.me",
  description: "写给长期主义者的技术、产品与生活札记。",
  ogTitle: "laifu.me",
  ogDescription: "写给长期主义者的技术、产品与生活札记。",
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
              Personal notes
            </span>
            <span class="inline-flex h-8 items-center border border-(--site-line) px-3">
              Engineering
            </span>
            <span class="inline-flex h-8 items-center border border-(--site-line) px-3">
              Product
            </span>
          </div>

          <h1 class="max-w-3xl text-5xl/14 font-semibold text-(--site-fg) sm:text-7xl/20">
            laifu.me
          </h1>

          <p class="mt-6 max-w-2xl text-lg/8 text-(--site-muted)">
            这里记录技术判断、产品观察、工具实践和一些生活里的长期思考。文章少一点噪音，多一点可复用的经验。
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
            <div class="py-4 pr-4">
              <dt class="text-(--site-muted)">Signal</dt>
              <dd class="mt-1 font-medium text-(--site-fg)">Long-form</dd>
            </div>
            <div class="border-x border-(--site-line) p-4">
              <dt class="text-(--site-muted)">Cadence</dt>
              <dd class="mt-1 font-medium text-(--site-fg)">Slow notes</dd>
            </div>
            <div class="py-4 pl-4">
              <dt class="text-(--site-muted)">Mode</dt>
              <dd class="mt-1 font-medium text-(--site-fg)">Reusable</dd>
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
