"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useQuestionStore } from "@/store/question-store";
import { Progress } from "@/components/ui/progress";

const ProgressBar = React.memo(function ProgressBar() {
  const progress = useQuestionStore((state) => state.progress);
  const prevStep = useQuestionStore((state) => state.prevStep);

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
      <Progress value={progress} className="h-3" />
    </div>
  );
});

export default ProgressBar;
