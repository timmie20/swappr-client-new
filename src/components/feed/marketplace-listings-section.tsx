import { CategoryFilterBar } from "./category-filter-bar";
import { FeedGrid } from "./feed-grid";
import { TypographyMuted } from "../typography/muted";

export function MarketplaceListingsSection() {
  return (
    <section className="bg-[#F8F9FA] pt-12 lg:pt-16">
      <div className="mx-auto mb-6 max-w-screen-2xl px-4 pt-6 text-center lg:px-6">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase">
          <span className="from-app-primary bg-linear-to-r to-[#F4762A] bg-clip-text text-transparent">
            Fresh on the marketplace
          </span>
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Explore our Top Tech
        </h2>
        <TypographyMuted className="mx-auto mt-3 max-w-xl text-balance sm:text-base">
          Browse verified listings from trusted vendors across the country pick
          a category to jump straight to what you need.
        </TypographyMuted>
      </div>

      <CategoryFilterBar />
      <FeedGrid limit={8} canLoadMore={false} navigateTo="/products" />
    </section>
  );
}
