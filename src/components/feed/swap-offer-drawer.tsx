"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFeedStore } from "@/store/feed-store";
import { formatNaira } from "@/lib/format";
import {
  SwapFormStep,
  SwapConfirmStep,
  SwapSentStep,
  type SwapOffer,
} from "./swap-steps";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import Image from "next/image";
import type { Valuation } from "@/types/api";
import { useIsAuthenticated } from "@/lib/auth/session-client";

export function SwapOfferDrawer() {
  const isAuth = useIsAuthenticated();

  const product = useFeedStore((s) => s.swapOfferProduct);
  const closeSwapOffer = useFeedStore((s) => s.closeSwapOffer);

  const [step, setStep] = useState<"form" | "confirm" | "sent">("form");
  const [offer, setOffer] = useState<SwapOffer>({
    valuationId: "",
    additionalNote: "",
  });
  const [selectedValuation, setSelectedValuation] = useState<Valuation | null>(
    null,
  );

  const isOpen = !!product;

  const handleClose = () => {
    closeSwapOffer();
    setTimeout(() => {
      setStep("form");
      setOffer({
        valuationId: "",
        additionalNote: "",
      });
      setSelectedValuation(null);
    }, 400);
  };

  const handleConfirm = () => {
    if (!offer.valuationId || !selectedValuation) return;
    setStep("confirm");
  };

  const handleSubmit = () => {
    // TODO: Send swap offer to backend
    // Payload: { product_id: product.id, valuation_id: offer.valuationId, additional_notes: offer.additionalNote }
    console.log("Sending swap offer:", {
      product_id: product?.id,
      valuation_id: offer.valuationId,
      additional_notes: offer.additionalNote,
    });

    setStep("sent");
    // setTimeout(handleClose, 2500);
  };

  if (!product) return null;

  // Don't render if not authenticated (will redirect via useEffect)
  if (!isAuth) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent
        side="right"
        showCloseButton={true}
        forceMount
        className="w-full! sm:max-w-md!"
      >
        <SheetHeader>
          {step !== "sent" && (
            <>
              <SheetTitle>Make a Swap Offer</SheetTitle>
              <SheetDescription>
                Tell the seller what you&apos;ll offer
              </SheetDescription>
            </>
          )}
          {/* <button
            onClick={handleClose}
            className="text-muted-foreground hover:bg-muted absolute top-4 right-4 cursor-pointer rounded-full p-2 transition-colors"
          >
            <Icons.close size={24} />
            <span className="sr-only">Close</span>
          </button> */}
        </SheetHeader>

        {/* Target product preview */}

        {step !== "sent" && (
          <div className="flex items-center gap-3 border-b border-[#E5E7EB] bg-[#F8F9FA] px-5 py-3">
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={64}
              height={64}
              priority
              className="h-14 w-14 rounded-lg border border-[#E5E7EB] object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                {product.brand}
              </p>
              <p className="text-foreground truncate text-sm font-bold">
                {product.title}
              </p>
              <p className="text-primary text-xs font-semibold">
                {formatNaira(product.price)}
              </p>
            </div>
            {/* Arrow */}
            <div className="text-muted-foreground flex flex-col items-center gap-0.5">
              <Icons.exchange size={16} />
              <span className="text-primary text-[9px] font-semibold">
                SWAP
              </span>
            </div>
          </div>
        )}

        {/* Scroll content */}
        <div className="w-full flex-1 overflow-y-auto p-5">
          <AnimatePresence mode="wait">
            {step === "form" && (
              <SwapFormStep
                product={product}
                offer={offer}
                onOfferChange={setOffer}
                selectedValuation={selectedValuation}
                onValuationSelect={setSelectedValuation}
              />
            )}

            {step === "confirm" && selectedValuation && (
              <SwapConfirmStep offer={offer} valuation={selectedValuation} />
            )}

            {step === "sent" && <SwapSentStep />}
          </AnimatePresence>
        </div>

        {/* Footer CTA */}
        {step !== "sent" && (
          <div className="border-t border-[#E5E7EB] px-5 py-4">
            <div className="flex gap-3">
              {step === "confirm" && (
                <Button
                  onClick={() => setStep("form")}
                  className="flex h-11 flex-1"
                  variant="outline"
                >
                  Back
                </Button>
              )}
              <Button
                onClick={step === "form" ? handleConfirm : handleSubmit}
                disabled={!offer.valuationId}
                className="flex h-11 flex-1 text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {step === "form" ? "Confirm Offer" : "Send Swap Offer"}
                <Icons.arrowRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
