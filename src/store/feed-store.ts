import { create } from "zustand";
import type { Product, CartItem, ColorVariant } from "@/features/feed/types";

interface FeedStore {
  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product, color?: ColorVariant, storage?: string) => void;
  removeFromCart: (productId: string) => void;
  cartCount: () => number;

  // Wishlist
  wishlistIds: Set<string>;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Feed filter
  feedMode: "all" | "buy" | "swap";
  setFeedMode: (mode: "all" | "buy" | "swap") => void;

  // Category
  activeCategory: string;
  setActiveCategory: (cat: string) => void;

  // Swap offer
  swapOfferProduct: Product | null;
  openSwapOffer: (product: Product) => void;
  closeSwapOffer: () => void;

  // Recently added to cart (for UI flash)
  recentlyAddedIds: Set<string>;
  markRecentlyAdded: (productId: string) => void;
}

export const useFeedStore = create<FeedStore>((set, get) => ({
  // Cart
  cartItems: [],
  addToCart: (product, color, storage) => {
    const existing = get().cartItems.find((i) => i.product.id === product.id);
    if (existing) {
      set((state) => ({
        cartItems: state.cartItems.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      }));
    } else {
      set((state) => ({
        cartItems: [
          ...state.cartItems,
          {
            product,
            quantity: 1,
            selectedColor: color,
            selectedStorage: storage,
          },
        ],
      }));
    }
    get().markRecentlyAdded(product.id);
  },
  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i.product.id !== productId),
    })),
  cartCount: () => get().cartItems.reduce((sum, i) => sum + i.quantity, 0),

  // Wishlist
  wishlistIds: new Set(),
  toggleWishlist: (productId) =>
    set((state) => {
      const next = new Set(state.wishlistIds);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return { wishlistIds: next };
    }),
  isWishlisted: (productId) => get().wishlistIds.has(productId),

  // Feed filter
  feedMode: "all",
  setFeedMode: (mode) => set({ feedMode: mode }),

  // Category
  activeCategory: "all",
  setActiveCategory: (cat) => set({ activeCategory: cat }),

  // Swap offer
  swapOfferProduct: null,
  openSwapOffer: (product) => set({ swapOfferProduct: product }),
  closeSwapOffer: () => set({ swapOfferProduct: null }),

  // Recently added
  recentlyAddedIds: new Set(),
  markRecentlyAdded: (productId) => {
    set((state) => {
      const next = new Set(state.recentlyAddedIds);
      next.add(productId);
      return { recentlyAddedIds: next };
    });
    setTimeout(() => {
      set((state) => {
        const next = new Set(state.recentlyAddedIds);
        next.delete(productId);
        return { recentlyAddedIds: next };
      });
    }, 2000);
  },
}));
