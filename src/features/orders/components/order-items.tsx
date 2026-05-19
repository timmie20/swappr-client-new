"use client";

import { SafeImage } from "@/components/safe-image";
import { formatNaira, formatStorageCapacity } from "@/lib/format";
import type { OrderItem } from "@/types/orders";

const fallbackImage = "/assets/images/placeholder.jpg";

function getItemImage(item: OrderItem) {
  return (
    item.image ||
    item.product_image ||
    item.product?.images?.[0] ||
    fallbackImage
  );
}

export function OrderItems({ items }: { items: OrderItem[] }) {
  return (
    <section className="border-border border-t pt-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold">Items</h3>
        <p className="text-muted-foreground text-sm">
          Review the products included in this order.
        </p>
      </div>

      <div className="border-border border">
        {items.map((item) => {
          const meta: string[] = [];
          if (item.color) meta.push(item.color);
          if (typeof item.storage === "number") {
            meta.push(formatStorageCapacity(item.storage));
          }
          if (item.condition) meta.push(item.condition);

          return (
            <div
              key={item.id}
              className="border-border flex items-center gap-4 border-b p-4 last:border-b-0"
            >
              <div className="bg-muted relative size-16 overflow-hidden">
                <SafeImage
                  src={getItemImage(item)}
                  alt={item.product_name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-foreground text-sm font-semibold">
                  {item.product_name}
                </p>
                <p className="text-muted-foreground text-xs">
                  Qty {item.quantity}
                  {meta.length > 0 ? ` · ${meta.join(" · ")}` : ""}
                </p>
              </div>

              <div className="text-right">
                <p className="text-foreground text-sm font-semibold">
                  {formatNaira(item.subtotal)}
                </p>
                <p className="text-muted-foreground text-xs">
                  {formatNaira(item.unit_price)} x {item.quantity}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
