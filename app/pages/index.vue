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
        <p class="mb-5 text-sm font-medium tracking-[0.16em] text-(--site-accent) uppercase">
          Personal notes
        </p>
        <h1 class="max-w-3xl text-4xl font-semibold tracking-normal text-(--site-fg) sm:text-6xl">
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
      </div>

      <aside class="border-l-2 border-(--site-accent) pl-5">
        <p class="text-sm font-medium text-(--site-fg)">现在关注</p>
        <p class="mt-3 text-sm/7 text-(--site-muted)">
          Nuxt、AI 产品、工程效率、个人知识系统，以及如何把想法稳定地做成作品。
        </p>
      </aside>
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
