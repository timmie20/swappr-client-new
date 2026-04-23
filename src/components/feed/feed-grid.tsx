"use client";

import { useMemo } from "react";
import { FeedGridHeader } from "./feed-grid-header";
import { FeedGridContent } from "./feed-grid-content";
import { useFeedStore } from "@/store/feed-store";
import { mapApiProductToFeedProduct, useInfiniteProducts } from "@/hooks";
import { ProductMode } from "@/types/product";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import Link from "next/link";

export function FeedGrid() {
  const feedMode = useFeedStore((s) => s.feedMode);
  const activeSubCategoryId = useFeedStore((s) => s.activeSubCategoryId);

  const {
    data,
    isLoading,
    isError,
    // hasNextPage,
    // fetchNextPage,
    // isFetchingNextPage,
  } = useInfiniteProducts({
    limit: 12,
    ...(activeSubCategoryId
      ? { subcategory_id: activeSubCategoryId }
      : undefined),
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
    if (feedMode === ProductMode.SALE_SWAP) {
      products = products.filter((p) => p.mode === ProductMode.SALE_SWAP);
    } else if (feedMode === ProductMode.SALE) {
      products = products.filter((p) => p.mode === ProductMode.SALE);
    }
    return products;
  }, [feedMode, items]);

  return (
    <section
      id="feed"
      className="mx-auto flex w-full max-w-screen-2xl flex-col items-center px-4 py-8 lg:px-8"
    >
      <FeedGridHeader
        resultCount={filteredProducts.length}
        loading={isLoading}
      />
      <FeedGridContent
        products={filteredProducts}
        visibleCount={filteredProducts.length}
        loading={isLoading}
        isError={isError}
      />
      {/* <FeedGridContent
        products={filteredProducts}
        visibleCount={filteredProducts.length}
        loading={isLoading}
        isError={isError}
        canLoadMore={!!hasNextPage}
        loadingMore={isFetchingNextPage}
        onLoadMore={() => void fetchNextPage()}
      /> */}

      <Link href="/collections">
        <Button className="mt-10 inline-flex cursor-pointer" variant="outline">
          View More <Icons.arrowRight />
        </Button>
      </Link>
    </section>
  );
}
