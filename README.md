# laifu.me

一个以文字为主的个人博客。写给长期主义者的技术、产品与生活札记。

## 技术栈

| 关注点 | 方案 |
| --- | --- |
| 框架 | Nuxt 4（静态预渲染） |
| 内容 | Nuxt Content + Markdown / MDC |
| 样式 | Tailwind CSS v4 + 少量组件级 CSS |
| 字体 | Inter / Noto Sans SC / JetBrains Mono |
| SEO | @nuxtjs/seo（sitemap、robots、schema.org） |
| 主题 | @nuxtjs/color-mode（跟随系统） |

内容之外的东西尽量不引入依赖。图标是 7 条内联 SVG（`app/utils/icons.ts`），
Markdown 里的容器指令全部由 `app/components/content/` 下的组件实现，
不需要 UI 组件库或图标字体。

## 开发

```bash
pnpm install
pnpm dev
```

开发服务器默认在 `http://localhost:5173`。

## 构建与检查

```bash
pnpm build       # 生产构建，预渲染全部路由
pnpm lint        # oxlint + mdclint
pnpm typecheck   # vue-tsc
pnpm test:e2e    # Playwright 端到端测试
pnpm check       # lint + build
```

## 目录结构

```text
app/
  assets/css/main.css        设计令牌（颜色、字体、宽度）+ 全局排版
  components/
    AppShell.vue             页头、页脚、主题切换
    AppIcon.vue              内联图标渲染
    ArticleCard.vue          列表行
    ArticleProse.vue         正文排版（Markdown 渲染结果的样式）
    ArticleNav.vue           上一篇 / 下一篇
    RelatedArticles.vue      相关文章
    SiteLogo.vue             手写签名 logo
    content/                 MDC 容器指令组件
    mdc/                     视频组件
  pages/                     文件路由
  utils/                     浏览器端取数、格式化、图标
content/
  blog/YYYY/slug.md          文章
  pages/*.md                 静态页面（关于等）
server/
  api/__sitemap__/urls.ts    sitemap 动态源
  routes/rss.xml.ts          RSS
  utils/article-listing.ts   服务端取数
utils/
  article-listing-core.ts    纯函数：分组、计数、搜索、排序
  content-routes.ts          预渲染路由枚举
  reading-time.ts            字数与阅读时长
```

关键约定：`utils/` 是与运行时无关的纯逻辑，`app/utils/` 是浏览器端封装，
`server/utils/` 是服务端封装。三者共享 `article-listing-core.ts`。

## 写文章

新建 `content/blog/<年份>/<slug>.md`，它会映射到 `/blog/<年份>/<slug>`。

```yaml
---
title: "文章标题"
description: "一句话摘要"
date: 2026-05-13
tags: ["Nuxt", "博客"]
draft: false
featured: false
---
```

字段说明见 `content.config.ts`。`draft: true` 的文章不会出现在列表、
RSS 和 sitemap 中。可选字段：`updated`、`cover`、`featured`。

### 正文里的容器指令

`content/blog/2026/markdown-style-guide.md` 是完整的渲染示例。

| 指令 | 用途 |
| --- | --- |
| `::note` / `::tip` / `::warning` | 提示块 |
| `::card` | 卡片，支持 `title` 和 `icon` |
| `::tabs` + `::tabs-item` | 标签页 |
| `::code-group` | 多包管理器代码，自动用文件名做标签 |
| `::code-collapse` | 折叠长代码 |
| `::video-player` | 自托管 MP4 |
| `::video-embed` | 第三方嵌入（点击后加载） |

代码围栏的 `[文件名]` 会渲染成代码块上方的标题：

````markdown
```ts [nuxt.config.ts]
export default defineNuxtConfig({})
```
````

新增指令时，在 `nuxt.config.ts` 的 `contentComponents` 里加一条映射，
然后在 `app/components/content/` 下实现同名组件。

## VS Code 代码片段

写作片段在 `.vscode/blog-mdc.code-snippets`（作用于 `markdown` / `mdx`）。

| 前缀 | 内容 |
| --- | --- |
| `blog` / `blogpost` | frontmatter + 开篇 |
| `blogdraft` | 草稿 frontmatter |
| `note` / `tip` / `warning` | 提示块 |
| `card` | 卡片 |
| `tabs` | 标签页 |
| `codegroup` | pnpm / npm / bun 代码组 |
| `codecollapse` | 可折叠长代码 |
| `mdcode` | 带文件名的代码块 |
| `videoplayer` | 自托管视频 |
| `youtube` / `bilibili` / `vimeo` | 嵌入视频 |
| `blogimg` | 图片 |
| `blogsection` | H2 小节骨架 |
