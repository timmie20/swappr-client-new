// cart-page.tsx
"use client";

import * as React from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

import DeliveryDetails from "@/features/checkout/delivery-details";
import type { CheckoutDeliveryFormValues } from "@/components/checkout/types";
import ClearCartDialog from "@/components/clear-cart-dialog";

import { useCreateOrder } from "@/hooks";

import CartPanel from "./cart-panel";
import { useCart } from "./hooks/use-cart";
import Nav from "@/components/shared/nav/checkout-nav";

export default function CartPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const router = useRouter();

  const searchParams = useSearchParams();

  const vendorId = searchParams.get("vendor") || ""; // comes from ?vendor=xxx

  const createOrder = useCreateOrder();

  const { items } = useCart();

  const hasItems = items.length > 0;

  const handleConfirmOrder = async (data: CheckoutDeliveryFormValues) => {
    createOrder.mutate(
      {
        order_type: "purchase",
        vendor_id: vendorId, // if empty string, send as undefined to create order with all vendors
        delivery_address: data.delivery_address,
        contact_phone: data.contact_phone,
      },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Order confirmed");
          router.push(`/checkout/${res?.data?.order_number}`);
        },

        onError: (err) => {
          toast.error(err.message || "Unable to confirm order");
        },
      },
    );
  };

  return (
    <div className="flex min-h-dvh flex-col md:overflow-hidden">
      <Nav />

      <main className="flex-1 md:overflow-hidden">
        {/* Mobile Layout */}
        <div className="flex flex-col md:hidden">
          <CartPanel vendorId={vendorId} setIsOpen={setIsDialogOpen} />

          <div className="border-t">
            <DeliveryDetails
              submitLabel="Confirm order"
              isSubmitting={createOrder.isPending}
              onSubmit={handleConfirmOrder}
              submitDisabled={!hasItems} // disable if there are no items in the cart
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden h-full md:grid md:grid-cols-2">
          <div className="overflow-y-auto">
            <DeliveryDetails
              submitLabel="Confirm order"
              isSubmitting={createOrder.isPending}
              onSubmit={handleConfirmOrder}
              submitDisabled={!hasItems} // disable if there are no items in the cart
            />
          </div>

          <CartPanel vendorId={vendorId} setIsOpen={setIsDialogOpen} />
        </div>
      </main>

      <ClearCartDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
