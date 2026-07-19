"use client";

import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";

import { useCollections } from "@/hooks/use-collections";
import { Collection } from "@/types/collections";
import { TypographyMuted } from "../typography/muted";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

// Alternating card surfaces — quiet neutrals with a faint primary tint
const CARD_SURFACES = ["bg-[#F4F5F7]", "bg-[#EFF4FC]"];

export function CollectionsSection() {
  const { data, isPending, isError } = useCollections();
  const collections = data?.collections ?? [];

  if (isError || (!isPending && collections.length === 0)) return null;

  return (
    <section className="overflow-x-clip bg-white py-12 lg:py-16">
      {/* Section header */}
      <div className="mx-auto mb-8 max-w-screen-2xl px-4 text-center lg:mb-10 lg:px-6">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase">
          <span className="from-app-primary bg-linear-to-r to-[#F4762A] bg-clip-text text-transparent">
            Curated by Swappr
          </span>
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Explore our Collections
        </h2>
        <TypographyMuted className="mx-auto mt-3 max-w-xl text-balance sm:text-base">
          Hand-picked devices and bundles, expertly tested and grouped so you
          can find what fits faster.
        </TypographyMuted>
        <Link
          href="/collections"
          className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-semibold hover:underline"
        >
          View all collections
          <IconArrowRight size={14} />
        </Link>
      </div>

      {/* Carousel — left edge aligns with the page container, right edge bleeds
          to the viewport so partially visible cards invite scrolling */}
      <div className="no-scrollbar flex snap-x snap-mandatory scroll-ps-4 gap-4 overflow-x-auto scroll-smooth ps-4 pe-4 pb-2 lg:scroll-ps-[max(--spacing(6),calc((100vw-var(--breakpoint-2xl))/2+--spacing(6)))] lg:gap-5 lg:ps-[max(--spacing(6),calc((100vw-var(--breakpoint-2xl))/2+--spacing(6)))]">
        {isPending
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-[380px] w-[270px] flex-none rounded-3xl sm:w-[300px] lg:h-[480px] lg:w-[410px]"
              />
            ))
          : collections.map((collection, i) => (
              <CollectionSlide
                key={collection.id}
                item={collection}
                surface={CARD_SURFACES[i % CARD_SURFACES.length]}
              />
            ))}
      </div>
    </section>
  );
}

function CollectionSlide({
  item,
  surface,
}: {
  item: Collection;
  surface: string;
}) {
  return (
    <Link
      href={`/collections/${item.slug}`}
      className={`group relative flex h-[380px] w-[270px] flex-none snap-start flex-col overflow-hidden rounded-3xl border border-black/5 p-6 transition-shadow duration-300 hover:shadow-lg sm:w-[300px] lg:h-[480px] lg:w-[410px] lg:p-8 ${surface}`}
    >
      <Badge className="w-fit font-normal text-white uppercase">
        {item.badge}
      </Badge>

      <h3 className="mt-3 text-xl font-semibold tracking-tight text-balance lg:text-2xl">
        {item.name}
      </h3>

      <p className="text-muted-foreground mt-1.5 line-clamp-2 text-sm lg:text-base">
        {item.description}
      </p>

      <span className="text-primary mt-3 inline-flex items-center gap-1 text-sm font-medium">
        Shop collection
        <IconArrowRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>

      <div className="relative -mx-2 mt-auto -mb-6 h-40 lg:-mb-8 lg:h-60">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 410px, 300px"
          className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
    </Link>
  );
}
