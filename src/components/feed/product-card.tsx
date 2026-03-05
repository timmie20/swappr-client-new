"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconShoppingCart, IconStar, IconCheck } from "@tabler/icons-react";
import { formatNaira } from "@/lib/format";
import { useFeedStore } from "@/store/feed-store";
import type { Product } from "@/features/feed/types";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { VendorDialog } from "./vendor-dialog";

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

function ConditionPill({ condition }: { condition: Product["condition"] }) {
  const styles: Record<Product["condition"], string> = {
    New: "bg-emerald-100 text-emerald-700",
    "UK Used": "bg-indigo-100 text-indigo-700",
    "Nigerian Used": "bg-[#1A6B5A] text-white",
    Refurbished: "bg-purple-50 text-purple-700",
  };
  return (
    <Badge className={cn("text-xs font-semibold uppercase", styles[condition])}>
      {condition}
    </Badge>
  );
}

// function BadgeTag({ product }: { product: Product }) {
//   if (!product.badge || product.badge === "sold-out") return null;

//   const configs = {
//     sale: {
//       label: "SALE",
//       className: "bg-[#F59E0B] text-white",
//     },
//     "deal-of-week": {
//       label: "🔥 DEAL",
//       className: "bg-[#1A6B5A] text-white",
//     },
//     new: {
//       label: "NEW",
//       className: "bg-[#7C3AED] text-white",
//     },
//   };

//   const config = configs[product.badge as keyof typeof configs];
//   if (!config) return null;

//   return (
//     <span
//       className={cn(
//         "rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase",
//         config.className,
//       )}
//     >
//       {config.label}
//     </span>
//   );
// }

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  const [imgHovered, setImgHovered] = useState(false);

  const toggleWishlist = useFeedStore((s) => s.toggleWishlist);
  const isWishlisted = useFeedStore((s) => s.isWishlisted)(product.id);
  const addToCart = useFeedStore((s) => s.addToCart);
  const recentlyAddedIds = useFeedStore((s) => s.recentlyAddedIds);
  const openSwapOffer = useFeedStore((s) => s.openSwapOffer);
  const isAdded = recentlyAddedIds.has(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col overflow-hidden rounded-4xl border border-[#E5E7EB] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
    >
      {/* Image area */}
      <div
        className="relative aspect-square cursor-pointer overflow-hidden bg-[#F8F9FA]"
        onClick={() => onProductClick?.(product)}
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
      >
        <motion.img
          src={product.imageUrl}
          alt={product.title}
          animate={{ scale: imgHovered ? 1.05 : 1 }}
          transition={{ duration: 0.35 }}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        <div className="absolute top-2 left-2">
          <ConditionPill condition={product.condition} />
        </div>

        {/* Sold out overlay */}
        {product.isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <span className="rounded-lg bg-white/90 px-4 py-2 text-sm font-bold text-[#6B7280] shadow">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        {/* Brand + Condition */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase">
            {product.brand}
          </p>
        </div>

        {/* Title */}
        <h3
          className="line-clamp-2 cursor-pointer text-base leading-tight font-semibold text-[#1A1A1A] transition-colors hover:text-[#1A1A1A]/75"
          onClick={() => onProductClick?.(product)}
        >
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <IconStar size={15} />
          <span className="text-xs font-medium text-[#6B7280]">
            {product.rating.toFixed(2)}{" "}
            <span className="text-[10px]">
              ({product.reviewCount.toLocaleString()})
            </span>
          </span>
        </div>

        {/* Price */}
        <div className="font-inter flex flex-wrap items-baseline gap-1.5">
          <span className="text-base font-bold text-[#1A1A1A]">
            {formatNaira(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#9CA3AF] line-through">
              {formatNaira(product.originalPrice)}
            </span>
          )}
          {product.savingsPercent && (
            <span className="rounded-full bg-[#FFF7ED] px-2 py-0.5 text-[10px] font-bold text-[#F4762A]">
              Save {product.savingsPercent}%
            </span>
          )}
        </div>

        {/* Seller info */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <VendorDialog product={product} />
          <span className="text-muted-foreground ml-auto shrink-0 text-[11px]">
            {product.listedAgo}
          </span>
        </div>

        {/* CTAs */}
        <div className="mt-auto flex gap-2 pt-1">
          <Button
            disabled={!!product.isSoldOut}
            onClick={() => addToCart(product, product.colors?.[0])}
            className={cn(
              "flex flex-1 cursor-pointer items-center justify-center gap-1.5 text-sm font-semibold transition-all",
            )}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.div
                  key="added"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1"
                >
                  <IconCheck size={13} />
                  Added
                </motion.div>
              ) : (
                <motion.div
                  key="cart"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1"
                >
                  <IconShoppingCart size={13} />
                  {product.isSoldOut ? "Sold Out" : "Add to Cart"}
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          {(product.mode === "swap" || product.mode === "both") && (
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => openSwapOffer(product)}
            >
              <Icons.exchange size={13} />
              <span className="hidden sm:inline">Swap</span>
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="cursor-pointer"
          >
            {isWishlisted ? (
              <Icons.bookmarkFilled size={24} className="text-black" />
            ) : (
              <Icons.bookmark size={24} />
            )}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
