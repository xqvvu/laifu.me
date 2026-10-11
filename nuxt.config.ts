import tailwindcss from "@tailwindcss/vite";

import { getPrerenderRoutes } from "./utils/content-routes";
import { readingStats } from "./utils/reading-time";

type NuxtConfig = NonNullable<Parameters<typeof defineNuxtConfig>[0]>;
type NuxtConfigHooks = NonNullable<NuxtConfig["hooks"]>;

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

/**
 * MDC directive → component aliases, supplied to `@nuxtjs/mdc` directly.
 * Nuxt Content already ships default `Prose*` components for standard
 * markdown nodes, so this only has to name the container directives used
 * across `content/`. Each target lives in `app/components/content/` and is
 * auto-imported by name.
 */
const contentComponents = {
  note: "ProseNote",
  tip: "ProseTip",
  warning: "ProseWarning",
  card: "ProseCard",
  tabs: "ProseTabs",
  "tabs-item": "ProseTabsItem",
  "code-group": "ProseCodeGroup",
  "code-collapse": "ProseCodeCollapse",
  kbd: "ProseKbd",
  pre: "ProsePre",
  "video-player": "VideoPlayer",
  "video-embed": "VideoEmbed",
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
  modules: ["@nuxt/fonts", "@nuxt/content", "@nuxtjs/color-mode", "@nuxtjs/seo"],
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
        name: "Inter",
        provider: "fontsource",
        global: true,
        weights: [400, 500, 600, 700],
      },
      {
        name: "Noto Sans SC",
        provider: "fontsource",
        global: true,
        subsets: ["chinese-simplified"],
        weights: [400, 500, 700],
      },
      {
        name: "JetBrains Mono",
        provider: "fontsource",
        weights: [400, 500],
      },
    ],
  },
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },
  ogImage: {
    enabled: false,
  },
  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/rss.xml", "/sitemap.xml"],
    },
  },
  app: {
    pageTransition: {
      name: "page-fade",
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
            dark: "github-dark-default",
          },
        },
        toc: {
          depth: 3,
          searchDepth: 3,
        },
      },
    },
  },
  // `@nuxtjs/mdc` reads its directive map from here and mirrors it into
  // `runtimeConfig.public.mdc`, which is what the renderer actually consults.
  mdc: {
    components: {
      map: contentComponents,
    },
  },
  typescript: {
    nodeTsConfig: {
      include: ["../*.config.ts", "../utils", "../tests"],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
