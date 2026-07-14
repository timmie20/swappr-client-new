"use client";

import { Button } from "@/components/ui/button";
import type { ProductDetail, ProductVariant } from "@/types/product";
import { Icons } from "../icons";
import { Spinner } from "../ui/spinner";
import { useCart } from "@/features/cart/hooks/use-cart";
import { useIsAuthenticated } from "@/lib/auth/session-client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ProductActionsProps {
  activeVariant: ProductVariant | null;
  hasVariants: boolean;
  isSwappable: boolean;
  totalStock: number;
  product: ProductDetail;
  title: string;
}

export function ProductActions({
  activeVariant,
  hasVariants,
  isSwappable,
  totalStock,
  product,
  title,
}: ProductActionsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { addToCart, isAddingToCart } = useCart();

  const isLoggedIn = useIsAuthenticated();

  const currentPath = `${pathname}${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;

  // Determine stock status based on whether product has variants
  const outOfStock = hasVariants
    ? activeVariant
      ? activeVariant.stock_quantity === 0
      : false
    : totalStock === 0;

  // Only show "Select Variant" if product HAS variants but none is selected
  const needsVariantSelection = hasVariants && !activeVariant;

  const handleAddToCart = () => {
    // null = session still loading; ignore the click rather than
    // bouncing a possibly logged-in user to sign-in
    if (isLoggedIn === null) return;
    if (!isLoggedIn) {
      router.replace(`/sign-in?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    // For products with variants, require variant selection
    if (hasVariants && !activeVariant) return;
    // Don't allow if out of stock
    if (outOfStock) return;
    if (isAddingToCart) return;

    // const itemToAdd = mapApiProductToCartItem({
    //   product,
    //   title: title,
    //   activeVariant: activeVariant,
    //   quantity: 1,
    // });

    addToCart({
      product_id: product.id,
      variant_id: activeVariant ? activeVariant.id : null,
      quantity: 1,
      title: title,
      vendor_id: product.vendor.id,
    });
  };

  return (
    <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3">
      {/* Primary CTA */}
      <Button
        size="lg"
        onClick={handleAddToCart}
        disabled={needsVariantSelection || outOfStock || isAddingToCart}
        className="w-full flex-auto cursor-pointer py-6 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={
          needsVariantSelection
            ? "Select a variant first"
            : outOfStock
              ? "Out of stock"
              : isAddingToCart
                ? "Adding to cart"
                : "Add to cart"
        }
      >
        <span className="flex items-center gap-2">
          {isAddingToCart ? <Spinner /> : <Icons.cartCopy size={18} />}
          {outOfStock
            ? "Out of Stock"
            : needsVariantSelection
              ? "Select Variant"
              : isAddingToCart
                ? "Adding to cart"
                : "Add to Cart"}
        </span>
      </Button>

      {/* Secondary row: Swap + Bookmark */}
      <div className="flex gap-3">
        {isSwappable && (
          <Button
            variant="outline"
            size="lg"
            className="flex-1 py-6 text-base font-semibold"
            aria-label="Swap this device"
          >
            <Icons.exchange size={18} />
            Swap Device
          </Button>
        )}
      </div>

      {needsVariantSelection && (
        <p className="text-center text-xs text-[#9CA3AF]">
          Select a color and storage to continue
        </p>
      )}
    </div>
  );
}
