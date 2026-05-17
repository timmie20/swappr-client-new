// cart-panel.tsx
"use client";

import { EmptyState } from "@/components/empty-state";
import { Icons } from "@/components/icons";
import { TypographyH3 } from "@/components/typography/h3";
import { TypographyMuted } from "@/components/typography/muted";
import { TypographyP } from "@/components/typography/p";
import { Button } from "@/components/ui/button";

import { formatNaira } from "@/lib/format";
import { useCart } from "@/hooks/use-cart";

import Item from "./cart-item";
import Link from "next/link";

export default function CartPanel({
  setIsOpen,
}: {
  setIsOpen: (open: boolean) => void;
}) {
  const { items, totalItems, totalPrice } = useCart();

  const hasItems = items.length > 0;

  return (
    <aside className="bg-muted border-sidebar-border flex h-full min-h-0 flex-col border-b md:border-b-0 md:border-l">
      {/* constrained content wrapper */}
      <div className="flex h-full min-h-0 w-full max-w-md flex-col px-4 py-8">
        {/* Header */}
        <div className="shrink-0 space-y-2">
          <TypographyP className="text-foreground inline-flex items-center gap-2 text-lg font-semibold">
            <Icons.cartCopy size={20} />
            <span>Your Cart ({totalItems})</span>
          </TypographyP>

          <TypographyMuted>
            Enjoy free shipping on every order. No minimums. No exceptions.
          </TypographyMuted>
        </div>

        {!hasItems ? (
          <div className="flex flex-1 items-center justify-center">
            <EmptyState
              title="Your cart is empty"
              description="Nothing here yet—explore products and add them to your cart."
              variant="lottie"
              lottieType="cart"
              actions={
                <Link
                  href="/collections"
                  className="text-primary cursor-pointer hover:underline"
                >
                  Shop Now
                </Link>
              }
            />
          </div>
        ) : (
          <>
            {/* scroll area */}
            <div className="min-h-0 flex-auto overflow-y-auto py-6">
              <div className="pr-2">
                {items.map((item) => (
                  <Item key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* footer */}
            <div className="shrink-0 border-t pt-6">
              <div>
                <TypographyH3 className="flex items-center justify-between">
                  <span>Subtotal:</span>
                  <span>{formatNaira(totalPrice)}</span>
                </TypographyH3>

                <TypographyMuted className="text-sm sm:text-base">
                  Taxes, discounts and shipping calculated at checkout.
                </TypographyMuted>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <Icons.trash size={16} />
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
