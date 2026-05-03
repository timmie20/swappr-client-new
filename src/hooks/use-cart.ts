import { cartEndpoints } from "@/endpoints/cart";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCartStore } from "@/store/cart-store";
// import { useAuthStore } from "@/store/auth-store";
import { isAuthenticated } from "@/lib/auth-tokens";
import { CartItem } from "@/types/cart";
import { ProductDetail, ProductVariant } from "@/types/product";

export function mapApiProductToCartItem({
  product,
  title,
  activeVariant,
  quantity,
}: {
  product: ProductDetail;
  title: string;
  activeVariant: ProductVariant | null;
  quantity: number;
}): CartItem {
  return {
    id: `${product.id}-${activeVariant ? activeVariant.id : "base"}`,
    productId: product.id,
    variantId: activeVariant ? activeVariant.id : null,
    title: title,
    price: activeVariant ? activeVariant.price : product.base_price,
    quantity: quantity,
    image: product.images[0] ?? "",
    color: activeVariant ? activeVariant.color : undefined,
    storage: activeVariant ? activeVariant.storage : undefined,
    condition: product.condition,
  };
}

export function useCart() {
  // const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const loggedIn = isAuthenticated();
  const queryClient = useQueryClient();
  const { items, addItem, removeItem, updateQuantity, clearCart } =
    useCartStore();

  const { mutate: addToServer } = useMutation({
    mutationFn: cartEndpoints.addToCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const { mutate: removeFromServer } = useMutation({
    mutationFn: cartEndpoints.removeCartItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const handleAddItem = (item: CartItem) => {
    addItem(item); // always update local instantly
    if (loggedIn) addToServer(item); // sync to DB if logged in
  };

  const handleUpdateQuantity = (
    productId: string,
    variantId: string | undefined,
    quantity: number,
  ) => {
    updateQuantity(productId, variantId, quantity); // update local
    // For simplicity, let's assume we have an endpoint to update quantity directly
    // In a real app, you might need to send the entire item or have a specific endpoint
    if (loggedIn) {
      cartEndpoints.updateCartItemQuantity({ productId, variantId, quantity });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  };

  const handleRemoveItem = (
    productId: string,
    variantId: string | undefined,
  ) => {
    removeItem(productId, variantId);
    if (loggedIn) removeFromServer({ productId, variantId });
  };

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return {
    items,
    totalItems,
    totalPrice,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    updateQuantity: handleUpdateQuantity,
    clearCart,
  };
}
