"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useVerifyCheckout } from "@/hooks/use-checkout";
import {
  clearPaystackReference,
  getPaystackReference,
} from "@/lib/paystack-reference";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";

export function CheckoutVerifyView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const referenceFromUrl = searchParams.get("reference");
  const reference = referenceFromUrl || getPaystackReference();

  const resetCheckout = useCheckoutStore((s) => s.reset);

  const verify = useVerifyCheckout(reference);

  useEffect(() => {
    if (!reference) return;

    if (verify.isSuccess) {
      clearPaystackReference();
      resetCheckout();
      useCartStore.getState().clearCart();

      toast.success("Order placed successfully");

      // TODO: Decide final redirect destination (e.g. /orders or confirmation page)
      return;
    }

    if (verify.isError) {
      const err = verify.error;

      // terminal error states should clear local reference
      clearPaystackReference();
      resetCheckout();

      if (err?.statusCode === 410) {
        router.replace("/");
        return;
      }

      // Keep user on page for other errors
    }
  }, [
    reference,
    resetCheckout,
    router,
    verify.error,
    verify.isError,
    verify.isSuccess,
  ]);

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Verifying payment
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Please wait while we confirm your payment.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {!reference && (
            <div className="space-y-3">
              <p className="text-sm">
                Missing payment reference. Please return to checkout and try
                again.
              </p>
              <Button
                type="button"
                onClick={() => router.replace("/")}
                className="rounded-full"
              >
                Continue shopping
              </Button>
            </div>
          )}

          {reference && verify.isLoading && (
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Spinner />
              Verifying…
            </div>
          )}

          {reference && verify.isError && (
            <div className="space-y-3">
              <p className="text-destructive text-sm">
                {verify.error?.message || "Payment verification failed."}
              </p>
              <Button
                type="button"
                onClick={() => router.replace("/")}
                className="rounded-full"
              >
                Try again
              </Button>
            </div>
          )}

          {reference && verify.isSuccess && (
            <div className="space-y-3">
              <p className="text-sm">
                Payment confirmed. Your order has been placed.
              </p>
              <Button
                type="button"
                onClick={() => router.replace("/")}
                className="rounded-full"
              >
                Continue shopping
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
