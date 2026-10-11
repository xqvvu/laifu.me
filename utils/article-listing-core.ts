/**
 * Pure, runtime-agnostic helpers shared by the app and the server.
 * Nothing here touches Nuxt Content — it only shapes plain article objects,
 * which keeps it trivially testable and importable from `nuxt.config.ts`.
 */

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

/**
 * Field names available on the blog collection. Declared here as literals so
 * the column sets below stay assignable to Content's `select()`.
 */
export type ArticleField =
  | "path"
  | "title"
  | "description"
  | "date"
  | "updated"
  | "tags"
  | "reading";

/**
 * Column sets for Content queries. Picking fields in one place keeps every
 * listing consistent and stops `select()` lists from drifting apart.
 */
export const articleFields: Record<
  "index" | "listing" | "archive" | "feed" | "sitemap",
  readonly ArticleField[]
> = {
  /** Minimal shape for search/tag indexing. */
  index: ["path", "title", "description", "date", "tags"],
  /** Listing rows: everything ArticleCard renders. */
  listing: ["path", "title", "description", "date", "tags", "reading"],
  /** Archive rows: date and title only. */
  archive: ["path", "title", "date"],
  /** Feed entries: adds description for the RSS summary. */
  feed: ["path", "title", "description", "date", "tags"],
  /** Sitemap entries: needs dates and tags, not prose. */
  sitemap: ["path", "date", "updated", "tags"],
};

export function countArticleTags(articles: Pick<ArticleListingItem, "tags">[]): ArticleTagCount[] {
  const counts = new Map<string, number>();

  for (const article of articles) {
    for (const tag of article.tags || []) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh-CN"));
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
  const needle = keyword.trim().toLowerCase();

  if (!needle) return [];

  return articles.filter((article) =>
    [article.title, article.description, article.tags?.join(" ")]
      .join(" ")
      .toLowerCase()
      .includes(needle),
  );
}

export function filterArticlesByTag<T extends Pick<ArticleListingItem, "tags">>(
  articles: T[],
  tag: string,
) {
  return articles.filter((article) => article.tags?.includes(tag));
}

export function groupArticlesByYear<T extends { date: string }>(articles: T[]) {
  return groupByKey(articles, (date) => `${date.getFullYear()}`);
}

/**
 * Buckets articles by a date-derived key, newest first, preserving the
 * incoming order inside each bucket.
 */
function groupByKey<T extends { date: string }>(articles: T[], keyOf: (date: Date) => string) {
  const groups = new Map<string, T[]>();

  for (const article of articles) {
    const key = keyOf(new Date(article.date));
    const bucket = groups.get(key);
    if (bucket) bucket.push(article);
    else groups.set(key, [article]);
  }

  return [...groups.entries()];
}

export function rankRelatedArticles<T extends ArticleListingItem>(
  articles: T[],
  currentArticle: Pick<ArticleListingItem, "path" | "tags">,
  limit = 3,
) {
  const currentTags = currentArticle.tags || [];

  if (!currentTags.length) return [];

  return articles
    .filter((article) => article.path !== currentArticle.path)
    .map((article) => ({
      article,
      relevance: (article.tags || []).filter((tag) => currentTags.includes(tag)).length,
    }))
    .filter((entry) => entry.relevance > 0)
    .sort(
      (a, b) => b.relevance - a.relevance || +new Date(b.article.date) - +new Date(a.article.date),
    )
    .slice(0, limit)
    .map((entry) => entry.article);
}
