import CollectionCardGrid from "@/components/collection/collection-card-grid";
import { CategoryFilterBar } from "@/components/feed/category-filter-bar";
import { FeedGrid } from "@/components/feed/feed-grid";
import { TypographyH1 } from "@/components/typography/h1";
import { TypographyH2 } from "@/components/typography/h2";
import { TypographyP } from "@/components/typography/p";

export default function CollectionPage() {
  return (
    <section className="mx-auto w-full max-w-screen-2xl py-6">
      <TypographyH1 className="mt-12">Explore All Collections</TypographyH1>

      <TypographyP className="text-center">
        Browse all devices, accessories and exclusive bundles expertly tested
        and ready for you.
      </TypographyP>

      <CollectionCardGrid />

      <TypographyH2 className="mt-14 mb-6 border-b-0 text-center text-balance">
        Some tech you can take a look at real quick
      </TypographyH2>

      <CategoryFilterBar />

      <FeedGrid limit={10} canLoadMore />
    </section>
  );
}
