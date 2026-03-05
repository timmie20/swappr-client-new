"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconCheck,
  IconBookmark,
  IconBookmarkFilled,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import type { ProductVariant } from "@/types/product";
import { Icons } from "../icons";

interface ProductActionsProps {
  activeVariant: ProductVariant | null;
  isSwappable: boolean;
  productId: string;
}

export function ProductActions({
  activeVariant,
  isSwappable,
}: ProductActionsProps) {
  const [added, setAdded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const outOfStock = activeVariant ? activeVariant.stock_quantity === 0 : false;
  const noVariant = !activeVariant;

  const handleAddToCart = () => {
    if (!activeVariant || outOfStock) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-3">
      {/* Primary CTA */}
      <Button
        size="lg"
        onClick={handleAddToCart}
        disabled={noVariant || outOfStock || added}
        className="w-full py-6 text-base font-semibold"
        aria-label={noVariant ? "Select a variant first" : "Add to cart"}
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
              {outOfStock
                ? "Out of Stock"
                : noVariant
                  ? "Select a Variant"
                  : "Add to Cart"}
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
          className="px-5"
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

      {noVariant && (
        <p className="text-center text-xs text-[#9CA3AF]">
          Select a color and storage to continue
        </p>
      )}
    </div>
  );
}
