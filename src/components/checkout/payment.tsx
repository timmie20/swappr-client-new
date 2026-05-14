"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCheckoutPay } from "@/hooks/use-checkout";
import { useCheckoutStore } from "@/store/checkout-store";
import { setPaystackReference } from "@/lib/paystack-reference";

export default function Payment({
  onBack,
  direction,
}: {
  onBack: () => void;
  direction: number;
}) {
  const pay = useCheckoutPay();

  const session = useCheckoutStore((s) => s.session);
  const delivery_address = useCheckoutStore((s) => s.delivery_address);
  const contact_phone = useCheckoutStore((s) => s.contact_phone);
  const isExpired = useCheckoutStore((s) => s.isExpired);
  const setIsPaying = useCheckoutStore((s) => s.setIsPaying);
  const resetCheckout = useCheckoutStore((s) => s.reset);

  const canPay =
    !!session && !!delivery_address && !!contact_phone && !isExpired;

  const handlePayNow = () => {
    if (!delivery_address || !contact_phone) {
      toast.error("Please complete delivery and contact details first.");
      return;
    }

    if (isExpired) {
      toast.error("Your session has expired. Please restart checkout.");
      return;
    }

    setIsPaying(true);
    pay.mutate(
      {
        delivery_address,
        contact_phone,
      },
      {
        onSuccess: (res) => {
          setPaystackReference(res.data.reference);
          window.location.href = res.data.authorization_url;
        },
        onError: (err) => {
          if (err.statusCode === 404) {
            toast.error("Session not found. Restarting checkout.");
            resetCheckout();
            window.location.href = "/";
            return;
          }
          if (err.statusCode === 410) {
            toast.error("Your session has expired. Please restart checkout.");
            resetCheckout();
            window.location.href = "/";
            return;
          }
          if (err.statusCode === 500) {
            toast.error("Paystack initialization failed. Please try again.");
            return;
          }
          toast.error(err.message || "Unable to initialize payment");
        },
        onSettled: () => {
          setIsPaying(false);
        },
      },
    );
  };

  const slideVariants = {
    enter: { opacity: 0, x: direction > 0 ? 60 : -60 },
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      x: direction > 0 ? -60 : 60,
      transition: {
        duration: 0.22,
        ease: [0.36, 0, 0.66, 0] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Payment</CardTitle>
          <p className="text-muted-foreground text-sm">
            You will be redirected to Paystack to complete payment.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onBack}
              className="flex-1 gap-2 rounded-full"
              disabled={pay.isPending}
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <Button
              type="button"
              size="lg"
              onClick={handlePayNow}
              className="flex-1 rounded-full"
              disabled={!canPay || pay.isPending}
            >
              {pay.isPending ? "Initializing…" : "Pay Now"}
            </Button>
          </div>

          <div className="text-muted-foreground flex flex-wrap gap-x-3 gap-y-2 text-xs">
            <Link
              href="#"
              className="hover:text-foreground underline underline-offset-4"
            >
              Refund policy
            </Link>
            <Link
              href="#"
              className="hover:text-foreground underline underline-offset-4"
            >
              Privacy policy
            </Link>
            <Link
              href="#"
              className="hover:text-foreground underline underline-offset-4"
            >
              Terms of service
            </Link>
            <Link
              href="#"
              className="hover:text-foreground underline underline-offset-4"
            >
              Cancellations
            </Link>
            <Link
              href="#"
              className="hover:text-foreground underline underline-offset-4"
            >
              Contact
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
