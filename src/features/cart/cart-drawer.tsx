import { Icons } from "@/components/icons";
import ReusableSheetDrawer from "@/components/resuable-sheet-drawer";
import { useCart } from "@/hooks/use-cart";
import { AnimatePresence, motion } from "motion/react";
import Item from "./cart-item";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { SheetFooter } from "@/components/ui/sheet";
import { TypographyH3 } from "@/components/typography/h3";
import { formatNaira } from "@/lib/format";
import { TypographyMuted } from "@/components/typography/muted";

export default function CartDrawer() {
  const { items, totalItems, totalPrice } = useCart();

  const header = (
    <>
      <span className="inline-flex items-center gap-2">
        <Icons.cartCopy size={20} />
        <span>Your Cart ({totalItems})</span>
      </span>
    </>
  );

  const trigger = (
    <div className="relative cursor-pointer">
      <Icons.cartCopy size={20} />
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            key="cart-count"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="bg-primary absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
          >
            {totalItems > 9 ? "9+" : totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
  return (
    <ReusableSheetDrawer
      title={header}
      description="Enjoy free shipping on every order. No minimums. No exceptions"
      trigger={trigger}
    >
      {!items ||
        (items.length === 0 && (
          <EmptyState
            title="No Items yet"
            description="Nothing here yet—explore products and add them to your cart."
            variant="lottie"
            lottieType="cart"
            actions={
              <Button className="cursor-pointer" variant="link">
                Shop Now
              </Button>
            }
          />
        ))}

      {items && items.length > 0 && (
        <div className="overflow-y-auto px-6">
          {items.map((item) => (
            <Item key={`${item.id}-${item.quantity}`} item={item} />
          ))}
        </div>
      )}

      <SheetFooter>
        <div>
          <TypographyH3 className="flex items-center justify-between">
            <span>Subtotal:</span>
            <span>{formatNaira(totalPrice)}</span>
          </TypographyH3>
          <TypographyMuted className="text-sm sm:text-base">
            Taxes, discounts and shipping calculated at checkout.
          </TypographyMuted>
        </div>
        {/* <button
            onClick={handleClose}
            className="text-muted-foreground hover:bg-muted absolute top-4 right-4 cursor-pointer rounded-full p-2 transition-colors"
          >
            <Icons.close size={24} />
            <span className="sr-only">Close</span>
          </button>  */}
        <Button type="submit" className="mt-2">
          Checkout
        </Button>
      </SheetFooter>
    </ReusableSheetDrawer>
  );
}
