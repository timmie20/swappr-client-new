"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatNaira, formatStorageCapacity } from "@/lib/format";
import { VendorGroup } from "./hooks/use-vendor-cart";
import { Icons } from "@/components/icons";
import { TypographyP } from "@/components/typography/p";

const MAX_PREVIEW = 1; // thumbnails shown before "+N more"

interface VendorCartCardProps {
  group: VendorGroup;
  onEditSelection: (vendorId: string) => void;
}

export function VendorCartCard({
  group,
  onEditSelection,
}: VendorCartCardProps) {
  const router = useRouter();
  const preview = group.items.slice(0, MAX_PREVIEW);
  const overflow = group.items.length - MAX_PREVIEW;

  return (
    <div className="border-sidebar-border overflow-hidden rounded-xl border">
      {/* ── Vendor header ── */}
      <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100">
          <Icons.store size={14} />
        </span>
        <p className="min-w-0 flex-1 truncate text-sm font-semibold">
          {group.businessName}
        </p>
        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
          {group.totalItems} {group.totalItems === 1 ? "item" : "items"}
        </span>
      </div>

      {/* ── Item previews ── */}
      <div className="divide-y divide-slate-50 px-4">
        {preview.map((item) => {
          const meta: string[] = [];
          if (item.color) meta.push(item.color);
          if (typeof item.storage === "number")
            meta.push(formatStorageCapacity(item.storage));

          return (
            <div key={item.id} className="flex items-center gap-3 py-3">
              {/* thumbnail */}
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-slate-100">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Icons.store size={16} />
                  </div>
                )}
              </div>

              {/* name + meta */}
              <div className="min-w-0 flex-1">
                <TypographyP className="text-foreground truncate text-sm font-medium">
                  {item.title}
                </TypographyP>
                <p className="text-muted-foreground text-[11px]">
                  Qty {item.quantity}
                  {meta.length > 0 && ` · ${meta.join(" · ")}`}
                </p>
              </div>

              {/* line price */}
              <p className="shrink-0 text-sm font-semibold">
                {formatNaira(item.price * item.quantity)}
              </p>
            </div>
          );
        })}

        {/* overflow indicator */}
        {overflow > 0 && (
          <p className="text-muted-foreground py-2.5 text-[11px] font-medium">
            +{overflow} more {overflow === 1 ? "item" : "items"} — edit to view
            all
          </p>
        )}
      </div>

      {/* ── Subtotal + CTAs ── */}
      <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">
        {/* subtotal row */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium">Subtotal</span>
          <span className="text-sm font-bold text-slate-900">
            {formatNaira(group.subtotal)}
          </span>
        </div>

        {/* CTA row */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1 cursor-pointer text-xs"
            onClick={() => onEditSelection(group.vendorId)}
          >
            <Icons.edit size={12} />
            Edit Selection
          </Button>

          <Button
            type="button"
            size="sm"
            className="flex-1 cursor-pointer text-xs"
            onClick={() => router.push(`/cart?vendor=${group.vendorId}`)}
          >
            <Icons.product size={12} />
            Checkout Items
          </Button>
        </div>
      </div>
    </div>
  );
}
