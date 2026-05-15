import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const readingTimeRuntime = require.resolve("reading-time/lib/reading-time");

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/content", "@nuxt/ui", "@nuxtjs/seo"],
  eslint: {},
  css: ["~/assets/css/main.css"],
  site: {
    name: "laifu.me",
    url: "https://laifu.me",
    description: "写给长期主义者的技术、产品与生活札记。",
    defaultLocale: "zh-CN",
  },
  fonts: {
    families: [
      {
        name: "Roboto",
        provider: "fontsource",
        global: true,
        weights: [400, 500, 600, 700],
      },
      {
        name: "Noto Sans SC",
        provider: "fontsource",
        global: true,
        subsets: ["chinese-simplified"],
        weights: [400, 500, 600, 700],
      },
      {
        name: "Fira Code",
        provider: "fontsource",
        weights: [400, 500, 600],
      },
    ],
  },
  ogImage: {
    enabled: false,
  },
  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "zh-CN",
      },
      link: [
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "laifu.me RSS",
          href: "/rss.xml",
        },
      ],
    },
  },
  content: {
    experimental: {
      sqliteConnector: "native",
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: "github-light",
            light: "github-light",
            dark: "github-dark-high-contrast",
          },
        },
        toc: {
          depth: 3,
          searchDepth: 3,
        },
      },
    },
  },
  ui: {
    theme: {
      colors: ["emerald", "sky", "slate", "zinc", "neutral"],
    },
  },
  typescript: {
    nodeTsConfig: {
      include: ["../*.config.ts"],
    },
  },
  vite: {
    optimizeDeps: {
      include: ["@nuxtjs/mdc", "reading-time"],
    },
    resolve: {
      alias: [
        {
          find: /^reading-time$/,
          replacement: readingTimeRuntime,
        },
      ],
    },
  },
});
