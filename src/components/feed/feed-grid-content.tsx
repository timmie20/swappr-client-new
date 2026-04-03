"use client";

import { motion } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";
import { ProductCard } from "./product-card";
import { SkeletonGrid } from "./skeleton-card";
import { EmptyState } from "@/components/empty-state";
import type { Product } from "@/features/feed/types";
import { Button } from "../ui/button";

type Cols = 2 | 3 | 4;

const colsClass: Record<Cols, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
};

interface FeedGridContentProps {
  products: Product[];
  visibleCount: number;
  loading: boolean;
  loadingMore?: boolean;
  canLoadMore?: boolean;
  isError?: boolean;
  onLoadMore: () => void;
  onProductClick?: (product: Product) => void;
  cols?: Cols;
}

export function FeedGridContent({
  products,
  visibleCount,
  loading,
  loadingMore = false,
  canLoadMore = false,
  isError = false,
  onLoadMore,
  cols = 4,
}: FeedGridContentProps) {
  const visibleProducts = products.slice(0, visibleCount);
  const gridClass = colsClass[cols];

  if (loading) {
    return (
      <div className={`grid gap-3 ${gridClass}`}>
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
          title={isError ? "Could not load listings" : "No Listings Found"}
          description={
            isError
              ? "Please check your connection and try again."
              : "No devices match your current filters."
          }
        />
      </motion.div>
    );
  }

  return (
    <>
      <div className={`grid gap-3 ${gridClass}`}>
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {canLoadMore && (
        <div className="mt-10 flex cursor-pointer justify-center">
          <Button onClick={onLoadMore} variant="outline" disabled={loadingMore}>
            {loadingMore ? "Loading..." : "Load More"}
            <IconArrowRight size={15} />
          </Button>
        </div>
      )}
    </>
  );
}
