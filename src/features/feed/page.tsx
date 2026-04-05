import { TrustSignalStrip } from "@/components/feed/trust-signal-strip";
import { CategoryFilterBar } from "@/components/feed/category-filter-bar";
import { DealOfWeekSection } from "@/components/feed/deal-of-week-section";
import { FeedGrid } from "@/components/feed/feed-grid";
import { SwapOfferDrawer } from "@/components/feed/swap-offer-drawer";
import HeroCarousel from "@/components/feed/hero-carousel";

export default function Page() {
  return (
    <div className="min-h-dvh bg-[#F8F9FA]">
      <HeroCarousel />
      <TrustSignalStrip />
      <DealOfWeekSection />
      <CategoryFilterBar />
      <FeedGrid />
      <SwapOfferDrawer />
    </div>
  );
}
