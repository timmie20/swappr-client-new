"use client";
import React from "react";
// import { AnimatePresence, motion } from "motion/react";
import { TypographyH1 } from "@/components/h1";
import { useQuestionStore } from "@/store/question-store";
import ToggleSelect from "./toogle-select";
import DamagesSelector from "./damages-selector";
import { TypographyMuted } from "@/components/muted";

export default function QuestionRenderer() {
  const currentQuestion = useQuestionStore((s) => s.currentQuestion);
  const direction = useQuestionStore((s) => s.direction);

  const renderOpions = () => {
    switch (currentQuestion?.type) {
      case "select":
        return (
          <ToggleSelect
            type="multiple"
            labelLengthThreshold={15}
            direction={direction}
            // onAnswer={onAnswer}
          />
        );
      case "radio":
        return (
          <ToggleSelect
            type="single"
            labelLengthThreshold={20}
            direction={direction}
            // onAnswer={onAnswer}
          />
        );
      case "checkbox":
        return <DamagesSelector key={currentQuestion.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-[60dvh] overflow-x-hidden overflow-y-auto">
      {currentQuestion && (
        <div className="mx-auto h-full w-full space-y-6 sm:max-w-[70%]">
          <TypographyH1 className="min-[460px]:mt-6">
            {currentQuestion.text}
          </TypographyH1>

          {currentQuestion.note && (
            <span className="text-center">
              <TypographyMuted text={currentQuestion.note} />
            </span>
          )}

          {renderOpions()}
        </div>
      )}
    </div>
  );
}
