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
    .select("path", "title", "description", "date")
    .order("date", "DESC")
    .all();

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
        "</item>",
      ].join("");
    })
    .join("");

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    `<title>${escapeXml(site.name || "laifu.me")}</title>`,
    `<link>${escapeXml(site.url || withSiteUrl(event, "/"))}</link>`,
    `<description>${escapeXml(site.description || "")}</description>`,
    `<language>${escapeXml(site.defaultLocale || "zh-CN")}</language>`,
    items,
    "</channel>",
    "</rss>",
  ].join("");

  if (event.method === "HEAD") {
    return "";
  }

  return feed;
});
