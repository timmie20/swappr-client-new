"use client";

import { toast } from "sonner";

import { useInitiatePayment } from "@/hooks";
import { setPaystackReference } from "@/lib/paystack-reference";
import type { Order } from "@/types/orders";
import { useExpiryCountdown } from "@/hooks/use-expiry-countdown";
import { CountdownTimer } from "./count-down-timer";
import { OrderAccordion } from "./order-accordian";
import { PayNowButton } from "./payment-actions";
import Nav from "@/components/shared/nav/checkout-nav";

interface OrderCheckoutProps {
  order: Order;
}

export default function OrderCheckout({ order }: OrderCheckoutProps) {
  const { hours, minutes, seconds, isExpired } = useExpiryCountdown(
    order.expires_at,
    order.payment_status === "unpaid" && order.status === "pending",
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
          {/* 
          <section>
            <PaystackBadge />
          </section> */}

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
