"use client";
import { Icons } from "@/components/icons";
import { SafeImage } from "@/components/safe-image";
import { TypographyH3 } from "@/components/typography/h3";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/hooks/use-cart";
import { mutationKeys } from "@/hooks/use-cart-queries";
import { useIsAuthenticated } from "@/lib/auth/session-client";
import { deslug, formatNaira, formatStorageCapacity } from "@/lib/format";
import { LocalCartItem } from "@/types/cart";
import { useMutationState } from "@tanstack/react-query";
import { toast } from "sonner";

// Track pending quantity mutations for individual cart items.
// React Query stores mutation variables as `unknown` internally,
// so we cast the variables shape here (line 31-37, with select attribute) to safely determine whether
// the current cart item is actively being updated.
//
// This allows us to:
// - disable only the active item's controls
// - keep the rest of the cart interactive
// - support concurrent optimistic updates cleanly

export default function Item({ item }: { item: LocalCartItem }) {
  const { updateQuantity, removeItem } = useCart();

  const isAuth = useIsAuthenticated(); // null while loading, then true/false

  const pendingMutations = useMutationState({
    filters: {
      mutationKey: mutationKeys.cart.updateQuantity(),
      status: "pending",
    },

    select: (mutation) =>
      mutation.state.variables as
        | {
            itemId: string;
            increment: number;
          }
        | undefined,
  });

  const isUpdatingThisItem = pendingMutations.some(
    (variables) => variables?.itemId === item.id,
  );

  const handleIncrement = () => {
    if (!isAuth) toast.error("Please log in to update your cart");
    updateQuantity({
      itemId: item.id,
      increment: 1,
    });
  };

  const handleDecrement = () => {
    if (!isAuth) toast.error("Please log in to update your cart");
    if (item.quantity <= 1) return;

    updateQuantity({
      itemId: item.id,
      increment: -1,
    });
  };

  const handleRemove = () => {
    if (!isAuth) toast.error("Please log in to update your cart");
    removeItem(item.id);
  };

  return (
    <div className="flex w-full items-start gap-4 border-[#E5E7EB] py-4 not-first:border-t">
      <SafeImage
        src={item.image}
        alt={item.title}
        width={100}
        height={100}
        className="rounded-md"
      />

      <div className="w-full space-y-2">
        <span className="inline-flex items-center gap-2">
          <TypographyH3 className="text-small leading-tight sm:text-base">
            {item.title}
          </TypographyH3>

          <span className="text-muted-foreground font-semibold">
            {formatNaira(item.price)}
          </span>
        </span>

        <p className="text-muted-foreground text-xs sm:text-sm">
          Qty {item.quantity}
          {item.color ? ` | ${item.color}` : ""}
          {item.condition ? ` | ${deslug(item.condition)}` : ""}
          {item.storage ? ` | ${formatStorageCapacity(item.storage)}` : ""}
        </p>

        <div className="flex w-full items-center justify-between">
          <div className="inline-flex items-center gap-3">
            <Button
              variant="outline"
              size="icon-sm"
              disabled={item.quantity <= 1 || isUpdatingThisItem}
              onClick={handleDecrement}
              className="cursor-pointer"
            >
              <Icons.minus />
            </Button>

            <span className="text-base font-semibold">{item.quantity}</span>

            <Button
              variant="outline"
              size="icon-sm"
              disabled={isUpdatingThisItem}
              onClick={handleIncrement}
              className="cursor-pointer"
            >
              <Icons.add />
            </Button>

            <Icons.spinner
              className={
                isUpdatingThisItem
                  ? "text-muted-foreground animate-spin"
                  : "hidden"
              }
              size={16}
            />
          </div>

          <Button
            variant="destructive"
            size="icon-lg"
            onClick={handleRemove}
            className="cursor-pointer"
          >
            <Icons.trash size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
