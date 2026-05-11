import { cartEndpoints } from "@/endpoints/cart";
import { useMutation } from "@tanstack/react-query";
import { useCartStore } from "@/store/cart-store";
import { useIsAuthenticated } from "@/hooks/use-access-token";
import { mapServerCartItemToCartItem } from "@/lib/cart";
import { AddCartItemPayload, LocalCartItem } from "@/types/cart";
import { toast } from "sonner";

export function useCart() {
  const loggedIn = useIsAuthenticated();

  const { items, addItem, removeItem, updateQuantity, clearCart } =
    useCartStore();

  // ── Add ─────────────────────────────────────────────────────────
  const { mutate: addToServer, isPending: isAddingToServer } = useMutation({
    mutationFn: (payload: AddCartItemPayload) =>
      cartEndpoints.addToCart(payload),

    onMutate: () => {
      // snapshot for rollback
      const previousItems = useCartStore.getState().items;
      return { previousItems };
    },

    onSuccess: (res) => {
      const incoming = mapServerCartItemToCartItem(res.data);
      const currentItems = useCartStore.getState().items;
      const exists = currentItems.find((i) => i.id === incoming.id);

      useCartStore.setState({
        items: exists
          ? currentItems.map(
              (i) => (i.id === incoming.id ? incoming : i), // update existing with server data
            )
          : [...currentItems, incoming], // append new item
      });

      toast.success(res.message);
    },

    onError: (_err, _payload, context) => {
      // roll back to snapshot
      if (context?.previousItems) {
        useCartStore.setState({ items: context.previousItems });
      }
      toast.error("Failed to add item to cart.", {
        description: _err.message,
      });
    },
  });

  // ── Update ───────────────────────────────────────────────────────
  const { mutate: updateOnServer } = useMutation({
    mutationFn: ({
      itemId,
      increment,
    }: {
      itemId: string;
      increment: number;
    }) => cartEndpoints.updateCartItem(itemId, increment),

    onMutate: ({ itemId }) => {
      const previousItems = useCartStore.getState().items;
      return { previousItems };
    },

    onSuccess: (res) => {
      // server returns only the mutated item — update just that item in store
      const updatedItem = res.data;
      useCartStore.setState((s) => ({
        items: s.items.map((i) =>
          i.id === updatedItem.id
            ? { ...i, quantity: updatedItem.quantity }
            : i,
        ),
      }));
    },

    onError: (_err, _variables, context) => {
      if (context?.previousItems) {
        useCartStore.setState({ items: context.previousItems });
      }
      toast.error("Failed to update cart item.", {
        id: "update-cart-item",
        description: _err.message,
      });
    },
  });

  // ── Remove ───────────────────────────────────────────────────────
  const { mutate: removeFromServer } = useMutation({
    mutationFn: (itemId: string) => cartEndpoints.removeCartItem(itemId),

    onMutate: (itemId) => {
      const previousItems = useCartStore.getState().items;
      removeItem(itemId); // optimistically pop from store
      return { previousItems };
    },

    onSuccess: (_res, itemId) => {
      // request succeeded — item already removed optimistically, nothing to do
      // but confirm by filtering again in case onMutate was skipped
      useCartStore.setState((s) => ({
        items: s.items.filter((i) => i.id !== itemId),
      }));

      toast.success("Item removed from cart.");
    },

    onError: (_err, _itemId, context) => {
      if (context?.previousItems) {
        useCartStore.setState({ items: context.previousItems });
      }
      toast.error("Failed to remove item from cart.", {
        description: _err.message,
      });
    },
  });

  // ── Clear Cart ─────────────────────────────────────────────────────
  const { mutate: clearServerCart, isPending: isClearingCart } = useMutation({
    mutationKey: ["clear-cart"],

    mutationFn: async () => {
      return await cartEndpoints.clearCart();
    },

    onMutate: async () => {
      const previousItems = useCartStore.getState().items;

      return { previousItems };
    },

    onSuccess: () => {
      useCartStore.setState({
        items: [],
      });

      toast.success("Cart cleared.");
    },

    onError: (_error, _variables, context) => {
      if (context?.previousItems) {
        useCartStore.setState({
          items: context.previousItems,
        });
      }

      toast.error("Failed to clear cart.");
    },
  });

  // export function useClearCart() {}

  // ── Handlers ─────────────────────────────────────────────────────
  const handleAddItem = (item: LocalCartItem) => {
    if (loggedIn) {
      addToServer({
        product_id: item.productId,
        variant_id: item.variantId,
        quantity: item.quantity,
        title: item.title,
      });
      return;
    }
    addItem(item); // guest — local only
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    const current = items.find((i) => i.id === itemId);
    if (!current) return;

    const clamped = Math.max(1, quantity);
    const increment = clamped - current.quantity;

    if (increment === 0) return;

    if (!loggedIn) {
      updateQuantity(itemId, clamped); // guest — local only
      return;
    }

    console.log("Updating server cart:", { increment });

    updateOnServer({ itemId: current.id, increment }); // logged in — server only
  };

  const handleRemoveItem = (itemId: string) => {
    const current = items.find((i) => i.id === itemId);
    if (!current) return;

    if (!loggedIn) {
      removeItem(itemId); // guest — local only
      return;
    }

    removeFromServer(itemId); // optimistic remove happens in onMutate
  };

  // const handleClearCart = () => {
  //   if (!loggedIn) {
  //     clearCart();
  //     return;
  //   }
  //   clearServerCart();
  // };

  const handleClearCart = (options?: {
    onSuccess?: () => void;
    onError?: () => void;
  }) => {
    // guest cart
    if (!loggedIn) {
      clearCart();

      toast.success("Cart cleared.");

      options?.onSuccess?.();

      return;
    }

    // server cart
    clearServerCart(undefined, {
      onSuccess: () => {
        options?.onSuccess?.();
      },

      onError: () => {
        options?.onError?.();
      },
    });
  };

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = items.reduce(
    (acc, i) => acc + Number(i.price) * i.quantity,
    0,
  );
  return {
    items,
    totalItems,
    totalPrice,
    isAddingToServer,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    isClearingCart,
  };
}
