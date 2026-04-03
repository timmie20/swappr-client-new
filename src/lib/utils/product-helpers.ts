import type {
  ProductDetail,
  ProductVariant,
  SelectedVariant,
} from "@/types/product";

/** All unique colors available across variants */
export function getAvailableColors(variants: ProductVariant[]): string[] {
  return [...new Set(variants.map((v) => v.color))];
}

/** Storage options available for a given color (or all if no color selected) */
export function getAvailableStorage(
  variants: ProductVariant[],
  selectedColor: string | null,
): number[] {
  const filtered = selectedColor
    ? variants.filter((v) => v.color === selectedColor)
    : variants;
  return [...new Set(filtered.map((v) => v.storage))].sort((a, b) => a - b);
}

/** Colors available for a given storage (or all if no storage selected) */
export function getColorsForStorage(
  variants: ProductVariant[],
  selectedStorage: number | null,
): string[] {
  const filtered = selectedStorage
    ? variants.filter((v) => v.storage === selectedStorage)
    : variants;
  return [...new Set(filtered.map((v) => v.color))];
}

/** Find the exact variant matching selected color + storage */
export function getMatchingVariant(
  variants: ProductVariant[],
  selected: SelectedVariant,
): ProductVariant | null {
  if (!selected.color || !selected.storage) return null;
  return (
    variants.find(
      (v) => v.color === selected.color && v.storage === selected.storage,
    ) ?? null
  );
}

/** Check if a color+storage combo exists */
export function isVariantAvailable(
  variants: ProductVariant[],
  color: string,
  storage: number,
): boolean {
  return variants.some(
    (v) => v.color === color && v.storage === storage && v.stock_quantity > 0,
  );
}

/** Check if a color has at least one in-stock variant */
export function isColorInStock(
  variants: ProductVariant[],
  color: string,
): boolean {
  return variants.some((v) => v.color === color && v.stock_quantity > 0);
}

/** Check if a storage has at least one in-stock variant for current color */
export function isStorageInStock(
  variants: ProductVariant[],
  storage: number,
  selectedColor: string | null,
): boolean {
  return variants.some(
    (v) =>
      v.storage === storage &&
      v.stock_quantity > 0 &&
      (selectedColor ? v.color === selectedColor : true),
  );
}

/** Build the dynamic product title */
export function buildProductTitle(
  product: ProductDetail,
  selected: SelectedVariant,
): string {
  const parts: string[] = [product.name];
  if (selected.color) parts.push(selected.color);
  if (selected.storage) parts.push(`${selected.storage}GB`);
  if (product.carrier_status === "unlocked") parts.push("Unlocked");
  return parts.join(" ");
}

/** Format storage number to readable string */
export function formatStorage(gb: number): string {
  if (gb >= 1000) return `${(gb / 1000).toFixed(gb % 1000 === 0 ? 0 : 1)}TB`;
  return `${Math.round(gb)}GB`;
}
/** Map condition enum to a readable label */
export function formatCondition(condition: ProductDetail["condition"]): string {
  const map: Record<ProductDetail["condition"], string> = {
    NEW: "Brand New",
    UK_USED: "UK Used",
    NIGERIAN_USED: "Nigerian Used",
    REFURBISHED: "Refurbished",
  };
  return map[condition] ?? condition;
}

/** Stock status helper */
export function getStockStatus(qty: number): {
  label: string;
  color: string;
} {
  if (qty === 0) return { label: "Out of Stock", color: "text-red-500" };
  if (qty <= 3) return { label: `Only ${qty} left!`, color: "text-amber-500" };
  if (qty <= 10) return { label: `${qty} in stock`, color: "text-amber-500" };
  return { label: "In Stock", color: "text-emerald-600" };
}
