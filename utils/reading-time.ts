import readingTimeEstimate from "reading-time";

type MarkdownElement = [tag: string, props: Record<string, unknown>, ...children: unknown[]];

export type ReadingStats = {
  minutes: number;
  words: number;
  text: string;
  wordCountText: string;
};

const WORD_PATTERN =
  /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]|[\p{L}\p{N}_]+/gu;
const wordCountFormatter = new Intl.NumberFormat("zh-CN");
const ignoredTextTags = new Set(["script", "style"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isMarkdownElement(node: unknown[]): node is MarkdownElement {
  return typeof node[0] === "string" && isRecord(node[1]);
}

function collectText(node: unknown, chunks: string[]) {
  if (typeof node === "string") {
    chunks.push(node);
    return;
  }

  if (Array.isArray(node)) {
    collectTextFromArray(node, chunks);
    return;
  }

  if (isRecord(node)) {
    collectTextFromObject(node, chunks);
  }
}

function collectTextFromArray(node: unknown[], chunks: string[]) {
  if (!isMarkdownElement(node)) {
    node.forEach((child) => collectText(child, chunks));
    return;
  }

  const [tag, props, ...children] = node;

  if (ignoredTextTags.has(tag)) {
    return;
  }

  if (typeof props.code === "string") {
    chunks.push(props.code);
    return;
  }

  children.forEach((child) => collectText(child, chunks));
}

function collectTextFromObject(node: Record<string, unknown>, chunks: string[]) {
  if (typeof node.tag === "string" && ignoredTextTags.has(node.tag)) {
    return;
  }

  if (typeof node.value === "string") {
    chunks.push(node.value);
  } else if (Array.isArray(node.value)) {
    node.value.forEach((child) => collectText(child, chunks));
  }

  if (typeof node.code === "string") {
    chunks.push(node.code);
  }

  if (Array.isArray(node.children)) {
    node.children.forEach((child) => collectText(child, chunks));
  }
}

function extractTextFromBody(body: unknown) {
  const chunks: string[] = [];
  collectText(body, chunks);
  return chunks.join(" ").replace(/\s+/g, " ").trim();
}

function countWords(text: string) {
  const matches = text.match(WORD_PATTERN);
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
    wordCountText: `${wordCountFormatter.format(words)} 字`,
  };
}
