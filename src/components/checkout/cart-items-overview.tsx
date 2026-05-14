"use client";

import { useRouter } from "next/navigation";
import { useCheckoutCountdown } from "@/features/checkout/use-checkout-countdown";
import { formatNaira, formatStorageCapacity } from "@/lib/format";
import { TypographyP } from "../typography/p";
import { TypographyH3 } from "../typography/h3";
import SessionExpiredAlert from "./session-expired-alert";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon, CheckCircle2Icon } from "lucide-react";
import { OrderSummaryProps } from "./body";

export default function CartItemsOverview({
  items,
  session,
  isExpired,
  confirmedTotal,
}: OrderSummaryProps) {
  const { remainingText } = useCheckoutCountdown(session?.expires_at);

  return (
    <div className="bg-muted border-sidebar-border min-h-dvh w-full border-l px-4 py-8">
      <div className="w-full max-w-md">
        <div className="space-y-4">
          <TypographyP className="text-foreground text-lg font-semibold">
            Order Summary
          </TypographyP>

          <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
            <AlertTriangleIcon />
            <AlertTitle>
              This checkout session will expire in {remainingText}.
            </AlertTitle>
            <AlertDescription className="text-xs">
              To secure your order and avoid interruptions, please complete your
              payment before this checkout session expires. Once expired,
              you&apos;ll need to restart the checkout process.
            </AlertDescription>
          </Alert>
        </div>

        <div className="bg-background border-border mt-4 overflow-hidden rounded-2xl border">
          <div className="divide-border divide-y">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.quantity}`}
                className="flex items-start justify-between gap-4 p-4"
              >
                <div className="min-w-0">
                  <TypographyH3 className="text-foreground truncate text-base leading-tight">
                    {item.title}
                  </TypographyH3>
                  <p className="text-muted-foreground text-xs">
                    Qty {item.quantity} | {item.color} |{" "}
                    {formatStorageCapacity(item.storage)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground shrink-0 text-sm font-medium">
                    {formatNaira(Number(item.price))} x {item.quantity}
                  </p>
                  <p className="text-foreground shrink-0 text-sm font-medium">
                    {formatNaira(Number(item.price) * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 px-4">
          <TypographyH3 className="flex items-center justify-between">
            <span>Total:</span>
            <span>{formatNaira(confirmedTotal)}</span>
          </TypographyH3>
        </div>

        <Alert className="mt-4 max-w-md">
          <CheckCircle2Icon />
          <AlertDescription>
            The total amount you pay includes all applicable customs duties &
            taxes. We guarantee no additional charges on delivery.
          </AlertDescription>
        </Alert>
      </div>

      <SessionExpiredAlert open={isExpired} onOpenChange={() => {}} />
    </div>
  );
}
