"use client";

import { motion } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";
import { useFeedStore } from "@/store/feed-store";
import { DEAL_OF_WEEK_PRODUCTS } from "@/features/feed/mock-data";
import { formatNaira } from "@/lib/format";
import { Icons } from "../icons";
import { TypographyMuted } from "../typography/muted";
import { TypographyH2 } from "../typography/h2";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function DealOfWeekSection() {
  const openSwapOffer = useFeedStore((s) => s.openSwapOffer);
  const addToCart = useFeedStore((s) => s.addToCart);

  return (
    <section className="bg-linear-to-br from-[#F0FAF7] via-white to-[#FFF7ED] py-10">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        {/* Section header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-start gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4762A]/10">
              <Icons.flame size={18} className="text-[#F4762A]" />
            </div>
            <div>
              <TypographyH2 className="font-inter border-0">
                Deals of the Week
              </TypographyH2>
              <TypographyMuted>
                No promo code needed · Limited time offers
              </TypographyMuted>
            </div>
          </div>
          <Button
            className="text-accent-foreground hidden cursor-pointer text-sm font-semibold sm:inline-flex"
            variant="link"
          >
            View All
            <IconArrowRight size={14} />
          </Button>
        </div>

        {/* Deals grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {DEAL_OF_WEEK_PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            >
              {/* Deal badge */}
              <div className="absolute top-2 left-2 z-10">
                <div className="flex size-6 items-center justify-center rounded-full bg-[#F4762A]/35">
                  <Icons.flame size={12} className="text-[#F4762A]" />
                </div>
              </div>

              {/* Product image */}
              <div className="relative aspect-square overflow-hidden bg-[#F8F9FA]">
                <motion.img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase">
                  {product.brand}
                </p>
                <h3 className="font-inter mt-0.5 line-clamp-1 text-sm font-bold text-[#1A1A1A]">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="font-inter flex items-baseline gap-1.5 font-medium text-[#08161F6B]">
                  <span className="text-sm">from</span>
                  <span className="text-muted-foreground text-base font-bold">
                    {formatNaira(product.price)}
                  </span>
                </div>
                {product.originalPrice && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-[#9CA3AF] line-through">
                      {formatNaira(product.originalPrice)}
                    </span>
                    <span className="rounded-full bg-[#FFF7ED] px-1.5 py-0.5 text-[10px] font-bold text-[#F4762A]">
                      -{product.savingsPercent}%
                    </span>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-3 flex gap-2">
                  <Button onClick={() => addToCart(product)}>
                    <Icons.cartCopy size={18} />
                    Run am
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-4 flex justify-center sm:hidden">
          <button className="flex items-center gap-1 text-sm font-semibold text-[#1A6B5A]">
            View All Deals
            <IconArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
