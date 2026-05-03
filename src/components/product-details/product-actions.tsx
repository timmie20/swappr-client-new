"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import type { ProductDetail, ProductVariant } from "@/types/product";
import { Icons } from "../icons";
import { mapApiProductToCartItem, useCart } from "@/hooks/use-cart";

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
  const [added, setAdded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const { addItem } = useCart();

  // Determine stock status based on whether product has variants
  const outOfStock = hasVariants
    ? activeVariant
      ? activeVariant.stock_quantity === 0
      : false
    : totalStock === 0;

  // Only show "Select Variant" if product HAS variants but none is selected
  const needsVariantSelection = hasVariants && !activeVariant;

  const handleAddToCart = () => {
    // For products with variants, require variant selection
    if (hasVariants && !activeVariant) return;
    // Don't allow if out of stock
    if (outOfStock) return;

    const itemToAdd = mapApiProductToCartItem({
      product,
      title: title,
      activeVariant: activeVariant,
      quantity: 1,
    });

    addItem(itemToAdd);

    setAdded(true);
    console.log(activeVariant);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3">
      {/* Primary CTA */}
      <Button
        size="lg"
        onClick={handleAddToCart}
        disabled={needsVariantSelection || outOfStock || added}
        className="w-full flex-auto py-6 text-base font-semibold"
        aria-label={
          needsVariantSelection ? "Select a variant first" : "Add to cart"
        }
      >
        <AnimatePresence mode="wait">
          {added ? (
            <motion.span
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <IconCheck size={18} />
              Added to Cart!
            </motion.span>
          ) : (
            <motion.span
              key="cart"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <Icons.cartCopy size={18} />
              {outOfStock ? "Out of Stock" : "Add to Cart"}
            </motion.span>
          )}
        </AnimatePresence>
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
        <Button
          variant="outline"
          size="icon-lg"
          onClick={() => setBookmarked((b) => !b)}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark product"}
        >
          <AnimatePresence mode="wait">
            {bookmarked ? (
              <motion.span
                key="filled"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Icons.bookmarkFilled size={20} className="text-primary" />
              </motion.span>
            ) : (
              <motion.span
                key="empty"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Icons.bookmark size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {needsVariantSelection && (
        <p className="text-center text-xs text-[#9CA3AF]">
          Select a color and storage to continue
        </p>
      )}
    </div>
  );
}
