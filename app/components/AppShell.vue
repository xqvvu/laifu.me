<script setup lang="ts">
const navItems = [
  { label: "首页", to: "/" },
  { label: "文章", to: "/blog" },
  { label: "归档", to: "/archive" },
  { label: "关于", to: "/about" },
];

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

function toggleColorMode() {
  colorMode.preference = isDark.value ? "light" : "dark";
}
</script>

<template>
  <div class="min-h-screen">
    <header
      class="sticky top-0 z-40 border-b border-[var(--site-line)] bg-[var(--site-bg)]/90 backdrop-blur"
    >
      <nav class="site-container flex h-16 items-center justify-between gap-4">
        <NuxtLink to="/" class="flex items-center gap-3 text-sm font-semibold tracking-normal">
          <span
            class="grid size-9 place-items-center rounded-md bg-[var(--site-fg)] text-[var(--site-bg)]"
            >来</span
          >
          <span>laifu.me</span>
        </NuxtLink>

        <div class="flex items-center gap-1">
          <UButton
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :label="item.label"
            variant="ghost"
            color="neutral"
            size="sm"
          />
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            square
            aria-label="切换主题"
            @click="toggleColorMode"
          >
            <span class="icon-[lucide--moon] dark:icon-[lucide--sun] size-4" aria-hidden="true" />
          </UButton>
        </div>
      </nav>
    </header>

    <main>
      <NuxtPage />
    </main>

    <footer class="border-t border-[var(--site-line)] py-10 text-sm text-[var(--site-muted)]">
      <div
        class="site-container flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ new Date().getFullYear() }} laifu.me</p>
        <div class="flex gap-4">
          <NuxtLink to="/blog" class="hover:text-[var(--site-fg)]">文章</NuxtLink>
          <NuxtLink to="/archive" class="hover:text-[var(--site-fg)]">归档</NuxtLink>
          <NuxtLink to="/about" class="hover:text-[var(--site-fg)]">关于</NuxtLink>
          <a href="/rss.xml" class="hover:text-[var(--site-fg)]">RSS</a>
          <a href="/sitemap.xml" class="hover:text-[var(--site-fg)]">Sitemap</a>
        </div>
      </div>
    </footer>
  </div>
</template>
