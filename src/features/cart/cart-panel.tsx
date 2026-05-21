// cart-panel.tsx
"use client";

import { EmptyState } from "@/components/empty-state";
import { Icons } from "@/components/icons";
import { TypographyH3 } from "@/components/typography/h3";
import { TypographyMuted } from "@/components/typography/muted";
import { TypographyP } from "@/components/typography/p";

import { formatNaira } from "@/lib/format";

import Item from "./cart-item";
import Link from "next/link";
import { useCart } from "@/features/cart/hooks/use-cart";
import { useMemo } from "react";

export default function CartPanel({
  vendorId,
}: {
  vendorId?: string; // optional filter for showing items from a specific vendor (comes from ?vendor=xxx)
  setIsOpen?: (open: boolean) => void;
}) {
  const { items, totalItems, totalPrice } = useCart();

  const vendorItems = useMemo(() => {
    if (!vendorId) return items; // no vendor param = show all
    return items.filter((item) => item.vendorId === vendorId);
  }, [items, vendorId]);

  const vendorName = vendorItems[0]?.businessName ?? "Vendor";

  const hasItems = vendorItems.length > 0;

  return (
    <aside className="bg-muted border-sidebar-border flex h-full min-h-0 flex-col border-b md:border-b-0 md:border-l">
      {/* constrained content wrapper */}
      <div className="flex h-full min-h-0 w-full max-w-md flex-col px-4 py-8">
        {/* Header */}
        <div className="shrink-0 space-y-2">
          <TypographyP className="text-foreground inline-flex items-center gap-2 text-lg font-semibold">
            <Icons.cartCopy size={20} />
            <span>Your Cart from ({totalItems})</span>
          </TypographyP>

          {vendorId && (
            <TypographyMuted>
              Viewing items from{" "}
              <span className="text-muted-foreground font-medium">
                {vendorName}
              </span>
            </TypographyMuted>
          )}
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
            <div className="min-h-0 overflow-y-auto py-6">
              <div className="pr-2">
                {vendorItems.map((item) => (
                  <Item key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* footer */}
            <div className="shrink-0 border-t-2 pt-6">
              <div>
                <TypographyH3 className="flex items-center justify-between">
                  <span>Subtotal:</span>
                  <span>{formatNaira(totalPrice)}</span>
                </TypographyH3>

                <TypographyMuted className="text-xs sm:text-base">
                  Taxes, discounts and shipping calculated at checkout.
                </TypographyMuted>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
