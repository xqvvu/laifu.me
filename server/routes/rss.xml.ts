import { queryCollection } from "@nuxt/content/server";

import { getSiteConfig } from "#site-config/server/composables/getSiteConfig";
import { withSiteUrl } from "#site-config/server/composables/utils";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default defineEventHandler(async (event) => {
  const site = getSiteConfig(event);
  const posts = await queryCollection(event, "blog")
    .where("draft", "<>", true)
    .select("path", "title", "description", "date", "tags")
    .order("date", "DESC")
    .all();
  const feedUrl = withSiteUrl(event, "/rss.xml");
  const siteUrl = site.url || withSiteUrl(event, "/");
  const lastBuildDate = posts[0]?.date
    ? new Date(posts[0].date).toUTCString()
    : new Date().toUTCString();

  setHeader(event, "content-type", "application/rss+xml; charset=utf-8");

  const items = posts
    .map((post) => {
      const url = withSiteUrl(event, post.path);

      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid>${escapeXml(url)}</guid>`,
        `<description>${escapeXml(post.description)}</description>`,
        `<pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        ...(post.tags || []).map((tag) => `<category>${escapeXml(tag)}</category>`),
        "</item>",
      ].join("");
    })
    .join("");

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    `<title>${escapeXml(site.name || "laifu.me")}</title>`,
    `<link>${escapeXml(siteUrl)}</link>`,
    `<description>${escapeXml(site.description || "")}</description>`,
    `<language>${escapeXml(site.defaultLocale || "zh-CN")}</language>`,
    `<lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>`,
    `<atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    items,
    "</channel>",
    "</rss>",
  ].join("");

  if (event.method === "HEAD") {
    return "";
  }

  return feed;
});
