"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useQuestionStore } from "@/store/question-store";
import { Progress } from "@/components/ui/progress";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Lottie } from "@/components/lottie";
import chequeredFlag from "@/lottie/chequered-flag.json";

const ProgressBar = React.memo(function ProgressBar() {
  const progress = useQuestionStore((state) => state.progress);
  const prevStep = useQuestionStore((state) => state.prevStep);
  const questions = useQuestionStore((state) => state.questions);

  // Calculate the position for second to last question
  // If there are N questions, second to last is at (N-1)/N * 100%
  const flagPosition =
    questions.length > 1
      ? ((questions.length - 1) / questions.length) * 100
      : 100;

  return (
    <div className="flex items-center gap-5">
      <Button
        variant="outline"
        size="icon-lg"
        onClick={prevStep}
        className="cursor-pointer"
      >
        <Image
          src="/assets/icons/arrow-left.svg"
          alt="arrow left icon"
          width={13}
          height={22}
          className="size-auto"
          priority
        />
      </Button>
      <div className="relative flex-1">
        <Progress value={progress} className="h-3" />
        <div
          className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${flagPosition}%` }}
        >
          <Lottie
            animationData={chequeredFlag}
            loop
            autoPlay
            className="size-10"
          />
        </div>
      </div>
    </div>
  );
});

export default ProgressBar;
