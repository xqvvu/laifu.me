/**
 * Site copy lives in one place so pages stay markup-only. Written in the
 * first person: it is the author talking, not a product describing itself.
 */
export const siteCopy = {
  name: "laifu.me",
  author: "laifu",
  tagline: "写给长期主义者的技术、产品与生活札记。",
  description: "记录工程、产品、工具与生活系统里的长期判断。少一点噪音，多一点能复用的经验。",

  /** Opening paragraphs on the home page. */
  intro: [
    "这里是我的长期笔记。写工程实践、产品判断、工具流，以及一些值得留下来的生活思考。",
    "不追热点，不写速朽的东西。我更在意一篇文章在两年后是否还站得住，以及它能不能被将来的自己直接拿来用。",
  ],

  /** Short label/value pairs shown as a definition list under the intro. */
  facts: [
    { label: "写什么", value: "工程 · 产品 · 工具 · 生活系统" },
    { label: "怎么读", value: "按标签筛选，或从头翻归档" },
    { label: "更新时间", value: "不定期，有话才写" },
  ],

  /** Kept in sync with `site.name` in nuxt.config.ts. */
  pageTitle: "laifu.me",

  links: [
    { label: "RSS", href: "/rss.xml" },
    { label: "GitHub", href: "https://github.com/xqvvu" },
  ],
} as const;
