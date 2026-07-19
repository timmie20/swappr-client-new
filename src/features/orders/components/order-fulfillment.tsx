import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { deslug, formatDate, formatNaira, formatTimeRange } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Order } from "@/types/orders";

const NOT_YET_AVAILABLE = "Not yet available";

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-muted-foreground mt-0.5 [&>svg]:size-4">
        {icon}
      </span>
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
  const { fulfillment, tracking_number, status } = order;

  const isPickup = fulfillment?.fulfillment_type === "pickup";
  const hasShipped = status === "shipped" || order.status === "delivered";

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
          {isPickup ? (
            <Icons.store className="size-3" />
          ) : (
            <Icons.truck className="size-3" />
          )}
          {isPickup ? "Pickup" : "Delivery"}
        </Badge>
      </div>

      {!hasShipped ? (
        <p className="text-muted-foreground border-border border p-4 text-xs">
          {isPickup ? "Pickup" : "Delivery"} details will appear here once this
          order ships.
        </p>
      ) : (
        <div className="border-border space-y-4 border p-4">
          {isPickup ? (
            <>
              <DetailRow
                icon={<Icons.mapPin />}
                label="Pickup location"
                value={fulfillment?.pickup_location || NOT_YET_AVAILABLE}
              />
              <Separator />
              <DetailRow
                icon={<Icons.clock />}
                label="Pickup date & time slot"
                value={
                  fulfillment?.pickup_date &&
                  fulfillment?.pickup_time_from &&
                  fulfillment?.pickup_time_to
                    ? `${formatDate(fulfillment.pickup_date)} · ${formatTimeRange(fulfillment.pickup_time_from, fulfillment.pickup_time_to)}`
                    : null
                }
              />
              <Separator />
              <DetailRow
                icon={<Icons.hash />}
                label="Pickup code"
                value={fulfillment?.pickup_code || NOT_YET_AVAILABLE}
              />
            </>
          ) : (
            <>
              <DetailRow
                icon={<Icons.user />}
                label="Rider"
                value={fulfillment?.rider_name || NOT_YET_AVAILABLE}
              />
              <Separator />
              <DetailRow
                icon={<Icons.phone />}
                label="Rider phone"
                value={fulfillment?.rider_phone || NOT_YET_AVAILABLE}
              />
              <Separator />
              <DetailRow
                icon={<Icons.truck />}
                label="Delivery fee"
                value={
                  fulfillment?.delivery_fee !== null
                    ? formatNaira(fulfillment?.delivery_fee)
                    : null
                }
              />
              <Separator />
              <DetailRow
                icon={<Icons.clock />}
                label="Estimated arrival"
                value={
                  fulfillment?.estimated_arrival
                    ? deslug(fulfillment.estimated_arrival)
                    : null
                }
              />
              <Separator />
              <DetailRow
                icon={<Icons.hash />}
                label="Tracking number"
                value={tracking_number || NOT_YET_AVAILABLE}
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
