import { useCartStore } from "@/store/cart-store";
import { cartEndpoints } from "@/endpoints/cart";
import { useIsAuthenticated } from "@/hooks/use-access-token";
import { convertToServerPayload, mapServerCartToLocal } from "@/lib/cart";
import { useQuery } from "@tanstack/react-query";

export function useCartSync() {
  const mergeItems = useCartStore((s) => s.mergeItems);
  const hasHydrated = useCartStore((s) => s.hasHydrated);
  const isAuthenticated = useIsAuthenticated();

  return useQuery({
    queryKey: ["cart", "sync"],
    queryFn: async () => {
      const serverCart = await cartEndpoints.getCart();

      const mergedItems = mergeItems(serverCart.data.items);

      // nothing to sync — server cart is already source of truth
      if (!mergedItems) {
        return [];
      }

      const synced = await cartEndpoints.syncCart(
        convertToServerPayload(mergedItems),
      );

      // always overwrite with server response — server ids are source of truth
      const mapped = mapServerCartToLocal(synced.data);
      useCartStore.setState({ items: mapped });

      return mapped;
    },
    enabled: isAuthenticated && hasHydrated,
    staleTime: Infinity,
    refetchOnWindowFocus: false, // ← prevent sync on tab refocus
    refetchOnMount: false, // ← prevent sync on every page mount
    refetchOnReconnect: false, // ← prevent sync on network reconnect
  });
}
