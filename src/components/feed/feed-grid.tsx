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
import { Spinner } from "../ui/spinner";
import { TypographyMuted } from "../typography/muted";

type Props = {
  // data: ReturnType<typeof useInfiniteProducts>["data"];
  // isLoading: ReturnType<typeof useInfiniteProducts>["isLoading"];
  // isError: ReturnType<typeof useInfiniteProducts>["isError"];
  limit: number;
  canLoadMore: boolean;
  navigateTo?: string;
};

export function FeedGrid({ limit, canLoadMore, navigateTo }: Props) {
  const feedMode = useFeedStore((s) => s.feedMode);
  const activeSubCategoryId = useFeedStore((s) => s.activeSubCategoryId);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts({
    limit: limit,
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

      {canLoadMore && (
        <div className="mt-10 flex cursor-pointer justify-center">
          {!hasNextPage ? (
            <TypographyMuted className="text-center">
              That’s all we’ve got in this category (for now 👀).
            </TypographyMuted>
          ) : (
            <Button
              onClick={() => void fetchNextPage()}
              variant="outline"
              disabled={isFetchingNextPage}
              size="lg"
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
              {isFetchingNextPage ? (
                <Spinner className="size-6" />
              ) : (
                <Icons.arrowRight size={15} />
              )}
            </Button>
          )}
        </div>
      )}

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
