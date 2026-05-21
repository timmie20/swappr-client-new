import { AddCartItemPayload, CartItem, LocalCartItem } from "@/types/cart";
import { ProductDetail, ProductVariant } from "@/types/product";

export function isSameLine(
  a: Pick<LocalCartItem, "productId" | "variantId">,
  b: Pick<LocalCartItem, "productId" | "variantId">,
) {
  return (
    a.productId === b.productId &&
    (a.variantId == null ? b.variantId == null : a.variantId === b.variantId)
  );
}

export function mapServerCartItemToCartItem(item: CartItem): LocalCartItem {
  const product = item.product;

  return {
    id: item?.id,
    productId: item.product_id,
    variantId: item.variant_id,
    title: item.title || product?.name || "Unknown Product",
    price: item.price_at_add,
    image: product?.images?.[0] ?? "",
    quantity: item.quantity,
    color: item.variant?.color,
    storage: item.variant?.storage || undefined,
    condition: product?.condition,
    vendorId: item.vendor?.id,
    businessName: item.vendor?.business_name,
  };
}

export function mapServerCartToLocal(items: CartItem[]): LocalCartItem[] {
  return items.map(mapServerCartItemToCartItem);
}

export function convertToServerPayload(
  items: LocalCartItem[],
): AddCartItemPayload[] {
  return items.map((item) => ({
    product_id: item.productId,
    variant_id: item.variantId ?? null,
    quantity: item.quantity,
    title: item.title,
    vendor_id: item.vendorId, // This would need to be determined based on the product data, which isn't included in LocalCartItem
  }));
}

// export function findCartItem(
//   items: CartItem[],
//   productId: string,
//   variantId: string | null,
// ): CartItem | undefined {
//   return items.find((i) => isSameLine(i, { productId, variantId }));
// }

export function mergeCartItems(
  serverItems: LocalCartItem[],
  localItems: LocalCartItem[],
): LocalCartItem[] {
  const merged = [...serverItems];

  for (const localItem of localItems) {
    const conflict = merged.find((s) => isSameLine(s, localItem));
    if (conflict) {
      conflict.quantity += localItem.quantity;
    } else {
      merged.push(localItem);
    }
  }

  return merged;
}

export function mapApiProductToCartItem({
  product,
  title,
  activeVariant,
  quantity,
}: {
  product: ProductDetail;
  title: string;
  activeVariant: ProductVariant | null;
  quantity: number;
}): LocalCartItem {
  return {
    id: `${product.id}-${activeVariant ? activeVariant.id : "base"}`,
    productId: product.id,
    variantId: activeVariant ? activeVariant.id : null,
    title: title,
    price: activeVariant
      ? Number(activeVariant.price)
      : Number(product.base_price),
    quantity: quantity,
    image: product.images[0] ?? "",
    color: activeVariant ? activeVariant.color : undefined,
    storage: activeVariant ? activeVariant.storage : undefined,
    condition: product.condition,
    vendorId: product.vendor.id,
    businessName: product.vendor.business_name,
  };
}
