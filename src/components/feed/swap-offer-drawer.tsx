"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconArrowsLeftRight,
  IconX,
  IconCheck,
  IconChevronRight,
} from "@tabler/icons-react";
import { useFeedStore } from "@/store/feed-store";
import { formatNaira } from "@/lib/format";

const SWAP_CONDITION_OPTIONS = [
  "New",
  "UK Used",
  "Nigerian Used",
  "Refurbished",
] as const;

interface SwapOffer {
  deviceName: string;
  brand: string;
  storage: string;
  condition: (typeof SWAP_CONDITION_OPTIONS)[number];
  additionalNote: string;
}

export function SwapOfferDrawer() {
  const product = useFeedStore((s) => s.swapOfferProduct);
  const closeSwapOffer = useFeedStore((s) => s.closeSwapOffer);

  const [step, setStep] = useState<"form" | "confirm" | "sent">("form");
  const [offer, setOffer] = useState<SwapOffer>({
    deviceName: "",
    brand: "",
    storage: "",
    condition: "UK Used",
    additionalNote: "",
  });

  const isOpen = !!product;

  const handleClose = () => {
    closeSwapOffer();
    setTimeout(() => {
      setStep("form");
      setOffer({
        deviceName: "",
        brand: "",
        storage: "",
        condition: "UK Used",
        additionalNote: "",
      });
    }, 400);
  };

  const handleSubmit = () => {
    if (!offer.deviceName || !offer.brand) return;
    setStep("confirm");
  };

  const handleConfirm = () => {
    setStep("sent");
    setTimeout(handleClose, 2500);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && product && (
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5F1]">
                  <IconArrowsLeftRight size={16} className="text-[#1A6B5A]" />
                </div>
                <div>
                  <h2 className="font-switzer text-sm font-bold text-[#1A1A1A]">
                    Make a Swap Offer
                  </h2>
                  <p className="text-[11px] text-[#6B7280]">
                    Tell the seller what you&apos;ll offer
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#6B7280] hover:bg-[#F3F4F6]"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* Target product preview */}
            <div className="flex items-center gap-3 border-b border-[#E5E7EB] bg-[#F8F9FA] px-5 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt={product.title}
                className="h-14 w-14 rounded-xl border border-[#E5E7EB] object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold tracking-wide text-[#9CA3AF] uppercase">
                  {product.brand}
                </p>
                <p className="truncate text-sm font-bold text-[#1A1A1A]">
                  {product.title}
                </p>
                <p className="text-xs font-semibold text-[#1A6B5A]">
                  {formatNaira(product.price)}
                </p>
              </div>
              {/* Arrow */}
              <div className="flex flex-col items-center gap-0.5 text-[#D1D5DB]">
                <IconArrowsLeftRight size={20} className="text-[#1A6B5A]" />
                <span className="text-[9px] font-semibold text-[#1A6B5A]">
                  SWAP
                </span>
              </div>
            </div>

            {/* Scroll content */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <AnimatePresence mode="wait">
                {step === "form" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-4"
                  >
                    <p className="text-sm font-semibold text-[#1A1A1A]">
                      What are you offering in exchange?
                    </p>

                    {/* Suggested accepts */}
                    {product.swapFor && product.swapFor.length > 0 && (
                      <div className="rounded-xl border border-[#E8F5F1] bg-[#F0FAF7] p-3">
                        <p className="mb-2 text-[11px] font-semibold tracking-wide text-[#1A6B5A] uppercase">
                          Seller will accept
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {product.swapFor.map((item) => (
                            <button
                              key={item}
                              onClick={() =>
                                setOffer((prev) => ({
                                  ...prev,
                                  deviceName: item
                                    .split(" ")
                                    .slice(1)
                                    .join(" "),
                                  brand: item.split(" ")[0],
                                }))
                              }
                              className="rounded-full border border-[#1A6B5A]/20 bg-white px-2.5 py-1 text-[11px] font-medium text-[#1A6B5A] transition-colors hover:bg-[#1A6B5A] hover:text-white"
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Device name */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-[#374151]">
                        Device Name *
                      </label>
                      <input
                        type="text"
                        value={offer.deviceName}
                        onChange={(e) =>
                          setOffer((p) => ({
                            ...p,
                            deviceName: e.target.value,
                          }))
                        }
                        placeholder="e.g. iPhone 14 Pro, Galaxy S23"
                        className="h-10 w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3 text-sm text-[#1A1A1A] placeholder-[#9CA3AF] transition-all outline-none focus:border-[#1A6B5A] focus:ring-2 focus:ring-[#1A6B5A]/20"
                      />
                    </div>

                    {/* Brand */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-[#374151]">
                        Brand *
                      </label>
                      <input
                        type="text"
                        value={offer.brand}
                        onChange={(e) =>
                          setOffer((p) => ({ ...p, brand: e.target.value }))
                        }
                        placeholder="e.g. Apple, Samsung, Google"
                        className="h-10 w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3 text-sm text-[#1A1A1A] placeholder-[#9CA3AF] transition-all outline-none focus:border-[#1A6B5A] focus:ring-2 focus:ring-[#1A6B5A]/20"
                      />
                    </div>

                    {/* Storage */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-[#374151]">
                        Storage
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["64GB", "128GB", "256GB", "512GB", "1TB"].map((s) => (
                          <button
                            key={s}
                            onClick={() =>
                              setOffer((p) => ({ ...p, storage: s }))
                            }
                            className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                              offer.storage === s
                                ? "border-[#1A6B5A] bg-[#1A6B5A] text-white"
                                : "border-[#E5E7EB] text-[#6B7280] hover:border-[#1A6B5A]/50"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Condition */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-[#374151]">
                        Condition
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SWAP_CONDITION_OPTIONS.map((c) => (
                          <button
                            key={c}
                            onClick={() =>
                              setOffer((p) => ({ ...p, condition: c }))
                            }
                            className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                              offer.condition === c
                                ? "border-[#1A6B5A] bg-[#1A6B5A] text-white"
                                : "border-[#E5E7EB] text-[#6B7280] hover:border-[#1A6B5A]/50"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Note */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-[#374151]">
                        Additional Note (optional)
                      </label>
                      <textarea
                        value={offer.additionalNote}
                        onChange={(e) =>
                          setOffer((p) => ({
                            ...p,
                            additionalNote: e.target.value,
                          }))
                        }
                        placeholder="Any extra info about your device or the swap..."
                        rows={3}
                        className="w-full resize-none rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2.5 text-sm text-[#1A1A1A] placeholder-[#9CA3AF] transition-all outline-none focus:border-[#1A6B5A] focus:ring-2 focus:ring-[#1A6B5A]/20"
                      />
                    </div>
                  </motion.div>
                )}

                {step === "confirm" && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-4"
                  >
                    <h3 className="text-sm font-bold text-[#1A1A1A]">
                      Confirm your swap offer
                    </h3>
                    <div className="divide-y divide-[#F3F4F6] rounded-2xl border border-[#E5E7EB]">
                      {[
                        {
                          label: "Device",
                          value: `${offer.brand} ${offer.deviceName}`,
                        },
                        {
                          label: "Storage",
                          value: offer.storage || "Not specified",
                        },
                        { label: "Condition", value: offer.condition },
                        offer.additionalNote
                          ? { label: "Note", value: offer.additionalNote }
                          : null,
                      ]
                        .filter(Boolean)
                        .map((row) => (
                          <div
                            key={row!.label}
                            className="flex items-center justify-between px-4 py-3"
                          >
                            <span className="text-xs text-[#9CA3AF]">
                              {row!.label}
                            </span>
                            <span className="text-xs font-semibold text-[#1A1A1A]">
                              {row!.value}
                            </span>
                          </div>
                        ))}
                    </div>
                    <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3 text-xs text-[#92400E]">
                      By sending this offer, you agree to give the seller 48
                      hours to respond.
                    </div>
                  </motion.div>
                )}

                {step === "sent" && (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        damping: 12,
                        stiffness: 200,
                        delay: 0.1,
                      }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F5F1]"
                    >
                      <IconCheck size={36} className="text-[#1A6B5A]" />
                    </motion.div>
                    <div>
                      <h3 className="font-switzer text-lg font-bold text-[#1A1A1A]">
                        Swap Offer Sent! 🎉
                      </h3>
                      <p className="mt-1 text-sm text-[#6B7280]">
                        The seller will respond within 48 hours. We&apos;ll
                        notify you.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer CTA */}
            {step !== "sent" && (
              <div className="border-t border-[#E5E7EB] px-5 py-4">
                <div className="flex gap-3">
                  {step === "confirm" && (
                    <button
                      onClick={() => setStep("form")}
                      className="flex h-11 flex-1 items-center justify-center rounded-xl border border-[#E5E7EB] text-sm font-semibold text-[#6B7280] hover:bg-[#F9FAFB]"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={step === "form" ? handleSubmit : handleConfirm}
                    disabled={!offer.deviceName || !offer.brand}
                    className="hover:bg-swappr-teal-light flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#1A6B5A] text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {step === "form" ? (
                      <>
                        Review Offer
                        <IconChevronRight size={16} />
                      </>
                    ) : (
                      <>
                        Send Swap Offer
                        <IconArrowsLeftRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
