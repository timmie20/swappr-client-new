"use client";
import { Lottie } from "./lottie";
import isometricLoaderAnimation from "@/lottie/Isometric Loader.json";

interface PageLoaderProps {
  isLoading?: boolean;
  text?: string;
}

export default function PageLoader({ text }: PageLoaderProps) {
  // if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <Lottie
          animationData={isometricLoaderAnimation}
          loop
          autoPlay
          className="size-20"
        />
        <p className="text-muted-foreground text-sm sm:text-base">{text}</p>
      </div>
    </div>
  );
}
