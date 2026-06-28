"use client";

import ProductFilter from "@/components/product-filter";
import { FeedGridContent } from "@/components/feed/feed-grid-content";
import { TypographyH1 } from "@/components/typography/h1";
import { FeedModeToggle } from "@/components/feed/feed-mode-toggle";
import { useInfiniteCollectionProducts } from "@/hooks/use-collections";
import { TypographyP } from "@/components/typography/p";

interface CollectionViewProps {
  slug: string;
}

export function CollectionSlug({ slug }: CollectionViewProps) {
  const {
    collection,
    products,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCollectionProducts(slug, {
    limit: 20,
  });

  return (
    <section className="mx-auto w-full max-w-screen-2xl px-4 py-6 xl:px-0">
      <TypographyH1 className="text-center">{collection?.name}</TypographyH1>

      <TypographyP className="text-center">
        {collection?.description}
      </TypographyP>

      <div className="mt-10 flex flex-col gap-6 lg:flex-row">
        {/* Sidebar filter */}
        <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:max-h-[calc(100vh-10rem)] lg:min-h-100 lg:w-64 lg:overflow-y-auto">
          <ProductFilter />
        </aside>

        {/* Product grid */}
        <div className="flex flex-1 flex-col items-end gap-6">
          <FeedModeToggle />

          <FeedGridContent
            products={products}
            visibleCount={products.length}
            loading={isLoading}
            cols={3}
            isError={isError}
            canLoadMore={true}
            hasNextPage={hasNextPage}
            loadingMore={isFetchingNextPage}
            onLoadMore={fetchNextPage}
          />
        </div>
      </div>
    </section>
  );
}
