"use client";

import { IconArrowRight } from "@tabler/icons-react";
// import { useFeedStore } from "@/store/feed-store";

import { Icons } from "../icons";
import { TypographyMuted } from "../typography/muted";
import { TypographyH2 } from "../typography/h2";
import { Button } from "../ui/button";
// import { ErrorState } from "../error-state";

import { EmptyState } from "../empty-state";

export function DealOfWeekSection() {
  // const openSwapOffer = useFeedStore((s) => s.openSwapOffer);
  // const addToCart = useFeedStore((s) => s.addToCart);

  return (
    <section className="bg-linear-to-br from-[#F0FAF7] via-white to-[#FFF7ED] py-10">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        {/* Section header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-start gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4762A]/10">
              <Icons.flame size={18} className="text-[#F4762A]" />
            </div>
            <div>
              <TypographyH2 className="border-0">
                Deals of the Week
              </TypographyH2>
              <TypographyMuted>
                No promo code needed · Limited time offers
              </TypographyMuted>
            </div>
          </div>
          <Button
            className="text-accent-foreground hidden cursor-pointer text-sm font-semibold sm:inline-flex"
            variant="link"
          >
            View All
            <IconArrowRight size={14} />
          </Button>
        </div>

        {/* Deals grid */}
        <div className="flex w-full items-center justify-center">
          {/* <ErrorState
            title="Deals feature coming soon!"
            description="We encountered an issue while fetching the deals. Please try again later."
          /> */}

          <EmptyState
            variant="lottie"
            lottieType="comingSoon"
            size="large"
            title="Deals feature coming soon"
            description="When this is released you would be able to find quick cheap deals weekly."
          />
        </div>

        {/* Mobile view all */}
        {/* <div className="mt-4 flex justify-center sm:hidden">
          <Button variant="link">
            View All Deals
            <Icons.arrowRight size={14} />
          </Button>
        </div> */}
      </div>
    </section>
  );
}
