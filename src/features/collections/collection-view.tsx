"use client";

import { useState, useMemo } from "react";
import ProductFilter from "@/components/product-filter";
import { FeedGridContent } from "@/components/feed/feed-grid-content";
import { ProductDetailModal } from "@/components/feed/product-detail-modal";
import { TypographyH1 } from "@/components/typography/h1";
import { MOCK_PRODUCTS } from "@/features/feed/mock-data";
import type { Product } from "@/features/feed/types";
import { FeedModeToggle } from "@/components/feed/feed-mode-toggle";

interface CollectionViewProps {
  slug: string;
}

const formatSlug = (slug: string) => {
  if (slug === "apple-iphone") return "iPhones";

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function CollectionView({ slug }: CollectionViewProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const loading = false;

  const products = useMemo(() => MOCK_PRODUCTS, []);

  return (
    <>
      <section className="mx-auto w-full max-w-screen-2xl px-4 py-6 xl:px-0">
        <TypographyH1>{formatSlug(slug)}</TypographyH1>

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
              loading={loading}
              onLoadMore={() => {}}
              onProductClick={setSelectedProduct}
              cols={3}
            />
          </div>
        </div>
      </section>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
