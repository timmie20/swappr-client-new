"use client";

import { useMemo } from "react";
import { FeedGridHeader } from "./feed-grid-header";
import { FeedGridContent } from "./feed-grid-content";
import { useFeedStore } from "@/store/feed-store";
import { mapApiProductToFeedProduct, useInfiniteProducts } from "@/hooks";
import { ProductMode } from "@/types/product";

export function FeedGrid() {
  const feedMode = useFeedStore((s) => s.feedMode);
  const activeCategory = useFeedStore((s) => s.activeCategory);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts({
    limit: 10,
  });

  const items = useMemo(() => {
    const pages = data?.pages ?? [];
    const merged = pages.flatMap((page) => page.products);
    const seen = new Set<string>();
    return merged
      .filter((product) => {
        if (seen.has(product.id)) return false;
        seen.add(product.id);
        return true;
      })
      .map(mapApiProductToFeedProduct);
  }, [data]);

  const filteredProducts = useMemo(() => {
    let products = items;
    if (activeCategory !== "all") {
      const active = activeCategory.toLowerCase();
      products = products.filter(
        (p) =>
          p.category?.toLowerCase() === active ||
          p.subCategory?.toLowerCase() === active ||
          p.name?.toLowerCase().includes(active),
      );
    }
    if (feedMode === ProductMode.SALE_SWAP) {
      products = products.filter((p) => p.mode === ProductMode.SALE_SWAP);
    } else if (feedMode === ProductMode.SALE) {
      products = products.filter((p) => p.mode === ProductMode.SALE);
    }
    return products;
  }, [activeCategory, feedMode, items]);

  return (
    <section
      id="feed"
      className="mx-auto w-full max-w-screen-2xl px-4 py-8 lg:px-8"
    >
      <FeedGridHeader resultCount={filteredProducts.length} />
      <FeedGridContent
        products={filteredProducts}
        visibleCount={filteredProducts.length}
        loading={isLoading}
        isError={isError}
        canLoadMore={!!hasNextPage}
        loadingMore={isFetchingNextPage}
        onLoadMore={() => void fetchNextPage()}
      />
    </section>
  );
}
