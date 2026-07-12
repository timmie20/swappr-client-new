import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatNaira } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Order } from "@/types/orders";
import {
  Clock,
  Hash,
  MapPin,
  Phone,
  Store,
  Truck,
  User,
} from "lucide-react";

const NOT_YET_AVAILABLE = "Not yet available";

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string | null;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="text-muted-foreground mt-0.5 size-4" />
      <div className="space-y-1">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-muted-foreground text-xs">
          {value ?? NOT_YET_AVAILABLE}
        </p>
      </div>
    </div>
  );
}

export function OrderFulfillment({ order }: { order: Order }) {
  const isPickup = order.fulfillment_type === "pickup";
  const hasShipped = order.status === "shipped" || order.status === "delivered";

  return (
    <section className="border-border border-t pt-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">Fulfillment</h3>
          <p className="text-muted-foreground text-sm">
            {isPickup
              ? "How you'll collect this order."
              : "How this order will reach you."}
          </p>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "gap-1.5",
            isPickup
              ? "border-violet-200 bg-violet-50 text-violet-700"
              : "border-indigo-200 bg-indigo-50 text-indigo-700",
          )}
        >
          {isPickup ? <Store className="size-3" /> : <Truck className="size-3" />}
          {isPickup ? "Pickup" : "Delivery"}
        </Badge>
      </div>

      {!hasShipped ? (
        <p className="text-muted-foreground border-border border p-4 text-xs">
          {isPickup ? "Pickup" : "Delivery"} details will appear here once
          this order ships.
        </p>
      ) : (
        <div className="border-border space-y-4 border p-4">
          {isPickup ? (
            <>
              <DetailRow
                icon={MapPin}
                label="Pickup location"
                value={order.pickup_location}
              />
              <Separator />
              <DetailRow
                icon={Clock}
                label="Pickup date & time slot"
                value={
                  order.pickup_date && order.pickup_time_slot
                    ? `${formatDate(order.pickup_date)} · ${order.pickup_time_slot}`
                    : null
                }
              />
              <Separator />
              <DetailRow
                icon={Hash}
                label="Pickup code"
                value={order.tracking_number}
              />
            </>
          ) : (
            <>
              <DetailRow
                icon={User}
                label="Rider"
                value={order.rider_name}
              />
              <Separator />
              <DetailRow
                icon={Phone}
                label="Rider phone"
                value={order.rider_phone}
              />
              <Separator />
              <DetailRow
                icon={Truck}
                label="Delivery fee"
                value={
                  order.delivery_fee !== null
                    ? formatNaira(order.delivery_fee)
                    : null
                }
              />
              <Separator />
              <DetailRow
                icon={Clock}
                label="Estimated arrival"
                value={
                  order.estimated_arrival
                    ? formatDate(order.estimated_arrival)
                    : null
                }
              />
              <Separator />
              <DetailRow
                icon={Hash}
                label="Tracking number"
                value={order.tracking_number}
              />
            </>
          )}

          <p className="text-muted-foreground text-[11px]">
            Reference number for your order, not a courier tracking ID.
          </p>
        </div>
      )}
    </section>
  );
}
