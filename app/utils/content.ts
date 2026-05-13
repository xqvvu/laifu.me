import readingTimeEstimate from "reading-time/lib/reading-time";

type MarkdownNode = {
  type?: string;
  value?: unknown;
  children?: MarkdownNode[];
  code?: unknown;
};

export type ReadingStats = {
  minutes: number;
  words: number;
  text: string;
  wordCountText: string;
};

export function extractTextFromBody(body: unknown): string {
  const chunks: string[] = [];

  function visit(node: unknown) {
    if (!node || typeof node !== "object") {
      return;
    }

    const current = node as MarkdownNode;

    if (typeof current.value === "string") {
      chunks.push(current.value);
    }

    if (typeof current.code === "string") {
      chunks.push(current.code);
    }

    if (Array.isArray(current.children)) {
      current.children.forEach(visit);
    }
  }

  visit(body);
  return chunks.join(" ").replace(/\s+/g, " ").trim();
}

export function readingStats(body: unknown): ReadingStats {
  const text = extractTextFromBody(body);
  const stats = readingTimeEstimate(text);
  const minutes = Math.max(1, Math.ceil(stats.minutes));
  const words = stats.words;

  return {
    minutes,
    words,
    text: `${minutes} 分钟阅读`,
    wordCountText: `${new Intl.NumberFormat("zh-CN").format(words)} 字`,
  };
}

export function formatDate(value: string, dateStyle: "medium" | "long" = "medium") {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: dateStyle === "long" ? "long" : "short",
    day: "numeric",
  }).format(new Date(value));
}
