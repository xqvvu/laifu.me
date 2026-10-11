<script setup lang="ts">
const navItems = [
  { label: "Blog", to: "/blog" },
  { label: "Archive", to: "/archive" },
  { label: "About", to: "/about" },
];

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

useHead({
  meta: [
    { name: "color-scheme", content: "light dark" },
    {
      name: "theme-color",
      content: () => (isDark.value ? "#0b0b0c" : "#ffffff"),
    },
  ],
});

function toggleColorMode() {
  colorMode.preference = isDark.value ? "light" : "dark";
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="site-bar">
      <nav class="shell flex h-14 items-center justify-between gap-4">
        <NuxtLink class="site-brand" aria-label="返回首页" to="/">
          <SiteLogo class="h-6 w-6" />
        </NuxtLink>

        <div class="flex items-center gap-0.5 sm:gap-1">
          <NuxtLink v-for="item in navItems" :key="item.to" class="site-nav-link" :to="item.to">
            {{ item.label }}
          </NuxtLink>

          <button
            class="site-icon-button"
            type="button"
            aria-label="切换主题"
            @click="toggleColorMode"
          >
            <AppIcon :name="isDark ? 'sun' : 'moon'" size="1rem" />
          </button>
        </div>
      </nav>
    </header>

    <main class="flex-1">
      <NuxtPage />
    </main>

    <footer class="mt-20 border-t border-(--rule)">
      <div
        class="shell flex flex-col gap-3 py-8 text-sm text-(--ink-faint) sm:flex-row sm:items-center sm:justify-between"
      >
        <p>
          © {{ new Date().getFullYear() }}
          <NuxtLink class="muted-link hover:text-(--ink)" to="/">laifu.me</NuxtLink>
        </p>
        <div class="flex flex-wrap gap-x-5 gap-y-2">
          <NuxtLink class="muted-link hover:text-(--ink)" to="/blog">Blog</NuxtLink>
          <NuxtLink class="muted-link hover:text-(--ink)" to="/archive">Archive</NuxtLink>
          <a class="muted-link hover:text-(--ink)" href="/rss.xml">RSS</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/*
 * The header is intentionally transparent: it floats over the dot grid
 * rather than drawing a second band of chrome. Scrolling adds a hairline.
 */
.site-bar {
  position: sticky;
  top: 0;
  z-index: 40;
  background: color-mix(in srgb, var(--paper), transparent 18%);
  backdrop-filter: saturate(180%) blur(12px);
}

.site-brand {
  display: inline-flex;
  align-items: center;
  color: var(--ink);
  text-decoration: none;
}

.site-nav-link {
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  color: var(--ink-soft);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition:
    color 120ms ease,
    background-color 120ms ease;
}

.site-nav-link:hover {
  color: var(--ink);
}

.site-nav-link.router-link-active {
  color: var(--ink);
}

.site-icon-button {
  display: grid;
  width: 2rem;
  height: 2rem;
  margin-left: 0.25rem;
  place-items: center;
  border-radius: 6px;
  background: none;
  color: var(--ink-soft);
  cursor: pointer;
  transition:
    color 120ms ease,
    background-color 120ms ease;
}

.site-icon-button:hover {
  background: var(--paper-sunk);
  color: var(--ink);
}
</style>
