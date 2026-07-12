import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Order } from "@/types/orders";

const ORDER_STATUS_META: Record<
  Order["status"],
  { label: string; className: string; icon: typeof Icons.clock }
> = {
  pending: {
    label: "Pending",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: Icons.clock,
  },
  confirmed: {
    label: "Confirmed",
    className: "border-blue-200 bg-blue-50 text-blue-700",
    icon: Icons.checkCircle,
  },
  processing: {
    label: "Processing",
    className: "border-sky-200 bg-sky-50 text-sky-700",
    icon: Icons.package,
  },
  shipped: {
    label: "Shipped",
    className: "border-indigo-200 bg-indigo-50 text-indigo-700",
    icon: Icons.truck,
  },
  delivered: {
    label: "Delivered",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: Icons.checkCircle,
  },
  cancelled: {
    label: "Cancelled",
    className: "border-red-200 bg-red-50 text-red-700",
    icon: Icons.xCircle,
  },
  rejected: {
    label: "Rejected",
    className: "border-rose-200 bg-rose-50 text-rose-700",
    icon: Icons.warning,
  },
};

const PAYMENT_STATUS_META: Record<
  Order["payment_status"],
  { label: string; className: string; icon: typeof Icons.clock }
> = {
  unpaid: {
    label: "Unpaid",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: Icons.clock,
  },
  paid: {
    label: "Paid",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: Icons.checkCircle,
  },
  failed: {
    label: "Failed",
    className: "border-red-200 bg-red-50 text-red-700",
    icon: Icons.xCircle,
  },
};

export function OrderStatusBadge({
  status,
  className,
}: {
  status: Order["status"];
  className?: string;
}) {
  const meta = ORDER_STATUS_META[status];
  const Icon = meta.icon;

  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5", meta.className, className)}
    >
      <Icon className="size-3" />
      {meta.label}
    </Badge>
  );
}

export function PaymentStatusBadge({
  status,
  className,
}: {
  status: Order["payment_status"];
  className?: string;
}) {
  const meta = PAYMENT_STATUS_META[status];
  const Icon = meta.icon;

  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5", meta.className, className)}
    >
      <Icon className="size-3" />
      {meta.label}
    </Badge>
  );
}
