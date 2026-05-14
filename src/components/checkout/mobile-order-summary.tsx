"use client";

import { useCheckoutCountdown } from "@/features/checkout/use-checkout-countdown";
import { formatNaira, formatStorageCapacity } from "@/lib/format";
import { TypographyH3 } from "../typography/h3";
import SessionExpiredAlert from "./session-expired-alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon, CheckCircle2Icon } from "lucide-react";
import { OrderSummaryProps } from "./body";

export default function MobileOrderSummary({
  items,
  session,
  isExpired,
  confirmedTotal,
}: OrderSummaryProps) {
  const { remainingText } = useCheckoutCountdown(session?.expires_at);

  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="bg-muted rounded-none border-b"
      >
        <AccordionItem value="order-summary">
          {/* trigger — order summary title + expiry alert */}
          <AccordionTrigger className="hover:no-underline">
            <div className="flex w-full flex-col items-start gap-2 pr-4">
              <div className="flex w-full items-center justify-between">
                <span className="text-foreground text-base font-semibold">
                  Order Summary
                </span>
                <span className="text-foreground text-base font-semibold">
                  {formatNaira(confirmedTotal)}
                </span>
              </div>

              <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                <AlertTriangleIcon className="h-4 w-4" />
                <AlertTitle className="text-xs">
                  Session expires in {remainingText}
                </AlertTitle>
                <AlertDescription className="text-xs">
                  Complete payment before session expires.
                </AlertDescription>
              </Alert>
            </div>
          </AccordionTrigger>

          {/* content — cart items + total + guarantee */}
          <AccordionContent>
            <div className="bg-background overflow-hidden">
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

            <div className="mt-4 px-1">
              <TypographyH3 className="flex items-center justify-between">
                <span>Total:</span>
                <span>{formatNaira(confirmedTotal)}</span>
              </TypographyH3>
            </div>

            <Alert className="mt-4">
              <CheckCircle2Icon className="h-4 w-4" />
              <AlertDescription>
                The total amount you pay includes all applicable customs duties
                & taxes. We guarantee no additional charges on delivery.
              </AlertDescription>
            </Alert>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <SessionExpiredAlert open={isExpired} onOpenChange={() => {}} />
    </>
  );
}
