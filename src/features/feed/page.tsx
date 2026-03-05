import { HeroBanner } from "@/components/feed/hero-banner";
import { TrustSignalStrip } from "@/components/feed/trust-signal-strip";
import { CategoryFilterBar } from "@/components/feed/category-filter-bar";
import { DealOfWeekSection } from "@/components/feed/deal-of-week-section";
import { FeedGrid } from "@/components/feed/feed-grid";
import { SwapOfferDrawer } from "@/components/feed/swap-offer-drawer";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* <HeroBanner /> */}
      {/* <TrustSignalStrip /> */}
      <DealOfWeekSection />
      <CategoryFilterBar />
      <FeedGrid />
      <SwapOfferDrawer />
    </div>
  );
}
