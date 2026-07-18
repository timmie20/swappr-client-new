"use client";

import { useMemo } from "react";
import { FeedGridHeader } from "./feed-grid-header";
import { FeedGridContent } from "./feed-grid-content";
import { useFeedStore } from "@/store/feed-store";
import { useInfiniteProducts } from "@/hooks";
import { ProductMode } from "@/types/product";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  limit: number;
  canLoadMore: boolean;
  navigateTo?: string;
};

export function FeedGrid({ limit, canLoadMore, navigateTo }: Props) {
  const feedMode = useFeedStore((s) => s.feedMode);
  const activeCategory = useFeedStore((s) => s.activeCategory);

  const {
    products,
    isLoading,
    isFetching,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts({
    limit,
    ...(activeCategory?.slug
      ? { categories: [activeCategory.slug] }
      : undefined),
  });

  // isLoading only fires on the very first request - keepPreviousData means
  // filter changes refetch in the background without wiping the grid.
  const isRefetching = isFetching && !isLoading && !isFetchingNextPage;

  const filteredProducts = useMemo(() => {
    if (feedMode === ProductMode.SALE_SWAP) {
      return products.filter((p) => p.mode === ProductMode.SALE_SWAP);
    }
    if (feedMode === ProductMode.SALE) {
      return products.filter((p) => p.mode === ProductMode.SALE);
    }
    return products;
  }, [feedMode, products]);

  return (
    <section
      id="feed"
      className="mx-auto flex w-full max-w-screen-2xl flex-col items-center px-4 py-8 lg:px-8"
    >
      <FeedGridHeader
        resultCount={filteredProducts.length}
        loading={isLoading}
        isRefetching={isRefetching}
      />

      <div
        className={cn("w-full transition-opacity", isRefetching && "opacity-60")}
      >
        <FeedGridContent
          products={filteredProducts}
          visibleCount={filteredProducts.length}
          loading={isLoading}
          isError={isError}
          canLoadMore={canLoadMore}
          hasNextPage={hasNextPage}
          loadingMore={isFetchingNextPage}
          onLoadMore={fetchNextPage}
        />
      </div>

      {!canLoadMore && (
        <Link href={navigateTo || "#"} className="w-max">
          <Button
            className="mt-10 inline-flex cursor-pointer"
            variant="outline"
          >
            View More <Icons.arrowRight />
          </Button>
        </Link>
      )}
    </section>
  );
}
