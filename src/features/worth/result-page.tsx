"use client";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/h1";
import { IconShare, IconHome } from "@tabler/icons-react";
import DetailsDrawer from "./component/details-drawer";
import { formatNaira } from "@/lib/format";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { useResultStore } from "@/store/result-store";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ComingSoonDialog } from "@/components/coming-soon-dialog";
import { SafeImage } from "./component/safe-image";

export default function ResultPage() {
  const result = useResultStore((s) => s.result);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play();
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/assets/audio/fireworks-02-419019.mp3" />
      <Fireworks autorun={{ speed: 3, duration: 4500 }} />

      <div className="relative mx-auto mt-6 flex h-full max-w-163.75 flex-col items-center space-y-5 md:space-y-12">
        <Link
          href="/check-worth"
          className="absolute top-0 left-0 z-50 cursor-pointer"
        >
          <Button
            variant="outline"
            size="icon-lg"
            className="rounded-full shadow-lg transition-transform hover:scale-110"
          >
            <IconHome size={26} />
          </Button>
        </Link>

        <div className="space-y-2 text-center">
          <p className="text-small text-slate-400 sm:text-lg">
            Based on your selections and answers
          </p>

          <TypographyH1 className="font-switzer">
            <span className="block text-[#08161F47]/75">
              Your {result?.device.brand} {result?.device.model} estimated worth
              is
            </span>
            <span className="from-app-primary to-app-secondary bg-linear-to-r bg-clip-text text-transparent">
              {formatNaira(result?.final_value)}
            </span>
          </TypographyH1>
        </div>

        <div className="bg-gray-light flex w-full items-center justify-center rounded-4xl py-10 sm:max-w-125 sm:shrink-0">
          <SafeImage
            src={result?.device.image_url ?? ""}
            alt={`image of ${result?.device.model}`}
            width={230}
            height={281}
            className="h-auto w-auto max-w-full object-contain"
            preload
          />{" "}
        </div>

        {result && <DetailsDrawer result={result} />}

        <div className="flex w-full items-center justify-center gap-5 px-3 sm:w-[80%]">
          <Button
            size="lg"
            className="flex-1 cursor-pointer rounded-full sm:flex-3"
            onClick={() => setShowComingSoon(true)}
          >
            Swap Phone
          </Button>
          <Button size="lg" className="flex-1">
            Share
            <IconShare size={18} />
          </Button>
        </div>
      </div>

      <ComingSoonDialog
        open={showComingSoon}
        onOpenChange={setShowComingSoon}
      />
    </>
  );
}
