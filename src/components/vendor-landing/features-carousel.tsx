"use client";

import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FeaturesCarouselProps {
  className?: string;
}

interface CarouselSlide {
  id: string;
  title: string;
  description: string;
  badge: string;
  image: string;
}

const slides: CarouselSlide[] = [
  {
    id: "product-management",
    title: "Inventory Management",
    description:
      "Easily add, edit, and manage all your product listings from one clean dashboard. Bulk uploads, pricing controls, and inventory tracking — all in one place.",
    badge: "Products",
    image:
      "https://res.cloudinary.com/doi4zvlbi/image/upload/v1785496508/Screenshot_2026-07-31_at_11.51.44_jpsnev.webp",
  },
  {
    id: "order-tracking",
    title: "Orders Dashboard",
    description:
      "Monitor every order from placement to delivery. Get instant notifications on new orders, payment confirmations, and buyer messages.",
    badge: "Orders",
    image:
      "https://res.cloudinary.com/doi4zvlbi/image/upload/v1785496509/Screenshot_2026-07-31_at_11.51.59_bvh6pn.webp",
  },
  {
    id: "analytics",
    title: "Real-Time Overview",
    description:
      "Understand your store's performance with intuitive charts. Track revenue, best-selling products, and buyer trends at a glance.",
    badge: "Analytics",
    image:
      "https://res.cloudinary.com/doi4zvlbi/image/upload/v1785496508/Screenshot_2026-07-31_at_11.50.39_ar5ids.webp",
  },
  {
    id: "account-management",
    title: "Account Management",
    description:
      "Manage your business profile, payout details, and verification status. Keep your store information accurate and up to date at all times.",
    badge: "Account",
    image:
      "https://res.cloudinary.com/doi4zvlbi/image/upload/v1785496508/Screenshot_2026-07-31_at_11.52.58_fzqu4l.webp",
  },
];

export function FeaturesCarousel({ className }: FeaturesCarouselProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number, dir: 1 | -1 = 1) => {
    setDirection(dir);
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, startTimer]);

  function handlePrev() {
    goTo(current - 1, -1);
  }

  function handleNext() {
    goTo(current + 1, 1);
  }

  const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const EASE_IN: [number, number, number, number] = [0.36, 0, 0.66, 0];

  const slideVariants = {
    enter: (d: number) => ({
      opacity: 0,
      x: d > 0 ? 60 : -60,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: EASE_OUT },
    },
    exit: (d: number) => ({
      opacity: 0,
      x: d > 0 ? -60 : 60,
      transition: { duration: 0.35, ease: EASE_IN },
    }),
  };

  const slide = slides[current];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="features-heading"
      className={cn(
        "bg-tertiary overflow-hidden px-6 py-20 text-white lg:px-8 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="mb-14 text-center"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-blue-400">
            Vendor Tools
          </span>
          <h2
            id="features-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            What You Get as a Vendor
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60">
            Your vendor dashboard gives you everything you need to manage your
            store and grow your sales effortlessly.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            {/* Screenshot */}
            <div className="relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={slide.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                >
                  <Image
                    src={slide.image}
                    alt={`${slide.title} screenshot`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top"
                    priority={current === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide content */}
            <div className="flex flex-col gap-6">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={slide.id + "-text"}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-4"
                >
                  <span className="inline-w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-blue-400">
                    {slide.badge}
                  </span>
                  <h3 className="text-2xl font-bold lg:text-3xl">
                    {slide.title}
                  </h3>
                  <p className="text-base leading-relaxed text-white/60">
                    {slide.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  aria-label="Previous feature"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Dots */}
                <div
                  className="flex items-center gap-2"
                  role="tablist"
                  aria-label="Carousel slides"
                >
                  {slides.map((s, i) => (
                    <button
                      key={s.id}
                      role="tab"
                      aria-selected={i === current}
                      aria-label={`Go to slide ${i + 1}: ${s.title}`}
                      onClick={() => goTo(i, i > current ? 1 : -1)}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none",
                        i === current
                          ? "bg-app-primary w-6"
                          : "w-2 bg-white/25 hover:bg-white/40",
                      )}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  aria-label="Next feature"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
