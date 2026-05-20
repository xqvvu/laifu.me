import { rankRelatedArticles } from "~~/utils/article-listing-core";

export {
  countArticleTags,
  filterArticlesByTag,
  groupArticlesByMonth,
  rankRelatedArticles,
  searchArticleListings,
} from "~~/utils/article-listing-core";

export function queryPublicArticleCount() {
  return queryCollection("blog").where("draft", "<>", true).count("*");
}

export function queryFeaturedArticles(limit = 3) {
  return queryCollection("blog")
    .where("draft", "<>", true)
    .where("featured", "=", true)
    .select("path", "title", "description", "date")
    .order("date", "DESC")
    .limit(limit)
    .all();
}

export function queryRecentArticles(limit = 5) {
  return queryCollection("blog")
    .where("draft", "<>", true)
    .select("path", "title", "description", "date", "tags", "reading")
    .order("date", "DESC")
    .limit(limit)
    .all();
}

export function queryPagedArticles(page: number, pageSize: number) {
  return queryCollection("blog")
    .where("draft", "<>", true)
    .select("path", "title", "description", "date", "tags", "reading")
    .order("date", "DESC")
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .all();
}

export function queryArticleIndex() {
  return queryCollection("blog")
    .where("draft", "<>", true)
    .select("path", "title", "description", "date", "tags")
    .order("date", "DESC")
    .all();
}

export function queryArchiveArticles() {
  return queryCollection("blog")
    .where("draft", "<>", true)
    .select("path", "title", "date")
    .order("date", "DESC")
    .all();
}

export function queryTagArticles() {
  return queryCollection("blog")
    .where("draft", "<>", true)
    .select("path", "title", "description", "date", "tags", "reading")
    .order("date", "DESC")
    .all();
}

export function queryArticleByPath(path: string) {
  return queryCollection("blog").path(path).first();
}

export function queryArticleSurroundings(path: string) {
  return queryCollectionItemSurroundings("blog", path, {
    fields: ["title", "description"],
  });
}

export async function queryRelatedArticles(
  currentArticle: { path: string; tags?: string[] },
  limit = 3,
) {
  const articles = await queryArticleIndex();
  return rankRelatedArticles(articles, currentArticle, limit);
}
