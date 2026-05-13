import { queryCollection } from "@nuxt/content/server";

import { extractTextFromBody } from "../../app/utils/content";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default defineEventHandler(async (event) => {
  const siteUrl = "https://laifu.me";
  const posts = await queryCollection(event, "blog")
    .where("draft", "<>", true)
    .order("date", "DESC")
    .all();

  setHeader(event, "content-type", "application/rss+xml; charset=utf-8");

  const items = posts
    .map((post) => {
      const url = `${siteUrl}${post.path}`;
      const text = extractTextFromBody(post.body).slice(0, 500);

      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid>${escapeXml(url)}</guid>`,
        `<description>${escapeXml(post.description || text)}</description>`,
        `<pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        "</item>",
      ].join("");
    })
    .join("");

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    "<title>laifu.me</title>",
    `<link>${siteUrl}</link>`,
    "<description>写给长期主义者的技术、产品与生活札记。</description>",
    "<language>zh-CN</language>",
    items,
    "</channel>",
    "</rss>",
  ].join("");

  if (event.method === "HEAD") {
    return "";
  }

  return feed;
});
