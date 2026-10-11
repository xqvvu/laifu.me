import {
  articleFields,
  rankRelatedArticles,
  type ArticleField,
} from "~~/utils/article-listing-core";

export {
  countArticleTags,
  filterArticlesByTag,
  groupArticlesByYear,
  listArticleTags,
  rankRelatedArticles,
  searchArticleListings,
} from "~~/utils/article-listing-core";

export type { ArticleListingItem, ArticleTagCount } from "~~/utils/article-listing-core";

/**
 * Every public listing query shares the same three traits: it excludes
 * drafts, orders newest-first, and picks a named column set. `publicBlog()`
 * encodes that once so the queries below stay declarative.
 */
function publicBlog(fields: readonly ArticleField[]) {
  return queryCollection("blog")
    .where("draft", "<>", true)
    .select(...fields);
}

export function queryPublicArticleCount() {
  return queryCollection("blog").where("draft", "<>", true).count("*");
}

export function queryRecentArticles(limit = 6) {
  return publicBlog(articleFields.listing).order("date", "DESC").limit(limit).all();
}

export function queryPagedArticles(page: number, pageSize: number) {
  return publicBlog(articleFields.listing)
    .order("date", "DESC")
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .all();
}

export function queryArticleIndex() {
  return publicBlog(articleFields.index).order("date", "DESC").all();
}

export function queryArchiveArticles() {
  return publicBlog(articleFields.archive).order("date", "DESC").all();
}

export function queryTagArticles() {
  return publicBlog(articleFields.listing).order("date", "DESC").all();
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
  return rankRelatedArticles(await queryArticleIndex(), currentArticle, limit);
}
