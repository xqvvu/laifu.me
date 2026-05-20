import { queryCollection } from "@nuxt/content/server";
import type { H3Event } from "h3";
import { listArticleTags } from "~~/utils/article-listing-core";

export function queryFeedArticles(event: H3Event) {
  return queryCollection(event, "blog")
    .where("draft", "<>", true)
    .select("path", "title", "description", "date", "tags")
    .order("date", "DESC")
    .all();
}

export function querySitemapArticles(event: H3Event) {
  return queryCollection(event, "blog")
    .where("draft", "<>", true)
    .select("path", "date", "updated", "tags")
    .all();
}

export async function querySitemapTagUrls(event: H3Event) {
  const articles = await querySitemapArticles(event);

  return listArticleTags(articles).map((tag) => ({
    loc: `/tags/${tag}`,
  }));
}
