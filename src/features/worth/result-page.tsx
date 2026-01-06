"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/h1";
import { IconShare } from "@tabler/icons-react";
import DetailsDrawer from "./component/details-drawer";
import { formatNaira } from "@/lib/format";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export default function ResultPage() {
  return (
    <>
      <Fireworks autorun={{ speed: 3, duration: 4000 }} />
      <div className="mx-auto mt-6 flex h-dvh max-w-163.75 flex-col items-center space-y-5 md:space-y-12">
        <div className="space-y-2 text-center">
          <p className="text-small text-slate-400 sm:text-lg">
            Based on your selections and answers
          </p>

          <TypographyH1 className="font-switzer">
            <span className="block text-[#08161F47]/75">
              Your iPhone 16 estimated worth is
            </span>
            <span className="from-app-primary to-app-secondary bg-linear-to-r bg-clip-text text-transparent">
              {formatNaira(999999)}
            </span>
          </TypographyH1>
        </div>

        <div className="bg-gray-light flex w-full items-center justify-center rounded-4xl py-10 sm:max-w-125 sm:shrink-0">
          <Image
            src="/assets/images/iphone16.png"
            alt="image"
            width={230}
            height={281}
            className="h-auto w-auto"
          />
        </div>

        <DetailsDrawer />

        <div className="flex w-full items-center justify-center gap-5 px-3 sm:w-[80%]">
          <Button
            size="lg"
            className="flex-1 cursor-pointer rounded-full sm:flex-3"
          >
            Swap Phone
          </Button>
          <Button size="lg" className="flex-1">
            Share
            <IconShare size={18} />
          </Button>
        </div>
      </div>
    </>
  );
}
