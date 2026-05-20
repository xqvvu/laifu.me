export default defineSitemapEventHandler(async (event) => {
  const posts = await querySitemapArticles(event);
  const tags = await querySitemapTagUrls(event);

  return [
    ...tags,
    ...posts.map((post) => ({
      loc: post.path,
      lastmod: post.updated || post.date,
    })),
  ];
});
