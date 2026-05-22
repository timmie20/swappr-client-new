import { mapServerCartToLocal, mergeCartItems } from "@/lib/cart";
import { CartItem, LocalCartItem } from "@/types/cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartStore = {
  items: LocalCartItem[];
  setItems: (items: LocalCartItem[]) => void;
  addItem: (item: LocalCartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  mergeItems: (serverItems: CartItem[]) => LocalCartItem[] | void;
  clearCart: () => void;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),

      setItems: (items) => set({ items }),

      addItem: (item) => {
        const existing = get().items.find(
          (i) =>
            // i.productId === item.productId && i.variantId === item.variantId,
            i.id === item.id,
        );
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              // i.productId === item.productId && i.variantId === item.variantId
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i,
            ),
          }));
        } else {
          set((s) => ({ items: [...s.items, item] }));
        }
      },

      updateQuantity: (itemId, quantity) =>
        set((s) => ({
          items: s.items.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
        })),

      removeItem: (itemId) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== itemId) })),

      // Merge logic — combine local + server, sum quantities on conflicts
      mergeItems: (serverItems: CartItem[]) => {
        const localItems = get().items;
        const serverMapped = mapServerCartToLocal(serverItems);

        if (localItems.length === 0) {
          set({ items: serverMapped });
          return;
        }
        const merged = mergeCartItems(serverMapped, localItems);
        return merged;
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "swappr-cart",
      partialize: (s) => ({ items: s.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
