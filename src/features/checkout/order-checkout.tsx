// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { toast } from "sonner";

// import Nav from "@/components/checkout/nav";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import { Spinner } from "@/components/ui/spinner";
// import { TypographyH3 } from "@/components/typography/h3";
// import { TypographyP } from "@/components/typography/p";

// import { useInitiatePayment } from "@/hooks";
// import { formatNaira, formatStorageCapacity } from "@/lib/format";
// import { setPaystackReference } from "@/lib/paystack-reference";
// import type { Order } from "@/types/orders";
// import { AlertTriangleIcon } from "lucide-react";

// function pad2(n: number): string {
//   return n.toString().padStart(2, "0");
// }

// function formatRemaining(ms: number): string {
//   const totalSeconds = Math.max(0, Math.floor(ms / 1000));
//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = totalSeconds % 60;
//   return `${minutes}:${pad2(seconds)}`;
// }

// function useExpiryCountdown(expiresAt: string) {
//   const expiryMs = useMemo(() => {
//     const t = new Date(expiresAt).getTime();
//     return Number.isFinite(t) ? t : null;
//   }, [expiresAt]);

//   const [now, setNow] = useState(() => Date.now());

//   useEffect(() => {
//     if (!expiryMs) return;

//     const id = window.setInterval(() => {
//       setNow(Date.now());
//     }, 1000);

//     return () => window.clearInterval(id);
//   }, [expiryMs]);

//   const remainingMs = expiryMs ? Math.max(0, expiryMs - now) : 0;

//   return {
//     remainingText: formatRemaining(remainingMs),
//     isExpired: remainingMs <= 0,
//   };
// }

// export default function OrderCheckout({ order }: { order: Order }) {
//   const payment = useInitiatePayment();
//   const { remainingText, isExpired } = useExpiryCountdown(order.expires_at);

//   const handleInitiatePayment = () => {
//     if (payment.isPending || isExpired) return;
// //
//     payment.mutate(
//       { type: "order_payment", source_id: order.id },
//       {
//         onSuccess: (res) => {
//           if (res.data?.reference) {
//             setPaystackReference(res.data.reference);
//           }
//           const url = res.data?.authorization_url;
//           if (url) {
//             window.location.href = url;
//             return;
//           }
//           toast.success(res.message || "Payment initiated");
//         },
//         onError: (err) => {
//           toast.error(err.message || "Unable to initiate payment");
//         },
//       },
//     );
//   };

//   return (
//     <div className="flex min-h-dvh flex-col overflow-hidden">
//       <Nav />

//       <main>
//         <div className="w-full max-w-md">
//           <div className="space-y-4">
//             <TypographyP className="text-foreground text-lg font-semibold">
//               Order Summary
//             </TypographyP>

//             <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
//               <AlertTriangleIcon />
//               <AlertTitle>
//                 This payment session will expire in {remainingText}.
//               </AlertTitle>
//               <AlertDescription className="text-xs">
//                 Please initiate payment before this session expires.
//               </AlertDescription>
//             </Alert>
//           </div>

//           <div className="bg-background border-border mt-4 overflow-hidden rounded-2xl border">
//             <div className="divide-border divide-y">
//               {order.items.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-start justify-between gap-4 p-4"
//                 >
//                   <div className="min-w-0 space-y-1">
//                     <TypographyH3 className="text-foreground text-base leading-tight text-wrap">
//                       {item.product_name}
//                     </TypographyH3>
//                     <p className="text-muted-foreground text-xs">
//                       Qty {item.quantity}
//                       {item.color ? ` | ${item.color}` : ""}
//                       {typeof item.storage === "number"
//                         ? ` | ${formatStorageCapacity(item.storage)}`
//                         : ""}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-muted-foreground shrink-0 text-sm font-medium">
//                       {formatNaira(Number(item.unit_price))} x {item.quantity}
//                     </p>
//                     <p className="text-foreground shrink-0 text-sm font-medium">
//                       {formatNaira(Number(item.subtotal))}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="mt-4 px-4">
//             <TypographyH3 className="flex items-center justify-between">
//               <span>Total:</span>
//               <span>{formatNaira(Number(order.total_amount))}</span>
//             </TypographyH3>
//           </div>

//           <Button
//             type="button"
//             className="mt-4 w-full rounded-full"
//             disabled={payment.isPending || isExpired}
//             onClick={handleInitiatePayment}
//           >
//             {payment.isPending ? (
//               <span className="inline-flex items-center gap-2">
//                 <Spinner />
//                 Initiating…
//               </span>
//             ) : isExpired ? (
//               "Session expired"
//             ) : (
//               "Initiate payment"
//             )}
//           </Button>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { toast } from "sonner";

import Nav from "@/components/checkout/nav";

import { useInitiatePayment } from "@/hooks";
import { setPaystackReference } from "@/lib/paystack-reference";
import type { Order } from "@/types/orders";
import { useExpiryCountdown } from "@/hooks/use-expiry-countdown";
import { CountdownTimer } from "./count-down-timer";
import { OrderAccordion } from "./order-accordian";
import { PayNowButton, PaystackBadge } from "./payment-actions";

interface OrderCheckoutProps {
  order: Order;
}

export default function OrderCheckout({ order }: OrderCheckoutProps) {
  const { hours, minutes, seconds, isExpired } = useExpiryCountdown(
    order.expires_at,
  );

  const payment = useInitiatePayment();

  const handleInitiatePayment = () => {
    if (payment.isPending || isExpired) return;

    payment.mutate(
      { type: "order_payment", source_id: order.id },
      {
        onSuccess: (res) => {
          if (res.reference) {
            setPaystackReference(res.reference);
          }

          const url = res.authorization_url;

          if (url) {
            window.location.href = url;
            return;
          }
          toast.success(res.message || "Payment initiated");
        },
        onError: (err) => {
          toast.error(err.message || "Unable to initiate payment");
        },
      },
    );
  };

  return (
    <div className="flex min-h-dvh flex-col bg-slate-50">
      <Nav />

      <main className="flex flex-1 flex-col items-center px-4 py-6 sm:py-10">
        <div className="w-full max-w-md space-y-5">
          {/* ── 1. Countdown Timer ── */}
          <section className="flex flex-col items-center">
            <CountdownTimer
              hours={hours}
              minutes={minutes}
              seconds={seconds}
              isExpired={isExpired}
            />
          </section>

          {/* ── 2. Order Accordion ── */}
          <section>
            <OrderAccordion
              items={order.items}
              totalAmount={order.total_amount}
            />
          </section>

          {/* ── 3. Paystack Badge ── */}
          <section>
            <PaystackBadge />
          </section>

          {/* ── 4. Pay Now CTA ── */}
          <section>
            <PayNowButton
              isPending={payment.isPending}
              isExpired={isExpired}
              onClick={handleInitiatePayment}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
