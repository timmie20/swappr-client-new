import { useMemo } from "react";

import {
  useAddToCart,
  useClearCart,
  useGetCart,
  useRemoveCartItem,
  useUpdateCartQuantity,
} from "./use-cart-queries";
import { mapServerCartToLocal } from "@/lib/cart";

export function useCart() {
  const { data = [], isLoading, isFetching } = useGetCart();

  const items = useMemo(() => {
    return mapServerCartToLocal(data);
  }, [data]);

  const addToCartMutation = useAddToCart();
  const removeItemMutation = useRemoveCartItem();
  const updateQuantityMutation = useUpdateCartQuantity();
  const clearCartMutation = useClearCart();

  const totalItems = useMemo(() => {
    return items.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [items]);

  return {
    items,
    totalItems,
    totalPrice,

    isLoading,
    isFetching,

    addToCart: addToCartMutation.mutate,

    removeItem: removeItemMutation.mutate,
    updateQuantity: updateQuantityMutation.mutate,
    clearCart: clearCartMutation.mutate,

    isAddingToCart: addToCartMutation.isPending,
    isRemovingItem: removeItemMutation.isPending,
    isUpdatingQuantity: updateQuantityMutation.isPending,
    isClearingCart: clearCartMutation.isPending,
  };
}
