"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useVerifyPayment } from "@/hooks";
import {
  clearPaystackReference,
  getPaystackReference,
} from "@/lib/paystack-reference";
import { useCartStore } from "@/store/cart-store";
import { Lottie } from "@/components/lottie";
import successCheck from "@/lottie/success-check.json";

export function CheckoutVerifyView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const referenceFromUrl = searchParams.get("reference");
  const reference = referenceFromUrl || getPaystackReference();

  const verify = useVerifyPayment(reference);

  useEffect(() => {
    if (!reference) return;

    if (verify.isSuccess) {
      clearPaystackReference();
      useCartStore.getState().clearCart();
      return;
    }

    if (verify.isError) {
      clearPaystackReference();
    }
  }, [reference, router, verify.error, verify.isError, verify.isSuccess]);

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            {verify.isSuccess
              ? "Payment confirmed"
              : verify.isError
                ? "Payment verification failed"
                : "Verifying payment"}
          </CardTitle>
          {!verify.isSuccess && (
            <p className="text-muted-foreground text-sm">
              Please wait while we confirm your payment.
            </p>
          )}
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
            <div className="flex flex-col items-center gap-4 py-2 text-center">
              <Lottie
                animationData={successCheck}
                loop={false}
                autoPlay
                className="size-44"
              />

              <div className="space-y-2">
                <p className="text-base font-semibold">Payment confirmed</p>
                <p className="text-muted-foreground text-sm">
                  Your payment has been confirmed and your order has been
                  placed. You’ll receive follow-up information in your email
                  concerning your order.
                </p>
              </div>

              <Button
                type="button"
                onClick={() => router.replace("/orders")}
                className="rounded-full"
              >
                See my orders
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
