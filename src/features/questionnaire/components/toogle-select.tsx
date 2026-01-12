import React from "react";
import { motion } from "motion/react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useQuestionStore } from "@/store/question-store";

type ToggleSelectProps = {
  type: "single" | "multiple";
  labelLengthThreshold: number;
  direction: "forward" | "backward";
};

export default function ToggleSelect({
  type,
  labelLengthThreshold,
  direction,
}: ToggleSelectProps) {
  const {
    currentQuestion,
    setAnswer,
    getAnswersForQuestion,
    clearAnswersForQuestion,
  } = useQuestionStore();

  // Get currently selected answer(s) for this question
  const selectedAnswers = currentQuestion?.id
    ? getAnswersForQuestion(currentQuestion.id)
    : [];

  const selectedValue =
    type === "single" ? selectedAnswers[0] || "" : selectedAnswers;

  const handleValueChange = (value: string | string[]) => {
    if (!currentQuestion?.id) return;

    // Clear previous answers for this question first
    clearAnswersForQuestion(currentQuestion.id);

    // For single selection (string)
    if (typeof value === "string") {
      if (value) {
        setAnswer(currentQuestion.id, value);
      }
    }
    // For multiple selection (array)
    else if (Array.isArray(value)) {
      value.forEach((optionId) => {
        setAnswer(currentQuestion.id, optionId);
      });
    }
  };

  if (type === "single") {
    const singleValue =
      typeof selectedValue === "string"
        ? selectedValue
        : selectedValue[0] || "";

    return (
      <ToggleGroup
        type="single"
        variant="outline"
        size="custom"
        value={singleValue}
        onValueChange={handleValueChange}
        className="grid w-full shrink-0 grid-cols-1 items-center justify-center gap-5 p-2 text-wrap data-[variant=outline]:shadow-none"
      >
        {currentQuestion?.options?.map((option, index) => (
          <motion.div
            key={option.text}
            whileTap={{ scale: 0.9 }}
            initial={{ y: direction === "forward" ? 60 : -60, opacity: 0.5 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 115,
                damping: 10,
                delay: index * 0.12,
              },
            }}
            exit={{
              y: direction === "forward" ? -60 : 60,
              opacity: 0,
              transition: {
                type: "spring",
                stiffness: 115,
                damping: 10,
                delay: index * 0.04,
              },
            }}
            layout
          >
            <ToggleGroupItem
              value={option.id}
              className={`active-state w-full rounded-4xl ${
                option.text.length > labelLengthThreshold ? "sm:col-span-2" : ""
              }`}
            >
              <span className="text-medium font-semibold wrap-break-word">
                {option.text}
              </span>
            </ToggleGroupItem>
          </motion.div>
        ))}
      </ToggleGroup>
    );
  }

  // Multiple type - use the array directly
  const multipleValues = Array.isArray(selectedValue) ? selectedValue : [];

  return (
    <ToggleGroup
      type="multiple"
      variant="outline"
      size="custom"
      value={multipleValues}
      onValueChange={handleValueChange}
      className="grid w-full shrink-0 grid-cols-1 items-center justify-center gap-5 p-2 text-wrap data-[variant=outline]:shadow-none"
    >
      {currentQuestion?.options?.map((option, index) => (
        <motion.div
          key={option.text}
          whileTap={{ scale: 0.9 }}
          initial={{ y: direction === "forward" ? 60 : -60, opacity: 0.5 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 115,
              damping: 10,
              delay: index * 0.12,
            },
          }}
          exit={{
            y: direction === "forward" ? -60 : 60,
            opacity: 0,
            transition: {
              type: "spring",
              stiffness: 115,
              damping: 10,
              delay: index * 0.04,
            },
          }}
          layout
        >
          <ToggleGroupItem
            value={option.id}
            className={`active-state w-full rounded-4xl ${
              option.text.length > labelLengthThreshold ? "sm:col-span-2" : ""
            }`}
          >
            <span className="text-medium font-semibold wrap-break-word">
              {option.text}
            </span>
          </ToggleGroupItem>
        </motion.div>
      ))}
    </ToggleGroup>
  );
}
