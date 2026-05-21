"use client";

import { Separator } from "@/components/ui/separator";
import { formatDate, formatNaira } from "@/lib/format";
import type { Order } from "@/types/orders";
import { PaymentStatusBadge, OrderStatusBadge } from "./order-status-badge";
import { Icons } from "@/components/icons";
import { OrderCancelDialog } from "./order-cancel-dialog";

function formatOrderType(orderType: Order["order_type"]) {
  return orderType === "swap" ? "Swap" : "Purchase";
}

export function OrderSummary({ order }: { order: Order }) {
  const address = [
    order.delivery_address.street,
    order.delivery_address.city,
    order.delivery_address.state,
    order.delivery_address.postal_code,
  ]
    .filter(Boolean)
    .join(", ");

  const recipient = [order.buyer?.first_name, order.buyer?.last_name]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="border-border border-t pt-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold">Order Summary</h3>
        <p className="text-muted-foreground text-sm">
          Delivery, payment, and contact details.
        </p>
      </div>

      <div className="border-border space-y-4 border p-4">
        <div className="flex items-start gap-3">
          <Icons.mapPin className="text-muted-foreground mt-0.5 size-4" />
          <div className="space-y-1">
            <p className="text-sm font-semibold">Delivery address</p>
            <p className="text-muted-foreground text-xs">{address}</p>
          </div>
        </div>

        <Separator />

        <div className="flex items-start gap-3">
          <Icons.user className="text-muted-foreground mt-0.5 size-4" />
          <div className="space-y-1">
            <p className="text-sm font-semibold">Recipient</p>
            <p className="text-muted-foreground text-xs">
              {recipient || "Not provided"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Icons.phone className="text-muted-foreground mt-0.5 size-4" />
          <div className="space-y-1">
            <p className="text-sm font-semibold">Contact</p>
            <p className="text-muted-foreground text-xs">
              {order.contact_phone}
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex items-start gap-3">
          <Icons.billing className="text-muted-foreground mt-0.5 size-4" />
          <div className="space-y-2">
            <p className="text-sm font-semibold">Payment</p>
            <div className="flex flex-wrap items-center gap-2">
              <PaymentStatusBadge status={order.payment_status} />
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="text-muted-foreground space-y-1 text-xs">
              <p>Order type: {formatOrderType(order.order_type)}</p>
              <p>Placed on {formatDate(order.created_at)}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Total paid</span>
          <span className="text-foreground text-base font-semibold">
            {formatNaira(order.total_amount)}
          </span>
        </div>

        <OrderCancelDialog order={order} />
      </div>
    </section>
  );
}
