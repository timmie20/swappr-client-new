export const SEARCH_COLLECTION_BADGES = [
  "iphones",
  "androids",
  "ipads",
  "macbooks",
  "laptops",
  "tablets",
  "audios",
  "gaming-consoles",
];

export function formatCollectionLabel(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/^\w/, (c) => (slug.startsWith("i") ? c : c.toUpperCase()))
    .replace(/^(i)(\w)/, (_, i, next) => i + next.toUpperCase());
}
