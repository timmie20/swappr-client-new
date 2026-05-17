// cart-page.tsx
"use client";

import * as React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import Nav from "@/components/checkout/nav";
import DeliveryDetails from "@/components/checkout/delivery-details";
import type { CheckoutDeliveryFormValues } from "@/components/checkout/types";
import ClearCartDialog from "@/components/clear-cart-dialog";

import { useCreateOrder } from "@/hooks";
import { useCartStore } from "@/store/cart-store";

import CartPanel from "./cart-panel";

export default function CartPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const router = useRouter();

  const createOrder = useCreateOrder();

  const items = useCartStore((s) => s.items);

  const hasItems = items.length > 0;

  const handleConfirmOrder = async (data: CheckoutDeliveryFormValues) => {
    createOrder.mutate(
      {
        order_type: "purchase",
        delivery_address: data.delivery_address,
        contact_phone: data.contact_phone,
      },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Order confirmed");
          router.push(`/checkout/${res?.data?.id}`);
        },

        onError: (err) => {
          toast.error(err.message || "Unable to confirm order");
        },
      },
    );
  };

  return (
    <div className="flex min-h-dvh flex-col overflow-hidden">
      <Nav />

      <main className="flex-1 overflow-hidden">
        {/* Mobile Layout */}
        <div className="flex flex-col md:hidden">
          <CartPanel setIsOpen={setIsDialogOpen} />

          <div className="border-t">
            <DeliveryDetails
              submitLabel="Confirm order"
              submitDisabled={!hasItems}
              isSubmitting={createOrder.isPending}
              onSubmit={handleConfirmOrder}
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden h-full md:grid md:grid-cols-2">
          <div className="overflow-y-auto">
            <DeliveryDetails
              submitLabel="Confirm order"
              submitDisabled={!hasItems}
              isSubmitting={createOrder.isPending}
              onSubmit={handleConfirmOrder}
            />
          </div>

          <CartPanel setIsOpen={setIsDialogOpen} />
        </div>
      </main>

      <ClearCartDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
