import { Icons } from "@/components/icons";
import ReusableSheetDrawer from "@/components/resuable-sheet-drawer";
import { useCart } from "@/hooks/use-cart";
import { AnimatePresence, motion } from "motion/react";
import Item from "./cart-item";
import { EmptyState } from "@/components/empty-state";

export default function CartDrawer() {
  const { items, totalItems } = useCart();

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
          />
        ))}

      {items && items.length > 0 && (
        <div className="overflow-y-auto px-6">
          {items.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </div>
      )}
    </ReusableSheetDrawer>
  );
}
