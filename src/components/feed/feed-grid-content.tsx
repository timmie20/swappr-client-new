"use client";
import { ProductCard } from "./product-card";
import { SkeletonGrid } from "./skeleton-card";
import { EmptyState } from "@/components/empty-state";
import type { Product } from "@/features/feed/types";
import { ErrorState } from "../error-state";

type Cols = 2 | 3 | 4;

const colsClass: Record<Cols, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 min-[410px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
};

interface FeedGridContentProps {
  products: Product[];
  visibleCount: number;
  loading: boolean;
  loadingMore?: boolean;
  canLoadMore?: boolean;
  isError?: boolean;
  onLoadMore?: () => void;
  onProductClick?: (product: Product) => void;
  cols?: Cols;
}

export function FeedGridContent({
  products,
  visibleCount,
  loading,
  // loadingMore = false,
  // canLoadMore = false,
  isError = false,
  // onLoadMore,
  cols = 4,
}: FeedGridContentProps) {
  const visibleProducts = products.slice(0, visibleCount);
  const gridClass = colsClass[cols];

  if (loading) {
    return (
      <div className={`grid w-full gap-3 ${gridClass}`}>
        <SkeletonGrid count={8} />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Could not load listings"
        description="Please check your connection and try again."
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No Listings Found"
        description="No devices match your current filters"
        variant="lottie"
        lottieType="ghost"
      />
    );
  }

  return (
    <>
      <div className={`grid w-full gap-3 ${gridClass}`}>
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* {canLoadMore && (
        <div className="mt-10 flex cursor-pointer justify-center">
          <Button
            onClick={onLoadMore}
            variant="outline"
            disabled={loadingMore}
            size="lg"
          >
            {loadingMore ? "Loading..." : "Load More"}
            {loadingMore ? (
              <Spinner className="size-6" />
            ) : (
              <IconArrowRight size={15} />
            )}
          </Button>
        </div>
      )} */}
    </>
  );
}
