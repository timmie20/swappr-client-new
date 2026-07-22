import { create } from "zustand";
import type { Product } from "@/features/feed/types";
import { ListingMode } from "@/types/product";

/**
 * Bookmark to be used as wishlist/favorites in the feed later on.
 */
interface FeedStore {
  // bookmarks
  // bookMarkIds: Set<string>;
  // toggleBookmarks: (productId: string) => void;
  // isBookMarked: (productId: string) => boolean;

  // Feed filter
  feedMode: ListingMode;
  setFeedMode: (mode: ListingMode) => void;

  // Category

  activeCategory: { slug: string; label: string };
  setActiveCategory: (next: { slug: string; label: string }) => void;

  // Swap offer
  swapOfferProduct: Product | null;
  openSwapOffer: (product: Product) => void;
  closeSwapOffer: () => void;
}

export const useFeedStore = create<FeedStore>((set) => ({
  // bookmarks
  // bookMarkIds: new Set(),
  // toggleBookmarks: (productId) =>
  //   set((state) => {
  //     const next = new Set(state.bookMarkIds);
  //     if (next.has(productId)) {
  //       next.delete(productId);
  //     } else {
  //       next.add(productId);
  //     }
  //     return { bookMarkIds: next };
  //   }),
  // isBookMarked: (productId) => get().bookMarkIds.has(productId),

  // Feed filter
  feedMode: "all",
  setFeedMode: (mode) => set({ feedMode: mode }),

  // Category

  activeCategory: { slug: "", label: "All" },
  setActiveCategory: (next) => set({ activeCategory: next }),

  // Swap offer
  swapOfferProduct: null,
  openSwapOffer: (product) => set({ swapOfferProduct: product }),
  closeSwapOffer: () => set({ swapOfferProduct: null }),
}));
