"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatNaira, formatStorageCapacity } from "@/lib/format";
import type { OrderItem } from "@/types/orders";
import { ChevronDown } from "lucide-react";

interface OrderAccordionProps {
  items: OrderItem[];
  totalAmount: number | string;
}

export function OrderAccordion({ items, totalAmount }: OrderAccordionProps) {
  return (
    <Accordion type="single" collapsible defaultValue="order-items">
      <AccordionItem
        value="order-items"
        className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm"
      >
        {/* ── Trigger ── */}
        <AccordionTrigger className="group px-5 py-4 transition-colors hover:bg-slate-50 hover:no-underline [&>svg]:hidden">
          <div className="flex w-full items-center justify-between">
            {/* left: title + item count */}
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-semibold tracking-tight text-slate-800">
                Your Orders
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>

            {/* right: total + chevron */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">
                {formatNaira(Number(totalAmount))}
              </span>
              <ChevronDown
                size={15}
                className="text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
              />
            </div>
          </div>
        </AccordionTrigger>

        {/* ── Content ── */}
        <AccordionContent className="px-0 pb-0">
          <div className="divide-y divide-slate-100 border-t border-slate-100">
            {items.map((item) => (
              <OrderItemRow key={item.id} item={item} />
            ))}
          </div>

          {/* total footer row */}
          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3.5">
            <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
              Total
            </span>
            <span className="text-sm font-bold text-slate-900">
              {formatNaira(Number(totalAmount))}
            </span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function OrderItemRow({ item }: { item: OrderItem }) {
  const meta: string[] = [];
  if (item.color) meta.push(item.color);
  if (typeof item.storage === "number")
    meta.push(formatStorageCapacity(item.storage));

  return (
    <div className="flex items-start justify-between gap-4 px-5 py-3.5">
      {/* product info */}
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="truncate text-sm leading-snug font-medium text-slate-800">
          {item.product_name}
        </p>
        <p className="text-[11px] text-slate-400">
          Qty&nbsp;
          <span className="font-semibold text-slate-600">{item.quantity}</span>
          {meta.length > 0 && (
            <span className="ml-1 text-slate-400">· {meta.join(" · ")}</span>
          )}
        </p>
      </div>

      {/* pricing */}
      <div className="shrink-0 space-y-0.5 text-right">
        <p className="text-[11px] text-slate-400">
          {formatNaira(Number(item.unit_price))} × {item.quantity}
        </p>
        <p className="text-sm font-semibold text-slate-800">
          {formatNaira(Number(item.subtotal))}
        </p>
      </div>
    </div>
  );
}
