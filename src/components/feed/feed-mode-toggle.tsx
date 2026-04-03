"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/icons";
import { useFeedStore } from "@/store/feed-store";
import { ProductMode } from "@/types/product";

const MODES = [
  { label: "Buy Now", value: ProductMode.SALE as const, icon: Icons.cartCopy },
  {
    label: "Swap",
    value: ProductMode.SALE_SWAP as const,
    icon: Icons.exchange,
  },
  { label: "All", value: "all" as const, icon: Icons.flame },
];

export function FeedModeToggle() {
  const feedMode = useFeedStore((s) => s.feedMode);
  const setFeedMode = useFeedStore((s) => s.setFeedMode);

  return (
    <Tabs
      value={feedMode}
      onValueChange={(v) => setFeedMode(v as typeof feedMode)}
    >
      <TabsList>
        {MODES.map(({ label, value, icon: Icon }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="data-active:bg-primary data-active:hover:bg-primary/90 hover:bg-primary/10 cursor-pointer gap-1.5 transition-colors data-active:text-white data-active:hover:text-white"
          >
            <Icon size={14} />
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
