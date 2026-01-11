"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface PageLoaderProps {
  isLoading: boolean;
  text: string;
}

export default function PageLoader({ isLoading, text }: PageLoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <DotLottieReact
          src="/assets/icons/Dot loader.json"
          autoplay
          loop
          style={{ width: 100, height: 100 }}
        />
        <p className="font-switzer text-sm font-medium text-white sm:text-base">
          {text}
        </p>
      </div>
    </div>
  );
}
