import { queryCollection } from "@nuxt/content/server";

export default defineSitemapEventHandler(async (event) => {
  const posts = await queryCollection(event, "blog")
    .where("draft", "<>", true)
    .select("path", "date", "updated", "tags")
    .all();
  const tags = new Set<string>();

  for (const post of posts) {
    for (const tag of post.tags || []) {
      tags.add(tag);
    }
  }

  return [
    ...[...tags]
      .sort((a, b) => a.localeCompare(b, "zh-CN"))
      .map((tag) => ({
        loc: `/tags/${tag}`,
      })),
    ...posts.map((post) => ({
      loc: post.path,
      lastmod: post.updated || post.date,
    })),
  ];
});
