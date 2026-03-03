"use client";

import { motion } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";
import { ProductCard } from "./product-card";
import { SkeletonGrid } from "./skeleton-card";
import { EmptyState } from "@/components/empty-state";
import type { Product } from "@/features/feed/types";

interface FeedGridContentProps {
  products: Product[];
  visibleCount: number;
  loading: boolean;
  onLoadMore: () => void;
}

export function FeedGridContent({
  products,
  visibleCount,
  loading,
  onLoadMore,
}: FeedGridContentProps) {
  const visibleProducts = products.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        <SkeletonGrid count={8} />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <EmptyState
          title="No Listings Found"
          description="No devices match your current filters."
        />
      </motion.div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={onLoadMore}
            className="flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-8 py-3 text-sm font-semibold text-[#1A1A1A] shadow-sm transition-all hover:border-[#1A6B5A] hover:text-[#1A6B5A] hover:shadow"
          >
            Load More
            <IconArrowRight size={15} />
          </button>
        </div>
      )}
    </>
  );
}
