import { TrustSignalStrip } from "@/components/feed/trust-signal-strip";
// import { DealOfWeekSection } from "@/components/feed/deal-of-week-section"; // not implemented yet
import { SwapOfferDrawer } from "@/components/feed/swap-offer-drawer";
import HeroCarousel from "@/components/feed/hero-carousel";
import { CollectionsSection } from "@/components/feed/collections-section";
import { MarketplaceListingsSection } from "@/components/feed/marketplace-listings-section";

export default function Page() {
  return (
    <div className="min-h-screen">
      <HeroCarousel />
      <TrustSignalStrip />
      <CollectionsSection />
      {/* <DealOfWeekSection /> */}
      <MarketplaceListingsSection />
      <SwapOfferDrawer />
    </div>
  );
}
