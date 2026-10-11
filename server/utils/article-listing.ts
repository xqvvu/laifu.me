import { queryCollection } from "@nuxt/content/server";
import type { H3Event } from "h3";
import { articleFields, listArticleTags } from "~~/utils/article-listing-core";

export function queryFeedArticles(event: H3Event) {
  return queryCollection(event, "blog")
    .where("draft", "<>", true)
    .select(...articleFields.feed)
    .order("date", "DESC")
    .all();
}

export function querySitemapArticles(event: H3Event) {
  return queryCollection(event, "blog")
    .where("draft", "<>", true)
    .select(...articleFields.sitemap)
    .all();
}

export async function querySitemapTagUrls(event: H3Event) {
  return listArticleTags(await querySitemapArticles(event)).map((tag) => ({
    loc: `/tags/${tag}`,
  }));
}
