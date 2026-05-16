export function formatDate(value: string, dateStyle: "medium" | "long" = "medium") {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: dateStyle === "long" ? "long" : "short",
    day: "numeric",
  }).format(new Date(value));
}
