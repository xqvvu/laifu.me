import { getPrerenderRoutes } from "./utils/content-routes";
import { readingStats } from "./utils/reading-time";

type NuxtConfig = NonNullable<Parameters<typeof defineNuxtConfig>[0]>;
type NuxtConfigHooks = NonNullable<NuxtConfig["hooks"]>;
type NuxtConfigVitePlugins = NonNullable<NonNullable<NuxtConfig["vite"]>["plugins"]>;

const contentFileAfterParseHook: NuxtConfigHooks["content:file:afterParse"] = ({
  content,
  collection,
}) => {
  if (collection.name !== "blog") return;
  content.reading = readingStats(content.body);
};

const prerenderRoutesHook: NuxtConfigHooks["prerender:routes"] = async (ctx) => {
  for (const route of await getPrerenderRoutes()) {
    ctx.routes.add(route);
  }
};

/**
 * NUXT_B7002 workaround:
 * @nuxtjs/mdc injects `optimizeDeps.include` as `@nuxtjs/mdc > <dep>`.
 * @nuxt/content rewrites those to `@nuxt/content > @nuxtjs/mdc > <dep>` so pnpm
 * can resolve them, but it registers the rewrite before mdc adds the entries.
 * Re-apply the rewrite after both modules have mutated the Vite config.
 */
function fixMdcOptimizeDeps(): NuxtConfigVitePlugins[number] {
  return {
    name: "laifu:fix-mdc-optimize-deps",
    config(config) {
      const include = config.optimizeDeps?.include;
      if (!include?.length) return;

      config.optimizeDeps ??= {};
      config.optimizeDeps.include = include
        .filter((id) => id !== "@nuxtjs/mdc")
        .map((id) => id.replace(/^@nuxtjs\/mdc > /, "@nuxt/content > @nuxtjs/mdc > "));
    },
  };
}

/**
 * NUXT_B2005 workaround:
 * Nuxt 4.5 ships `check-if-page-unused` with
 * `export { A, plugin as default, B }`. mlly's findExports only marks a
 * standalone `export { x as default }` as type "default", so Nuxt thinks the
 * plugin has no default export and stubs it out. Drop the broken diagnostic
 * plugin until upstream fixes the export shape or findExports check.
 */
const stripBrokenCheckIfPageUnusedPlugin: NuxtConfigHooks["app:resolve"] = (app) => {
  app.plugins = app.plugins.filter((plugin) => !plugin.src.includes("check-if-page-unused"));
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: {
    enabled: true,
  },
  hooks: {
    "content:file:afterParse": contentFileAfterParseHook,
    "prerender:routes": prerenderRoutesHook,
    "app:resolve": stripBrokenCheckIfPageUnusedPlugin,
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/content",
    "@nuxt/ui",
    "@nuxtjs/seo",
  ],
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
  image: {
    domains: ["images.pexels.com", "i.ytimg.com"],
    quality: 80,
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/rss.xml", "/sitemap.xml"],
    },
  },
  app: {
    pageTransition: {
      name: "page-soft",
      mode: "out-in",
    },
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
      include: ["../*.config.ts", "../utils", "../tests"],
    },
  },
  vite: {
    plugins: [fixMdcOptimizeDeps()],
  },
});
