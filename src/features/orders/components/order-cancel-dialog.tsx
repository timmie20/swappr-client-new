"use client";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useCancelOrder } from "@/hooks/use-orders";
import type { Order } from "@/types/orders";

const CANCELLATION_REASONS = [
  "Changed my mind",
  "Ordered by mistake",
  "Found a better price elsewhere",
  "Delivery is taking too long",
  "Want to change delivery address",
  "Want to change payment method",
  "Ordered the wrong item",
  "No longer need the item",
  "Payment issue",
  "Other",
] as const;

type CancellationReason = (typeof CANCELLATION_REASONS)[number];

export function OrderCancelDialog({ order }: { order: Order }) {
  const cancelOrder = useCancelOrder();
  const [open, setOpen] = useState(false);
  const [selectedReason, setSelectedReason] =
    useState<CancellationReason>("Changed my mind");
  const [customReason, setCustomReason] = useState("");

  const canCancel =
    order.payment_status === "unpaid" && order.status === "pending";

  const cancelReason =
    selectedReason === "Other" ? customReason.trim() : selectedReason;

  const handleDialogChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setSelectedReason("Changed my mind");
      setCustomReason("");
    }
  };

  const handleCancel = () => {
    if (!cancelReason || cancelOrder.isPending) return;

    cancelOrder.mutate({
      orderId: order.id,
      cancellation_reason: cancelReason,
    });
  };

  if (!canCancel) return null;

  return (
    <div className="pt-2">
      <AlertDialog open={open} onOpenChange={handleDialogChange}>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            className="w-full cursor-pointer rounded-none"
            disabled={cancelOrder.isPending}
          >
            {cancelOrder.isPending ? (
              <span className="inline-flex items-center gap-2">
                <Spinner />
                Cancelling...
              </span>
            ) : (
              "Cancel order"
            )}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
            <AlertDialogDescription>
              This order has not been paid yet. Cancelling will remove it from
              your active orders. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for cancellation</Label>
              <Select
                value={selectedReason}
                onValueChange={(value) =>
                  setSelectedReason(value as CancellationReason)
                }
              >
                <SelectTrigger id="reason" className="w-full rounded-none">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  {CANCELLATION_REASONS.map((reason) => (
                    <SelectItem key={reason} value={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedReason === "Other" && (
              <div className="space-y-2">
                <Label htmlFor="other-reason">Tell us more</Label>
                <Textarea
                  id="other-reason"
                  value={customReason}
                  onChange={(event) => setCustomReason(event.target.value)}
                  placeholder="Share the reason for cancelling this order"
                  className="rounded-none"
                />
              </div>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Keep order
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              className="cursor-pointer"
              onClick={handleCancel}
              disabled={cancelOrder.isPending || !cancelReason}
            >
              {cancelOrder.isPending ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner />
                  Cancelling...
                </span>
              ) : (
                "Cancel order"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
