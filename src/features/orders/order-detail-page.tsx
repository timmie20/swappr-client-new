"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ErrorState } from "@/components/error-state";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { TypographyH2 } from "@/components/typography/h2";
import { TypographyMuted } from "@/components/typography/muted";
import { useOrder } from "@/hooks";
import { OrderItems } from "./components/order-items";
import { OrderSummary } from "./components/order-summary";
import { OrderTimeline } from "./components/order-timeline";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "./components/order-status-badge";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { useState } from "react";

export default function OrderDetailPage({ orderId }: { orderId: string }) {
  const { data, isLoading, isError, error } = useOrder(orderId);
  const [copied, setCopied] = useState(false);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const router = useRouter();

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-4xl items-center gap-2 px-4 py-10 text-sm">
        <Spinner />
        Loading order...
      </div>
    );
  }

  if (isError) {
    const statusCode = (error as { statusCode?: number })?.statusCode;

    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        <ErrorState
          title={
            statusCode === 404 ? "Order not found" : "Unable to load order"
          }
          description={
            statusCode === 404
              ? "This order does not exist or has been removed."
              : error?.message || "Please try again later."
          }
        />
      </div>
    );
  }

  const order = data?.data;

  if (!order) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        <ErrorState
          title="Order unavailable"
          description="We could not load this order. Please try again."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-5xl space-y-6 pb-10">
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4">
        <div className="space-y-2">
          <Button asChild variant="ghost" size="sm" className="rounded-none">
            <Link href="/orders" className="flex items-center gap-2">
              <Icons.chevronLeft size={16} />
              Back to orders
            </Link>
          </Button>
          <TypographyH2 className="border-b-0 pb-0">Order details</TypographyH2>
          <div className="flex items-center gap-2">
            <TypographyMuted>Order ID: #{order.id}</TypographyMuted>

            <button
              className="text-muted-foreground hover:text-foreground cursor-pointer text-sm transition-colors"
              onClick={handleCopyOrderId}
            >
              {copied ? (
                <span className="inline-flex items-center gap-1 text-green-600">
                  <Icons.check size={16} />
                  Copied!
                </span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  <Icons.copy size={16} />
                  <span>Copy</span>
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <PaymentStatusBadge status={order.payment_status} />
          <OrderStatusBadge status={order.status} />

          {order.payment_status !== "paid" && order.status === "pending" && (
            <Button
              className="cursor-pointer rounded-none"
              size="sm"
              onClick={() => router.push(`/checkout/${orderId}`)}
            >
              Pay Now
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <OrderTimeline order={order} />
          <OrderItems items={order.items} />
        </div>

        <div className="space-y-6">
          <OrderSummary order={order} />
        </div>
      </div>
    </div>
  );
}
