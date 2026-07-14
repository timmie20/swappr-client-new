import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatNaira, formatRelativeDate } from "@/lib/format";
import type { Order } from "@/types/orders";
import { OrderStatusBadge, PaymentStatusBadge } from "./order-status-badge";
import { Icons } from "@/components/icons";

export function OrderCard({ order }: { order: Order }) {
  const vendorName =
    order.vendor.trading_name ||
    order.vendor?.business_name ||
    "Unknown Vendor";

  return (
    <div className="border-border bg-background/60 hover:bg-muted/30 border-b px-4 py-5 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-foreground text-sm font-semibold">{vendorName}</p>
          <p className="text-muted-foreground text-xs">
            {formatRelativeDate(order.created_at)}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <PaymentStatusBadge status={order.payment_status} />
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-muted-foreground flex items-center gap-1 font-mono text-xs">
            <Icons.package size={12} />
            Order ID
            <span className="">#{order.order_number}</span>
          </p>
          <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
            <span className="text-foreground font-semibold">
              Total Amount: {formatNaira(order.total_amount)}
            </span>
          </div>
        </div>

        <Button asChild variant="outline" size="sm" className="rounded-none">
          <Link
            href={`/orders/${order.order_number}`}
            className="flex items-center gap-2"
          >
            View Timeline
            <Icons.chevronRight size={16} />
          </Link>
        </Button>
      </div>
    </div>
  );
}
