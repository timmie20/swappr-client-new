"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPhoto,
} from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  const total = images.length;

  const goTo = (idx: number) => {
    setDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
  };

  const prev = () => goTo(activeIdx === 0 ? total - 1 : activeIdx - 1);
  const next = () => goTo(activeIdx === total - 1 ? 0 : activeIdx + 1);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#F8F9FA]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeIdx}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {imgError[activeIdx] ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#9CA3AF]">
                <IconPhoto size={48} strokeWidth={1.2} />
                <span className="text-sm">Image unavailable</span>
              </div>
            ) : (
              <Image
                src={images[activeIdx]}
                alt={`${productName} — view ${activeIdx + 1}`}
                fill
                className="object-contain"
                onError={() =>
                  setImgError((p) => ({ ...p, [activeIdx]: true }))
                }
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Image counter */}
        {total > 1 && (
          <span className="absolute right-3 bottom-3 rounded-full bg-black/50 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
            {activeIdx + 1} / {total}
          </span>
        )}

        {/* Nav arrows */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute top-1/2 left-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow backdrop-blur-sm transition hover:bg-white"
            >
              <IconChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow backdrop-blur-sm transition hover:bg-white"
            >
              <IconChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative size-20 shrink-0 overflow-hidden rounded-xl border-2 bg-[#F8F9FA] transition-all",
                i === activeIdx
                  ? "border-primary shadow-sm"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              {!imgError[i] && (
                <Image
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  onError={() => setImgError((p) => ({ ...p, [i]: true }))}
                  sizes="80px"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
