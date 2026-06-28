"use client";

import CollectionCard from "./collection-card";
import { useCollections } from "@/hooks/use-collections";
import { ErrorState } from "../error-state";
import { EmptyState } from "../empty-state";

export default function CollectionCardGrid() {
  const { data, isError, isPending } = useCollections();

  const COLLECTION_CARDS = data?.collections ?? [];

  if (isPending) {
    // with correct prefetch + matching key, this should never visibly show
    return null; // or a skeleton, but shouldn't be hit
  }

  if (isError) {
    return (
      <ErrorState
        title="Could not load collections"
        description="Please check your connection and try again."
      />
    );
  }

  if (COLLECTION_CARDS.length === 0) {
    return (
      <EmptyState
        title="No Collections Found"
        description="Please check your connection and try again."
        variant="lottie"
        lottieType="ghost"
      />
    );
  }

  return (
    <div className="mt-10 grid w-full grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:mt-16">
      {COLLECTION_CARDS.map((card) => (
        <CollectionCard key={card.id} item={card} />
      ))}
    </div>
  );
}
