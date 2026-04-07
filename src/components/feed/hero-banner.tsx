"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { IconArrowRight, IconSparkles } from "@tabler/icons-react";
import { Button } from "../ui/button";

export function HeroBanner() {
  return (
    <div className="font-inter relative overflow-hidden bg-linear-to-br from-[#FF5492] via-[#9B6BC9] to-[#3B82FD]">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/2" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:gap-12 lg:text-left">
          {/* Text block */}
          <div className="flex-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
            >
              <IconSparkles size={13} />
              Nigeria&apos;s #1 Swap Marketplace
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-inter text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl"
            >
              Buy, Sell & <span className="text-[#FFC918]">Swap</span> Premium
              Devices
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 max-w-lg text-base text-white/75 lg:text-lg"
            >
              Every device inspected, verified & priced in NGN. Trade your old
              gadget, Cop new ones.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <Link href="#feed" className="inline-flex h-11">
                <Button size="lg" className="cursor-pointer">
                  Shop Now
                  <IconArrowRight size={16} />
                </Button>
              </Link>
              <Link href="#feed" className="inline-flex h-11">
                <Button
                  variant="outline"
                  size="lg"
                  className="cursor-pointer text-white hover:text-white"
                >
                  ↔ Swap a Device
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start"
            >
              {[
                { value: "12,500+", label: "Devices Listed" },
                { value: "98%", label: "Satisfaction Rate" },
                { value: "₦0", label: "Swap Fees" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero image area — stacked device mockups */}
        </div>
      </div>
    </div>
  );
}

{
  /* <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex shrink-0 items-center justify-center"
          >
            <div className="relative grid w-64 grid-cols-2 gap-3 sm:w-72 lg:w-80">
              {[
                {
                  img: "https://images.unsplash.com/photo-1632516723866-a3ef4ae9823c?w=200&h=200&fit=crop&q=80",
                  label: "iPhone 13",
                  price: "₦380,700",
                },
                {
                  img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop&q=80",
                  label: "MacBook Pro",
                  price: "₦1,350,000",
                },
                {
                  img: "https://images.unsplash.com/photo-1610945415114-a0c758a4ab96?w=200&h=200&fit=crop&q=80",
                  label: "Galaxy S24 Ultra",
                  price: "₦675,000",
                },
                {
                  img: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=200&h=200&fit=crop&q=80",
                  label: "Apple Watch Ultra",
                  price: "₦520,000",
                },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm ${i === 0 ? "col-span-2" : ""}`}
                >
                  eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.img}
                    alt={item.label}
                    className={`w-full object-cover ${i === 0 ? "h-28" : "h-20"}`}
                  />
                  <div className="p-2">
                    <p className="truncate text-xs font-semibold text-white">
                      {item.label}
                    </p>
                    <p className="text-xs font-bold text-[#F4762A]">
                      {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div> */
}
