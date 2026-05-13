import { queryCollection } from "@nuxt/content/server";

export default defineSitemapEventHandler(async (event) => {
  const posts = await queryCollection(event, "blog")
    .where("draft", "<>", true)
    .select("path", "date", "updated")
    .all();

  return posts.map((post) => ({
    loc: post.path,
    lastmod: post.updated || post.date,
  }));
});
