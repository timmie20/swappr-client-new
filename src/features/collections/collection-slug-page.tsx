"use client";

import { cn } from "@/lib/utils";
import { ProductFilterSidebar } from "@/components/product-filter-sidebar";
import { FeedGridContent } from "@/components/feed/feed-grid-content";
import { TypographyH1 } from "@/components/typography/h1";
import { TypographyH3 } from "@/components/typography/h3";
// import { FeedModeToggle } from "@/components/feed/feed-mode-toggle"; // deprecated for now
import { Spinner } from "@/components/ui/spinner";
import { useInfiniteCollectionProducts } from "@/hooks/use-collections";
import { useProductFilters } from "@/hooks/use-product-filters";
import { TypographyP } from "@/components/typography/p";

interface CollectionViewProps {
  slug: string;
}

export function CollectionSlug({ slug }: CollectionViewProps) {
  const { categories, subcategories, brand, condition, minPrice, maxPrice } =
    useProductFilters();

  const {
    collection,
    products,
    facets,
    total,
    isError,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCollectionProducts(slug, {
    limit: 20,
    categories,
    subcategories,
    ...(brand ? { brand } : undefined),
    ...(condition ? { condition } : undefined),
    ...(minPrice != null ? { min_price: minPrice } : undefined),
    ...(maxPrice != null ? { max_price: maxPrice } : undefined),
  });

  // isLoading only fires on the very first request - keepPreviousData means
  // filter changes refetch in the background without wiping the grid/facets.
  const isRefetching = isFetching && !isLoading && !isFetchingNextPage;

  return (
    <section className="mx-auto w-full max-w-screen-2xl px-4 py-6 lg:px-8">
      <TypographyH1 className="text-center">{collection?.name}</TypographyH1>

      <TypographyP className="text-muted-foreground mx-auto max-w-2xl text-center text-balance">
        {collection?.description}
      </TypographyP>

      <div className="mt-10 flex flex-col gap-6 lg:flex-row">
        <ProductFilterSidebar facets={facets} loading={isLoading} />

        {/* Product grid */}
        <div className="flex flex-1 flex-col items-end gap-6">
          <div className="flex w-full items-center justify-between gap-2">
            <TypographyH3 className="text-muted-foreground text-xl">
              {total != null &&
                `${total} available listing${total !== 1 ? "s" : ""}`}
            </TypographyH3>
            <div className="flex items-center gap-2">
              {isRefetching && <Spinner className="size-5 sm:size-6" />}
              {/* <FeedModeToggle /> */}
            </div>
          </div>

          <div
            className={cn(
              "w-full transition-opacity",
              isRefetching && "opacity-60",
            )}
          >
            <FeedGridContent
              products={products}
              visibleCount={products.length}
              loading={isLoading}
              isError={isError}
              canLoadMore={true}
              hasNextPage={hasNextPage}
              loadingMore={isFetchingNextPage}
              onLoadMore={fetchNextPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
