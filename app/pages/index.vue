<script setup lang="ts">
const { data: featured } = await useAsyncData("home-featured-posts", () =>
  queryCollection("blog")
    .where("draft", "<>", true)
    .where("featured", "=", true)
    .order("date", "DESC")
    .limit(3)
    .all(),
);

const { data: recent } = await useAsyncData("home-recent-posts", () =>
  queryCollection("blog").where("draft", "<>", true).order("date", "DESC").limit(5).all(),
);

useSeoMeta({
  title: "laifu.me",
  description: "写给长期主义者的技术、产品与生活札记。",
  ogTitle: "laifu.me",
  ogDescription: "写给长期主义者的技术、产品与生活札记。",
});
</script>

<template>
  <div>
    <section
      class="site-container grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_320px] lg:items-end"
    >
      <div>
        <p class="mb-5 text-sm font-medium tracking-[0.16em] text-[var(--site-accent)] uppercase">
          Personal notes
        </p>
        <h1
          class="max-w-3xl text-4xl font-semibold tracking-normal text-[var(--site-fg)] sm:text-6xl"
        >
          laifu.me
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-[var(--site-muted)]">
          这里记录技术判断、产品观察、工具实践和一些生活里的长期思考。文章少一点噪音，多一点可复用的经验。
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <UButton to="/blog" label="阅读文章" icon="i-lucide-book-open" color="neutral" />
          <UButton
            to="/about"
            label="了解作者"
            icon="i-lucide-user"
            variant="outline"
            color="neutral"
          />
        </div>
      </div>

      <aside class="border-l-2 border-[var(--site-accent)] pl-5">
        <p class="text-sm font-medium text-[var(--site-fg)]">现在关注</p>
        <p class="mt-3 text-sm leading-7 text-[var(--site-muted)]">
          Nuxt、AI 产品、工程效率、个人知识系统，以及如何把想法稳定地做成作品。
        </p>
      </aside>
    </section>

    <section class="border-y border-[var(--site-line)] bg-[var(--site-panel)]/60 py-12">
      <div class="site-container">
        <div class="mb-8 flex items-end justify-between gap-4">
          <div>
            <p class="text-sm text-[var(--site-muted)]">Featured</p>
            <h2 class="mt-1 text-2xl font-semibold tracking-normal">精选文章</h2>
          </div>
          <UButton
            to="/blog"
            label="全部文章"
            trailing-icon="i-lucide-arrow-right"
            variant="ghost"
            color="neutral"
          />
        </div>

        <div class="grid gap-5 md:grid-cols-3">
          <NuxtLink
            v-for="article in featured"
            :key="article.path"
            :to="article.path"
            class="rounded-lg border border-[var(--site-line)] bg-[var(--site-bg)] p-5 transition hover:border-[var(--site-accent)]"
          >
            <p class="text-sm text-[var(--site-muted)]">{{ article.date }}</p>
            <h3 class="mt-3 text-lg font-semibold tracking-normal">{{ article.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-[var(--site-muted)]">{{ article.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="site-container py-12">
      <div class="mb-8">
        <p class="text-sm text-[var(--site-muted)]">Recent</p>
        <h2 class="mt-1 text-2xl font-semibold tracking-normal">最近更新</h2>
      </div>
      <ArticleCard v-for="article in recent" :key="article.path" :article="article" />
    </section>
  </div>
</template>
