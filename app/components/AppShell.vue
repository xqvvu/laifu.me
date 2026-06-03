<script setup lang="ts">
import { siteCopy } from "~/utils/site-copy";

const navItems = [
  { label: "首页", to: "/" },
  { label: "文章", to: "/blog" },
  { label: "归档", to: "/archive" },
  { label: "关于", to: "/about" },
];

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
const themeColor = computed(() => (isDark.value ? "#050505" : "#f7f5f0"));
const currentYear = new Date().getFullYear();

useHead({
  meta: [
    {
      name: "color-scheme",
      content: "light dark",
    },
    {
      name: "theme-color",
      content: () => themeColor.value,
    },
  ],
});

function toggleColorMode() {
  colorMode.preference = isDark.value ? "light" : "dark";
}
</script>

<template>
  <div class="min-h-screen">
    <header
      class="sticky top-0 z-40 border-b border-(--site-line) bg-(--site-bg)/90 backdrop-blur-sm"
    >
      <nav class="site-container flex h-16 min-w-0 items-center justify-between gap-3">
        <NuxtLink
          class="flex min-w-0 items-center gap-3 rounded-md text-sm font-semibold tracking-normal transition-colors outline-none hover:text-(--site-accent) focus-visible:ring-2 focus-visible:ring-(--site-accent)/30 focus-visible:ring-offset-2 focus-visible:ring-offset-(--site-bg)"
          to="/"
        >
          <SiteLogo />
        </NuxtLink>

        <div class="flex min-w-0 items-center gap-0.5 overflow-x-auto sm:gap-1">
          <UButton
            v-for="item in navItems"
            :key="item.to"
            color="neutral"
            :label="item.label"
            size="sm"
            :to="item.to"
            variant="ghost"
          />
          <UButton
            aria-label="切换主题"
            color="neutral"
            size="sm"
            square
            variant="ghost"
            @click="toggleColorMode"
          >
            <span aria-hidden="true" class="i-[lucide--moon] size-4! dark:hidden" />
            <span aria-hidden="true" class="i-[lucide--sun] hidden size-4! dark:inline-block" />
          </UButton>
        </div>
      </nav>
    </header>

    <main>
      <NuxtPage />
    </main>

    <footer class="border-t border-(--site-line) py-10 text-sm text-(--site-muted)">
      <div
        class="site-container flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ currentYear }} {{ siteCopy.title }} · {{ siteCopy.tagline }}</p>
        <div class="flex flex-wrap gap-x-4 gap-y-2">
          <NuxtLink class="hover:text-(--site-fg)" to="/blog">文章</NuxtLink>
          <NuxtLink class="hover:text-(--site-fg)" to="/archive">归档</NuxtLink>
          <NuxtLink class="hover:text-(--site-fg)" to="/about">关于</NuxtLink>
          <a class="hover:text-(--site-fg)" href="/rss.xml">RSS</a>
          <a class="hover:text-(--site-fg)" href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
    </footer>
  </div>
</template>
