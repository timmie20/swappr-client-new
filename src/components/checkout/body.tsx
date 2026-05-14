import { useMemo } from "react";
import { useCheckoutStore } from "@/store/checkout-store";
import { useCartStore } from "@/store/cart-store";
import CartItemsOverview from "./cart-items-overview";
import DeliveryDetails from "./delivery-details";
import { LocalCartItem } from "@/types/cart";
import { CheckoutSession } from "@/types/checkout";
import MobileOrderSummary from "./mobile-order-summary";

export type OrderSummaryProps = {
  items: LocalCartItem[];
  session: CheckoutSession | null;
  isExpired: boolean;
  confirmedTotal: number;
};

export default function CheckoutBody() {
  const session = useCheckoutStore((s) => s.session);
  const isExpired = useCheckoutStore((s) => s.isExpired);
  const items = useCartStore((s) => s.items);

  const localSubtotal = useMemo(
    () => items.reduce((acc, i) => acc + Number(i.price) * i.quantity, 0),
    [items],
  );

  const confirmedTotal = session?.total_amount ?? localSubtotal;

  const sharedProps = { items, session, isExpired, confirmedTotal };

  return (
    <div className="grid h-full w-full md:grid-cols-2">
      {/* mobile — accordion summary sits above delivery details */}
      <div className="md:hidden">
        <MobileOrderSummary {...sharedProps} />
        <DeliveryDetails />
      </div>

      {/* desktop — original side by side layout */}
      <div className="hidden md:contents">
        <DeliveryDetails />
        <CartItemsOverview {...sharedProps} />
      </div>
    </div>
  );
}
