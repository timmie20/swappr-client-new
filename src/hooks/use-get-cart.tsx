import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import { useIsAuthenticated } from "./use-access-token";
import { cartEndpoints } from "@/endpoints/cart";
import { mapServerCartToLocal } from "@/lib/cart";
import { useCartStore } from "@/store/cart-store";

export function useGetCart() {
  const loggedIn = useIsAuthenticated();

  const query = useQuery({
    queryKey: queryKeys.cart.lists(),

    queryFn: async () => {
      if (!loggedIn) return [];

      const res = await cartEndpoints.getCart();

      return mapServerCartToLocal(res.data.items);
    },

    enabled: loggedIn,

    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.data) {
      useCartStore.setState({
        items: query.data,
      });
    }
  }, [query.data]);

  return query;
}
