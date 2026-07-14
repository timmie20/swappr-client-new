"use client";

import OrderCheckout from "@/features/checkout/order-checkout";
import { ErrorState } from "@/components/error-state";
import { Spinner } from "@/components/ui/spinner";
import { useOrder } from "@/hooks";

export default function CheckoutById({
  orderNumber,
}: {
  orderNumber: string;
}) {
  const { data: order, isLoading, isError, error } = useOrder(orderNumber);

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-xl items-center gap-2 px-4 py-10 text-sm">
        <Spinner />
        Loading checkout…
      </div>
    );
  }

  if (isError) {
    if (error.cause === 404) {
      return (
        <div className="mx-auto w-full max-w-xl px-4 py-10">
          <ErrorState
            title="Checkout not found"
            description="This checkout link is invalid or has expired. Please restart checkout from your cart."
          />
        </div>
      );
    }

    return (
      <div className="mx-auto w-full max-w-xl px-4 py-10">
        <ErrorState
          title="Unable to load checkout"
          description={error?.message || "Something went wrong."}
        />
      </div>
    );
  }

  if (!order) {
    return <p>An error occurred while loading the checkout.</p>;
  }

  return <OrderCheckout order={order.data} />;
}
