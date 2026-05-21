"use client";
import { TypographyH1 } from "@/components/typography/h1";
import { useQuestionStore } from "@/store/question-store";
import ToggleSelect from "./toogle-select";
import DamagesSelector from "./damages-selector";
import { TypographyMuted } from "@/components/typography/muted";
import { Icons } from "@/components/icons";
import { Question } from "@/lib/api/types";

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
        return (
          <div className="flex w-full flex-col sm:flex-col-reverse">
            <SkipToSubmitButton currentQuestion={currentQuestion} />
            <DamagesSelector />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="no-scrollbar h-[60dvh] overflow-x-hidden overflow-y-auto">
      {currentQuestion && (
        <div className="mx-auto h-full w-full space-y-6 sm:max-w-[70%]">
          <TypographyH1 className="min-[460px]:mt-6">
            {currentQuestion.text}
          </TypographyH1>

          {currentQuestion.note && (
            <span className="text-center">
              <TypographyMuted>{currentQuestion.note}</TypographyMuted>
            </span>
          )}

          {renderOpions()}
        </div>
      )}
    </div>
  );
}

const SkipToSubmitButton = ({
  currentQuestion,
}: {
  currentQuestion: Question;
}) => {
  const setSkipped = useQuestionStore((s) => s.setQuestionSkipped);
  const hasAnswer = useQuestionStore((s) =>
    s.hasAnswerForQuestion(currentQuestion.id),
  );

  return (
    <div className="mt-5 flex w-full items-center justify-center sm:mt-8">
      <button
        onClick={() => setSkipped(true)}
        className="text-accent-foreground text-small hover:text-muted-foreground disabled:text-muted-foreground inline-flex cursor-pointer items-center gap-0.5 text-base underline disabled:cursor-not-allowed disabled:hover:no-underline sm:text-base"
        disabled={hasAnswer}
      >
        Skip to submit
        <Icons.arrowRight size={15} />
      </button>
    </div>
  );
};
