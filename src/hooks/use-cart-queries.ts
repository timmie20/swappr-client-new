import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { cartEndpoints } from "@/endpoints/cart";
import { queryKeys } from "@/lib/api/query-keys";
import { useIsAuthenticated } from "./use-access-token";
import { CartItem } from "@/types/cart";
import { toast } from "sonner";

export const isIdenticalItem = (
  a: CartItem,
  b: { product_id: string; variant_id: string | null },
) => {
  return (
    a.product_id === b.product_id &&
    (a.variant_id == null
      ? b.variant_id == null
      : a.variant_id === b.variant_id)
  );
};

export const mutationKeys = {
  cart: {
    updateQuantity: () => ["cart", "update-quantity"] as const,

    removeItem: () => ["cart", "remove-item"] as const,

    clear: () => ["cart", "clear"] as const,

    add: () => ["cart", "add"] as const,
  },
};

export function useGetCart() {
  const loggedIn = useIsAuthenticated();

  return useQuery({
    queryKey: queryKeys.cart.lists(),

    enabled: loggedIn,

    staleTime: Infinity,

    queryFn: async () => {
      const res = await cartEndpoints.getCart();

      return res.data.items;
    },
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartEndpoints.addToCart,

    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.cart.lists(),
      });

      const previousCart = queryClient.getQueryData(queryKeys.cart.lists());

      queryClient.setQueryData(
        queryKeys.cart.lists(),
        (old: CartItem[] = []) => {
          const existing = old.find((item) =>
            isIdenticalItem(item, {
              product_id: payload.product_id,
              variant_id: payload.variant_id,
            }),
          );

          if (existing) {
            return old.map((item) => {
              if (
                item.product_id === payload.product_id &&
                item.variant_id === payload.variant_id
              ) {
                return {
                  ...item,
                  quantity: item.quantity + payload.quantity,
                };
              }

              return item;
            });
          }

          return [
            ...old,
            {
              ...payload,
              quantity: payload.quantity,
            },
          ];
        },
      );

      return {
        previousCart,
      };
    },

    onError: (_err, _variables, context) => {
      queryClient.setQueryData(queryKeys.cart.lists(), context?.previousCart);
      toast.error("Failed to add item to cart.", {
        description: _err.message,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cart.lists(),
      });

      toast.success("Item added to cart.");
    },
  });
}

export function useUpdateCartQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartEndpoints.updateCartItem,

    mutationKey: mutationKeys.cart.updateQuantity(),

    onMutate: async ({
      itemId,
      increment,
    }: {
      itemId: string;
      increment: number;
    }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.cart.lists(),
      });

      const previousCart = queryClient.getQueryData<CartItem[]>(
        queryKeys.cart.lists(),
      );

      queryClient.setQueryData<CartItem[]>(queryKeys.cart.lists(), (old = []) =>
        old.map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + increment),
              }
            : item,
        ),
      );

      return { previousCart };
    },

    onError: (_err, _variables, context) => {
      queryClient.setQueryData(queryKeys.cart.lists(), context?.previousCart);

      toast.error("Failed to update cart item.", {
        description: _err.message,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cart.lists(),
      });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartEndpoints.removeCartItem,

    onMutate: async (itemId) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.cart.lists(),
      });

      const previousCart = queryClient.getQueryData(queryKeys.cart.lists());

      queryClient.setQueryData(queryKeys.cart.lists(), (old: CartItem[] = []) =>
        old.filter((item) => item.id !== itemId),
      );

      return {
        previousCart,
      };
    },

    onError: (_err, _variables, context) => {
      queryClient.setQueryData(queryKeys.cart.lists(), context?.previousCart);
      toast.error("Failed to remove item from cart.", {
        description: _err.message,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cart.lists(),
      });

      toast.success("Item removed from cart.");
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartEndpoints.clearCart,

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.cart.lists(),
      });

      const previousCart = queryClient.getQueryData(queryKeys.cart.lists());

      queryClient.setQueryData(queryKeys.cart.lists(), []);

      return {
        previousCart,
      };
    },

    onError: (_err, _variables, context) => {
      queryClient.setQueryData(queryKeys.cart.lists(), context?.previousCart);
      toast.error("Failed to clear cart.", {
        description: _err.message,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cart.lists(),
      });

      toast.success("Cart cleared.");
    },
  });
}
