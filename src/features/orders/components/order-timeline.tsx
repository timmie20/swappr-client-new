import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import type { Order } from "@/types/orders";

const STATUS_LABELS: Record<Order["status"], string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  rejected: "Rejected",
};

const BASE_FLOW: Order["status"][] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];

function getTimelineSteps(status: Order["status"]) {
  if (status === "cancelled") return ["pending", , "cancelled"];
  if (status === "rejected") return ["pending", "confirmed", "rejected"];
  return BASE_FLOW;
}

function getTimestamp(order: Order, status: Order["status"]) {
  switch (status) {
    case "pending":
      return order.created_at;
    case "confirmed":
      return order.confirmed_at;
    case "processing":
      return order.processing_at ?? null;
    case "shipped":
      return order.shipped_at ?? null;
    case "delivered":
      return order.delivered_at;
    case "cancelled":
      return order.cancelled_at ?? order.updated_at;
    case "rejected":
      return order.rejected_at ?? order.updated_at;
    default:
      return null;
  }
}

export function OrderTimeline({ order }: { order: Order }) {
  const steps = getTimelineSteps(order.status);
  const currentIndex = Math.max(0, steps.indexOf(order.status));

  return (
    <section className="border-border border-t pt-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold">Order Timeline</h3>
        <p className="text-muted-foreground text-sm">
          Track your order progress from confirmation to delivery.
        </p>
      </div>

      <div className="relative pl-6">
        <span className="bg-border absolute top-0 left-2 h-full w-px" />

        <div className="space-y-6">
          {steps.map((status, index) => {
            const isCompleted = index < currentIndex;
            const isActive = index === currentIndex;
            const isFinal = status === "cancelled" || status === "rejected";
            const timestamp = getTimestamp(order, status as Order["status"]);

            return (
              <div key={status} className="relative">
                <span
                  className={cn(
                    "absolute top-1 left-0 size-3 rounded-full border-2",
                    isFinal
                      ? "border-destructive bg-destructive"
                      : isCompleted
                        ? "border-primary bg-primary"
                        : isActive
                          ? "border-primary bg-background animate-pulse shadow-[0_0_0_4px_rgba(59,130,246,0.15)]"
                          : "border-muted bg-muted",
                  )}
                />
                <div className="ml-6 space-y-1">
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        isFinal
                          ? "text-destructive"
                          : isCompleted || isActive
                            ? "text-foreground"
                            : "text-muted-foreground",
                      )}
                    >
                      {STATUS_LABELS[status as Order["status"]]}
                    </p>
                    {isFinal && (
                      <span className="text-destructive ml-2 text-xs">{`(${
                        order.cancellation_reason
                      })`}</span>
                    )}
                    {isActive && !isFinal && (
                      <span className="text-muted-foreground text-xs">
                        Current
                      </span>
                    )}
                  </div>
                  {timestamp && (
                    <p className="text-muted-foreground text-xs">
                      {formatDate(timestamp)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
