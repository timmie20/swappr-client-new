// hooks/use-cart-hydrate.ts

/**
 * useCartHydrate stays idle for the vast majority of sessions
 * since items.length === 0 will be false after useCartSync runs.
 * It only activates as a fallback when the local store genuinely has nothing.
 */

/**
 * app mounts
    ↓
useCartSync fires → merges → sets store
    ↓
syncCompleted becomes true
    ↓
useCartHydrate checks → items.length > 0 → enabled: false → stays idle ✅

OR

useCartSync fires → store still empty after sync
    ↓
syncCompleted becomes true
    ↓
useCartHydrate checks → items.length === 0 → enabled: true → fetches ✅
 */

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCartStore } from "@/store/cart-store";
import { useIsAuthenticated } from "@/lib/auth/session-client";
import { cartEndpoints } from "@/endpoints/cart";
import { mapServerCartToLocal } from "@/lib/cart";

export function useCartHydrate() {
  const isAuthenticated = useIsAuthenticated();
  const items = useCartStore((s) => s.items);
  const hasHydrated = useCartStore((s) => s.hasHydrated);

  // check if sync has already completed
  const syncCompleted = !!useQueryClient().getQueryState(["cart", "sync"])
    ?.dataUpdatedAt;

  return useQuery({
    queryKey: ["cart", "hydrate"],
    queryFn: async () => {
      const res = await cartEndpoints.getCart();
      const mapped = mapServerCartToLocal(res.data.items);
      useCartStore.setState({ items: mapped });
      console.log("Hydrated cart with server data:", mapped);
      return mapped;
    },
    // only fetch if logged in AND local store is empty
    enabled:
      isAuthenticated === true &&
      hasHydrated &&
      syncCompleted &&
      items.length === 0,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
