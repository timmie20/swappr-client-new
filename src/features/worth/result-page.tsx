"use client";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/typography/h1";
import { IconShare } from "@tabler/icons-react";
import DetailsDrawer from "./component/details-drawer";
import { formatNaira } from "@/lib/format";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { useResultStore } from "@/store/result-store";
import { useEffect, useRef, useState } from "react";
// import { ComingSoonDialog } from "@/components/coming-soon-dialog";
import { SafeImage } from "./component/safe-image";
import { isAuthenticated } from "@/lib/auth-tokens";
import { getPendingValuationRef } from "@/lib/pending-valuation";
import { SaveValuationDialog } from "./component/save-valuation-dialog";
import { cn } from "@/lib/utils";

export default function ResultPage() {
  const result = useResultStore((s) => s.result);
  const audioRef = useRef<HTMLAudioElement>(null);
  // const [showComingSoon, setShowComingSoon] = useState(false);
  const [showSaveNudge] = useState(
    () => !isAuthenticated() && !!getPendingValuationRef(),
  );
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

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

      <div className="relative mx-auto mt-6 flex max-w-163.75 flex-col items-center space-y-5 pb-32 md:space-y-12">
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
          />{" "}
        </div>

        {result && <DetailsDrawer result={result} />}
      </div>

      {/* <div className="border-border bg-background/80 fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur-sm"> */}
      <div className="mx-auto max-w-163.75 px-3 pt-4 pb-6">
        <div
          className={cn(
            "flex w-full items-center gap-5 sm:w-[80%]",
            !showSaveNudge && "justify-end",
          )}
        >
          {showSaveNudge && (
            <Button
              size="lg"
              className="w-full flex-1 animate-pulse cursor-pointer"
              onClick={() => setSaveDialogOpen(true)}
            >
              Click me
            </Button>
          )}
          <Button size="icon-lg" variant="outline">
            <IconShare size={24} />
          </Button>
        </div>
      </div>
      {/* </div> */}

      {showSaveNudge && (
        <>
          <SaveValuationDialog
            open={saveDialogOpen}
            onOpenChange={setSaveDialogOpen}
          />
        </>
      )}
      {/* 
      <ComingSoonDialog
        open={showComingSoon}
        onOpenChange={setShowComingSoon}
      /> */}
    </>
  );
}
