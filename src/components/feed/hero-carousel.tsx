"use client";
import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { TypographyP } from "../typography/p";
import { TypographyH2 } from "../typography/h2";
import { Badge } from "../ui/badge";

type HeroContent = {
  badge: string;
  title: string;
  description: string;
  gradient: string;
  imageUrl: string;
};

const HERO_CONTENT: HeroContent[] = [
  {
    badge: "More Tech, Less Spend",
    title: "Discover Amazing Deals on Pre-Owned Tech",
    description:
      "Shop high-quality pre-owned devices at unbeatable prices. Find your perfect match today!",
    gradient: "bg-gradient-to-br from-[#FF5492] via-[#FF8B5A] to-[#FFC918]",
    imageUrl: "/assets/images/Apple-Watch.webp",
  },
  {
    badge: "Your next iPhone is waiting",
    title: "Upgrade Smarter with Swappr",
    description:
      "Explore our curated selection of pre-owned iPhones. Quality you can trust, prices you'll love.",
    gradient: "bg-gradient-to-br from-[#3B82FD] via-[#8B5FD9] to-[#FF5492]",
    imageUrl: "/assets/images/swappr_hero_iphone.webp",
  },

  {
    badge: "Swap it, Don't Stop it",
    title: "Trade In Your Tech for Something New",
    description:
      "Got old gadgets? Swap them for the latest tech. It's sustainable, easy, and rewarding!",
    gradient: "bg-gradient-to-br from-[#FFC918]/30 via-[#7BA5DA] to-[#3B82FD]",
    imageUrl: "/assets/images/swappr_hero_tech.webp",
  },
];

export default function HeroCarousel() {
  return <CarouselContainer />;
}

export const CarouselContainer = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins().autoplay?.play();
  }, [emblaApi]);

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {HERO_CONTENT.map((content, index) => (
            <CarouselSlide key={index} content={content} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const CarouselSlide = ({ content }: { content: HeroContent }) => {
  return (
    <div
      className={`flex min-w-full flex-none flex-col-reverse items-center justify-center gap-4 px-6 py-10 sm:gap-8 sm:px-8 lg:flex-row lg:gap-12 lg:px-16 lg:py-16 ${content.gradient}`}
    >
      {/* Text Section */}
      <div className="flex w-full max-w-xs flex-col items-center text-center sm:max-w-lg lg:w-1/2 lg:max-w-none lg:items-start lg:text-left">
        <Badge variant="secondary" className="mb-3">
          <TypographyP className="tracking-widest uppercase">
            {content.badge}
          </TypographyP>
        </Badge>
        <TypographyH2 className="border-0 pb-0 wrap-break-word">
          {content.title}
        </TypographyH2>
        <TypographyP className="wrap-anywhere">
          {content.description}
        </TypographyP>
      </div>

      {/* Image Section */}
      <div className="w-3/4 max-w-sm shrink-0 sm:w-1/2 sm:max-w-md">
        <Image
          src={content.imageUrl}
          alt={content.title}
          width={600}
          height={600}
          className="h-auto w-full rounded-xl object-contain"
          priority
          quality={90}
        />
      </div>
    </div>
  );
};
