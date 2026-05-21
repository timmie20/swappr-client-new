import React from "react";
import CollectionCard from "./collection-card";
import { COLLECTION_CARDS } from "@/constants/ui";

export default function CollectionCardGrid() {
  return (
    <div className="mt-10 grid w-full grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:mt-16">
      {COLLECTION_CARDS.map((card) => (
        <CollectionCard key={card.id} item={card} />
      ))}
    </div>
  );
}
