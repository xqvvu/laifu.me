import { readdir, readFile } from "node:fs/promises";
import { basename, join } from "node:path";

export const baseContentRoutes = ["/", "/blog", "/archive", "/about", "/rss.xml", "/sitemap.xml"];

type BlogRouteIndex = {
  posts: string[];
  tags: string[];
};

export async function getBlogRouteIndex(): Promise<BlogRouteIndex> {
  const blogDir = join(process.cwd(), "content/blog");
  const files = (await readdir(blogDir)).filter((file) => file.endsWith(".md")).sort();
  const posts: string[] = [];
  const tags = new Set<string>();

  for (const file of files) {
    const source = await readFile(join(blogDir, file), "utf8");
    const frontMatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || "";

    if (/^draft:\s*true\s*$/m.test(frontMatter)) {
      continue;
    }

    posts.push(`/blog/${basename(file, ".md")}`);

    for (const tag of parseFrontMatterTags(frontMatter)) {
      tags.add(tag);
    }
  }

  return {
    posts,
    tags: [...tags].sort((a, b) => a.localeCompare(b, "zh-CN")),
  };
}

export async function getPrerenderRoutes() {
  const { posts, tags } = await getBlogRouteIndex();

  return [...baseContentRoutes, ...posts, ...tags.map((tag) => `/tags/${tag}`)];
}

function parseFrontMatterTags(frontMatter: string) {
  const inlineTags = frontMatter.match(/^tags:\s*\[(.*)]\s*$/m)?.[1];

  if (inlineTags) {
    return [...inlineTags.matchAll(/["']([^"']+)["']/g)]
      .map((match) => match[1])
      .filter((tag): tag is string => Boolean(tag));
  }

  const blockTags = frontMatter.match(/^tags:\s*\r?\n((?:\s*-\s*.+\r?\n?)+)/m)?.[1];

  if (!blockTags) {
    return [];
  }

  return blockTags
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*-\s*["']?(.+?)["']?\s*$/)?.[1])
    .filter((tag): tag is string => Boolean(tag));
}
