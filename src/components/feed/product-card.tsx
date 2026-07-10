"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { formatNaira, formatRelativeDate } from "@/lib/format";
import { useFeedStore } from "@/store/feed-store";
import type { Product } from "@/features/feed/types";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { VendorDialog } from "./vendor-dialog";
import { formatStorage } from "@/lib/utils/product-helpers";
import { TypographyH3 } from "../typography/h3";
import { useIsAuthenticated } from "@/lib/auth/session-client";

interface ProductCardProps {
  product: Product;
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

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [imgHovered, setImgHovered] = useState(false);

  const isAuth = useIsAuthenticated();

  const handleNavigate = () => {
    router.push(`/products/${product.slug}`);
  };
  const handleSwapTrigger = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product,
  ) => {
    e.stopPropagation();

    if (!isAuth) {
      const currentUrl = window.location.href;
      router.push(`/auth/sign-in?redirect=${encodeURIComponent(currentUrl)}`);
      return;
    }

    openSwapOffer(product);
  };

  const openSwapOffer = useFeedStore((s) => s.openSwapOffer);

  // const handleAddToCart = () => {
  //   if (product.isSoldOut) return;

  //   addItem({
  //     id: `${product.id}-base`,
  //     productId: product.id,
  //     variantId: null,
  //     title: product.title || product.name,
  //     price: product.price,
  //     quantity: 1,
  //     image: product.imageUrl || product.images?.[0] || "",
  //     condition: mapCondition(product.condition),
  //   });

  //   setIsAdded(true);
  //   setTimeout(() => setIsAdded(false), 2000);
  // };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
    >
      {/* Image area */}
      <div
        className="relative aspect-square cursor-pointer overflow-hidden bg-[#F8F9FA]"
        onClick={handleNavigate}
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
      <div className="flex flex-1 flex-col gap-2 p-3" onClick={handleNavigate}>
        {/* Brand + Condition */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase">
            {product.brand}
          </p>
        </div>

        {/* Title */}
        <TypographyH3 className="line-clamp-2 cursor-pointer text-base leading-tight font-semibold">
          {product.title}
        </TypographyH3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Icons.star size={15} />
          <span className="text-xs font-medium text-[#6B7280]">
            {product.rating.toFixed(2)}{" "}
            <span className="text-[10px]">
              ({product.reviewCount.toLocaleString()})
            </span>
          </span>
        </div>

        {/* storages */}

        {product.storage && product.storage.length > 0 && (
          <div className="flex items-center gap-1">
            {product.storage.map((item) => (
              <Badge
                key={item}
                variant="outline"
                className="text-xs font-medium text-[#6B7280]"
              >
                {formatStorage(item)}
              </Badge>
            ))}
          </div>
        )}

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
          <span className="text-muted-foreground ml-auto shrink-0 text-sm">
            {formatRelativeDate(product.listed_at)}
          </span>
        </div>

        {/* CTAs */}
        <div className="mt-auto flex gap-2 pt-1">
          {product.mode === "sale_swap" && (
            <Button
              variant="secondary"
              className="w-full cursor-pointer"
              onClick={(e) => handleSwapTrigger(e, product)}
            >
              <Icons.exchange size={13} />
              <span className="">Swap</span>
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
