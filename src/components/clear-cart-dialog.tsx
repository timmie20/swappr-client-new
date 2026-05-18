"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCartStore } from "@/store/cart-store";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { useCart } from "@/features/cart/hooks/use-cart";

type ClearCartDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ClearCartDialog({
  open,
  onOpenChange,
}: ClearCartDialogProps) {
  const items = useCartStore((s) => s.items);
  const { clearCart, isClearingCart } = useCart();

  const itemCount = items.length;

  const handleClear = () => {
    if (isClearingCart) return;
    clearCart(undefined, {
      onSuccess() {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Clear your cart?</DialogTitle>

          <DialogDescription>
            {itemCount > 0
              ? `This will remove all ${itemCount} item${
                  itemCount > 1 ? "s" : ""
                } from your cart. This action cannot be undone.`
              : "Your cart is already empty."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            aria-label="Cancel clearing cart"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            aria-label="Confirm clear cart"
            onClick={handleClear}
            disabled={isClearingCart}
            className="flex cursor-pointer items-center gap-2"
          >
            {isClearingCart ? (
              <>
                <Spinner />
                Clearing...
              </>
            ) : (
              <>
                <Icons.trash size={14} />
                Clear Cart
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
