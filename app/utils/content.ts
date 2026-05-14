import readingTimeEstimate from "reading-time";

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
    if (typeof node === "string") {
      chunks.push(node);
      return;
    }

    if (!node || typeof node !== "object") {
      return;
    }

    if (Array.isArray(node)) {
      const [tag, props, ...children] = node;

      if (typeof tag === "string" && props && typeof props === "object" && !Array.isArray(props)) {
        const nodeProps = props as MarkdownNode;

        if (typeof nodeProps.code === "string") {
          chunks.push(nodeProps.code);
          return;
        }

        children.forEach(visit);
        return;
      }

      node.forEach(visit);
      return;
    }

    const current = node as MarkdownNode;

    if (typeof current.value === "string") {
      chunks.push(current.value);
    }

    if (Array.isArray(current.value)) {
      current.value.forEach(visit);
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

function countWords(text: string) {
  const matches = text.match(
    /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]|[\p{L}\p{N}_]+/gu,
  );
  return matches?.length || 0;
}

export function readingStats(body: unknown): ReadingStats {
  const text = extractTextFromBody(body);
  const stats = readingTimeEstimate(text);
  const minutes = Math.max(1, Math.ceil(stats.minutes));
  const words = countWords(text);

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
