"use client";

import { useState, useMemo } from "react";
import { FeedGridHeader } from "./feed-grid-header";
import { FeedGridContent } from "./feed-grid-content";
import { MOCK_PRODUCTS } from "@/features/feed/mock-data";
import { useFeedStore } from "@/store/feed-store";

export function FeedGrid() {
  const [loading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const feedMode = useFeedStore((s) => s.feedMode);
  const activeCategory = useFeedStore((s) => s.activeCategory);

  const filteredProducts = useMemo(() => {
    let products = MOCK_PRODUCTS;
    if (activeCategory !== "all") {
      products = products.filter((p) => p.category === activeCategory);
    }
    if (feedMode === "buy") {
      products = products.filter((p) => p.mode === "buy" || p.mode === "both");
    } else if (feedMode === "swap") {
      products = products.filter((p) => p.mode === "swap" || p.mode === "both");
    }
    return products;
  }, [activeCategory, feedMode]);

  return (
    <section
      id="feed"
      className="mx-auto w-full max-w-screen-2xl px-4 py-8 lg:px-8"
    >
      <FeedGridHeader resultCount={filteredProducts.length} />
      <FeedGridContent
        products={filteredProducts}
        visibleCount={visibleCount}
        loading={loading}
        onLoadMore={() => setVisibleCount((c) => c + 8)}
      />
    </section>
  );
}
