"use client";

import React, { useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
} from "motion/react";
import useMeasure from "react-use-measure";
import Selector from "./selector";
import { useQuestionStore } from "@/store/question-store";

export default function DamagesSelector() {
  const currentQuestion = useQuestionStore((s) => s.currentQuestion);
  const setAnswer = useQuestionStore((s) => s.setAnswer);
  const removeAnswer = useQuestionStore((s) => s.removeAnswer);
  const getAnswersForQuestion = useQuestionStore(
    (s) => s.getAnswersForQuestion,
  );

  // Initialize from saved answers (runs once per question due to key prop)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => {
    if (!currentQuestion?.id) return new Set<string>();
    const savedAnswers = getAnswersForQuestion(currentQuestion.id);
    return new Set(savedAnswers);
  });

  const toggleOption = (optionId: string) => {
    if (!currentQuestion?.id) return;

    if (selectedIds.has(optionId)) {
      // Remove selection
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(optionId);
        return newSet;
      });
      removeAnswer(currentQuestion.id, optionId);
    } else {
      // Add selection
      setSelectedIds((prev) => new Set(prev).add(optionId));
      setAnswer(currentQuestion.id, optionId);
    }
  };

  const [ref, { height }] = useMeasure();

  return (
    <div className="w-full">
      <MotionConfig
        transition={{
          duration: 0.7,
          type: "spring",
        }}
      >
        <motion.div
          initial={{ height: "auto" }}
          animate={{ height: height > 0 ? height : undefined }}
        >
          <motion.ul
            ref={ref}
            className="mt-4 flex w-full flex-wrap items-center justify-center gap-3 px-2"
          >
            <LayoutGroup>
              <AnimatePresence initial={false} mode="popLayout">
                {currentQuestion?.options?.map((option) => (
                  <Selector
                    key={option.id}
                    component={option.text}
                    isSelected={selectedIds.has(option.id)}
                    onToggle={() => toggleOption(option.id)}
                  />
                ))}
              </AnimatePresence>
            </LayoutGroup>
          </motion.ul>
        </motion.div>
      </MotionConfig>
    </div>
  );
}
