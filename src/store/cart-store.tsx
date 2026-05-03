import { CartItem } from "@/types/cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (
    productId: string,
    variantId: string | undefined,
    quantity: number,
  ) => void;
  mergeItems: (serverItems: CartItem[]) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find(
          (i) =>
            i.productId === item.productId && i.variantId === item.variantId,
        );
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.productId === item.productId && i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i,
            ),
          }));
        } else {
          set((s) => ({ items: [...s.items, item] }));
        }
      },
      removeItem: (productId, variantId) =>
        set((s) => ({
          items: s.items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId),
          ),
        })),

      updateQuantity: (productId, variantId, quantity) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, quantity }
              : i,
          ),
        })),

      // Merge logic — combine local + server, sum quantities on conflicts
      mergeItems: (serverItems) => {
        const localItems = get().items;
        const merged = [...serverItems];

        localItems.forEach((localItem) => {
          const conflict = merged.find(
            (s) => s.productId === localItem.productId,
          );
          if (conflict) {
            // same product exists in both — sum the quantities
            conflict.quantity += localItem.quantity;
          } else {
            // local-only item — add it to merged
            merged.push(localItem);
          }
        });

        set({ items: merged });
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "swappr-cart", // localStorage key
      // only persist what's needed — not functions
      partialize: (s) => ({ items: s.items }),
    },
  ),
);
