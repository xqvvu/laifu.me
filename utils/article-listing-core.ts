export type ArticleReading = {
  text: string;
  wordCountText: string;
};

export type ArticleListingItem = {
  path: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  reading?: ArticleReading;
};

export type ArticleTagCount = [tag: string, count: number];

export type ArticleArchiveGroup<T extends { date: string }> = [month: string, articles: T[]];

export function sortArticlesNewestFirst<T extends { date: string }>(articles: T[]) {
  return [...articles].sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function countArticleTags(articles: Pick<ArticleListingItem, "tags">[]): ArticleTagCount[] {
  const counts = new Map<string, number>();

  for (const article of articles) {
    for (const tag of article.tags || []) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

export function listArticleTags(articles: Pick<ArticleListingItem, "tags">[]) {
  return [...new Set(articles.flatMap((article) => article.tags || []))].sort((a, b) =>
    a.localeCompare(b, "zh-CN"),
  );
}

export function searchArticleListings<T extends ArticleListingItem>(
  articles: T[],
  keyword: string,
) {
  const normalizedKeyword = keyword.trim().toLowerCase();

  if (!normalizedKeyword) {
    return [];
  }

  return articles.filter((article) => {
    const haystack = [article.title, article.description, article.tags?.join(" ")]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedKeyword);
  });
}

export function filterArticlesByTag<T extends Pick<ArticleListingItem, "tags">>(
  articles: T[],
  tag: string,
) {
  return articles.filter((article) => article.tags?.includes(tag));
}

export function groupArticlesByMonth<T extends { date: string }>(
  articles: T[],
): ArticleArchiveGroup<T>[] {
  const grouped = new Map<string, T[]>();

  for (const article of articles) {
    const date = new Date(article.date);
    const key = `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`;
    const items = grouped.get(key) || [];

    grouped.set(key, [...items, article]);
  }

  return [...grouped.entries()];
}

export function rankRelatedArticles<T extends ArticleListingItem>(
  articles: T[],
  currentArticle: Pick<ArticleListingItem, "path" | "tags">,
  limit = 3,
) {
  const currentTags = currentArticle.tags || [];

  if (!currentTags.length) {
    return [];
  }

  return articles
    .filter((article) => article.path !== currentArticle.path)
    .map((article) => ({
      ...article,
      relevance: (article.tags || []).filter((tag) => currentTags.includes(tag)).length,
    }))
    .filter((article) => article.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance || +new Date(b.date) - +new Date(a.date))
    .slice(0, limit);
}
