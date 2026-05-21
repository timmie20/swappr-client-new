import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Order } from "@/types/orders";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  XCircle,
} from "lucide-react";

const ORDER_STATUS_META: Record<
  Order["status"],
  { label: string; className: string; icon: typeof Clock }
> = {
  pending: {
    label: "Pending",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: Clock,
  },
  confirmed: {
    label: "Confirmed",
    className: "border-blue-200 bg-blue-50 text-blue-700",
    icon: CheckCircle2,
  },
  processing: {
    label: "Processing",
    className: "border-sky-200 bg-sky-50 text-sky-700",
    icon: Package,
  },
  shipped: {
    label: "Shipped",
    className: "border-indigo-200 bg-indigo-50 text-indigo-700",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    className: "border-red-200 bg-red-50 text-red-700",
    icon: XCircle,
  },
  rejected: {
    label: "Rejected",
    className: "border-rose-200 bg-rose-50 text-rose-700",
    icon: AlertTriangle,
  },
};

const PAYMENT_STATUS_META: Record<
  Order["payment_status"],
  { label: string; className: string; icon: typeof Clock }
> = {
  unpaid: {
    label: "Unpaid",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: Clock,
  },
  paid: {
    label: "Paid",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },
  failed: {
    label: "Failed",
    className: "border-red-200 bg-red-50 text-red-700",
    icon: XCircle,
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
