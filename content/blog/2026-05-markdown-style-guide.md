---
title: "Markdown 样式预览"
description: "覆盖常见 Markdown 语法和 Nuxt Content MDC 组件，用来检查博客正文的实际渲染效果。"
date: 2026-05-14
tags: ["Markdown", "设计", "博客"]
draft: false
featured: false
---

# 一级标题

这篇文章用来预览当前博客的 Markdown 渲染效果。它会尽量覆盖常见元素，包括标题、段落、列表、引用、表格、代码、图片和 Nuxt Content 的 MDC 组件。

正文段落应该有稳定的行高、合适的宽度和足够的上下间距。中文、English words、数字 12345 和 `inline code` 混排时，也应该保持自然的阅读节奏。

## 二级标题

二级标题通常用于文章的主要章节。标题之间应该有明确层级，但不要显得过重。

### 三级标题

三级标题适合小节。目录一般会显示到这个层级。

#### 四级标题

四级标题较少使用，适合在复杂技术文章中标记细粒度内容。

## 文本样式

这是普通文本，包含 **加粗文本**、*斜体文本*、~~删除线文本~~ 和 `行内代码`。

你也可以写一个链接，比如 [Nuxt 官网](https://nuxt.com)，或者引用一个本地路径 `/content/blog`。

有时需要解释快捷键，例如 :kbd{value="⌘"} + :kbd{value="K"}。如果当前渲染器不处理 HTML，这一段应该仍然保持可读。

## 引用

> 好的排版不是装饰，而是减少阅读阻力。
>
> 多段引用可以继续写。
>
> 第二段引用应该和第一段保持同一个引用块。

## 无序列表

- 第一项
- 第二项
  - 嵌套项目 A
  - 嵌套项目 B
- 第三项，内容稍微长一点，用来观察自动换行时的缩进是否稳定，尤其是在移动端窄屏下是否还能保持清楚。

## 有序列表

1. 先写下问题。
2. 再列出约束。
3. 最后给出可执行方案。

## 任务列表

- [x] 支持 Markdown 内容
- [x] 支持 Shiki 代码高亮
- [ ] 微调代码块视觉
- [ ] 增加真实文章内容

## 表格

| 能力 | 当前状态 | 说明 |
| --- | --- | --- |
| Markdown | 已支持 | 来自 Nuxt Content |
| 代码高亮 | 已支持 | 来自 Shiki |
| RSS | 已支持 | `/rss.xml` |
| 搜索 | 已支持 | 当前是本地过滤 |

## 分割线

上方内容。

---

下方内容。

## 行内代码和代码块

行内代码看起来应该像 `queryCollection('blog')` 这样，不应该过亮或撑高行距。

```ts [nuxt.config.ts] {3-12}
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/ui', '@nuxtjs/seo'],
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            light: 'github-light',
            dark: 'github-dark-high-contrast'
          }
        }
      }
    }
  }
})
```

```vue [app/pages/blog/index.vue] {2-3,7-11}
<script setup lang="ts">
const { data: articles } = await useAsyncData('posts', () =>
  queryCollection('blog').order('date', 'DESC').all()
)
</script>

<template>
  <ArticleCard
    v-for="article in articles"
    :key="article.path"
    :article="article"
  />
</template>
```

```bash [terminal]
pnpm install
pnpm dev
pnpm build
```

::code-group{sync="package-manager"}
```bash [pnpm]
pnpm dev
```

```bash [npm]
npm run dev
```

```bash [bun]
bun run dev
```
::

## 长代码

下面的代码块比较长，用来检查横向滚动、复制按钮和边界表现。

::code-collapse{name="完整的分组函数"}
```ts [app/utils/content.ts] {10-17}
type Article = {
  title: string
  description: string
  date: string
  tags: string[]
  draft?: boolean
  featured?: boolean
}

export function groupArticlesByYear(articles: Article[]) {
  return articles.reduce<Record<string, Article[]>>((groups, article) => {
    const year = new Date(article.date).getFullYear().toString()

    if (!groups[year]) {
      groups[year] = []
    }

    groups[year].push(article)
    return groups
  }, {})
}
```
::

## 图片

下面是一个外部图片，用来检查图片边框、圆角和暗色模式下的对比。

![Nuxt logo](https://images.pexels.com/photos/21033166/pexels-photo-21033166.jpeg)

## 视频

下面是一个视频组件示例，用来检查播放器边框、比例、说明文字和移动端宽度。

::video-player{src="https://www.pexels.com/download/video/37462056/" title="花朵视频示例" caption="自托管或外部 MP4 都可以用同一个 VideoPlayer 组件展示。"}
::

## 嵌入视频

下面是一个第三方视频嵌入示例。默认先显示占位层，点击后再加载 iframe。

::video-embed{provider="youtube" id="dQw4w9WgXcQ" title="YouTube 嵌入示例" caption="第三方视频适合用 VideoEmbed 组件，避免文章打开时立刻加载外部 iframe。"}
::

## Nuxt MDC 组件

::note
这是一个 note callout，用来提示补充信息。
::

::tip
这是一个 tip callout，适合放建议或最佳实践。
::

::warning
这是一个 warning callout，适合放风险、限制或需要注意的事项。
::

::card
---
title: 卡片标题
icon: i-lucide-book-open
---
卡片内容可以用于推荐阅读、资源链接或补充材料。
::

::tabs
  ::tabs-item{label="pnpm" icon="i-lucide-terminal"}
  ```bash
  pnpm dev
  ```
  ::

  ::tabs-item{label="npm" icon="i-lucide-terminal"}
  ```bash
  npm run dev
  ```
  ::
::

## 结尾

如果这篇文章的每个部分都看起来协调，说明正文样式已经具备继续写真实文章的基础。后续可以重点微调代码块、表格和 callout。
