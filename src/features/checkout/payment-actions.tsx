"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CreditCard, Lock } from "lucide-react";

/** Blue-bordered "Pay with Paystack" badge */
export function PaystackBadge() {
  return (
    <div className="border-primary bg-sidebar-primary-foreground flex items-center justify-between rounded-xl border px-4 py-3">
      {/* left: icon + label */}
      <div className="flex items-center gap-2.5">
        <CreditCard size={18} className="text-primary" />
        <span className="text-primary text-sm font-semibold">
          Pay with Paystack
        </span>
      </div>

      {/* right: secure badge */}
      <div className="text-primary/70 flex items-center gap-1 text-[11px] font-medium">
        <Lock size={11} />
        <span>Secured</span>
      </div>
    </div>
  );
}

interface PayNowButtonProps {
  isPending: boolean;
  isExpired: boolean;
  onClick: () => void;
}

/** CTA button with loading spinner */
export function PayNowButton({
  isPending,
  isExpired,
  onClick,
}: PayNowButtonProps) {
  return (
    <Button
      type="button"
      size="lg"
      className="mt-20 h-13 w-full text-sm font-semibold tracking-wide text-white transition-all active:scale-[0.98] disabled:opacity-50"
      disabled={isPending || isExpired}
      onClick={onClick}
    >
      {isPending ? (
        <span className="inline-flex items-center gap-2">
          <Spinner />
          Processing…
        </span>
      ) : isExpired ? (
        "Session Expired"
      ) : (
        "Pay Now"
      )}
    </Button>
  );
}
