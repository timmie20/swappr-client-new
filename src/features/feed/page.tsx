import { HeroBanner } from "@/components/feed/hero-banner";
import { TrustSignalStrip } from "@/components/feed/trust-signal-strip";
import { CategoryFilterBar } from "@/components/feed/category-filter-bar";
import { DealOfWeekSection } from "@/components/feed/deal-of-week-section";
import { FeedGrid } from "@/components/feed/feed-grid";
import { SwapOfferDrawer } from "@/components/feed/swap-offer-drawer";
import { FeedFooter } from "@/components/feed/feed-footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Hero */}
      {/* <HeroBanner /> */}

      {/* Trust signals */}
      {/* <TrustSignalStrip /> */}

      {/* Deal of the Week */}
      <DealOfWeekSection />

      {/* Sticky category filter pills */}
      <CategoryFilterBar />

      {/* Main product feed */}
      <FeedGrid />

      {/* Swap offer drawer (portal-like) */}
      <SwapOfferDrawer />

      {/* Footer */}
      <FeedFooter />
    </div>
  );
}
