/**
 * Questionnaire Submission Utilities
 *
 * Handles building the final payload for device valuation submission
 */

import { getQuestionnaireContext } from "./cookies";
import { QuestionAnswer } from "@/store/question-store";
import type { SubmitAnswersDto } from "@/types/api";

export interface ValuationPayload {
  model_id: string;
  variation_id: string;
  answers: Array<{
    question_id: string;
    option_id: string;
  }>;
}

/**
 * Build the complete valuation payload from cookies and store answers
 * @param answers - Array of question answers from Zustand store
 * @returns Complete payload ready for API submission, or null if context is missing
 */
export function buildValuationPayload(
  answers: QuestionAnswer[],
): SubmitAnswersDto | null {
  // Get model and variation from cookies
  const context = getQuestionnaireContext();

  if (!context) {
    console.error("Questionnaire context not found in cookies");
    return null;
  }

  // Transform answers to API format (camelCase with value field)
  const formattedAnswers = answers.map((answer) => ({
    questionId: answer.questionId,
    value: answer.optionId,
  }));

  return {
    modelId: context.modelId,
    variationId: context.variationId,
    answers: formattedAnswers,
  };
}

/**
 * Validate that all required questions have been answered
 * @param answers - Current answers from store
 * @param totalQuestions - Total number of questions
 * @returns true if all questions are answered
 */
export function isQuestionnaireComplete(
  answers: QuestionAnswer[],
  totalQuestions: number,
): boolean {
  return answers.length === totalQuestions;
}

/**
 * Validate payload before submission
 * @param payload - The valuation payload to validate
 * @returns Error message if invalid, null if valid
 */
export function validatePayload(
  payload: SubmitAnswersDto | null,
): string | null {
  if (!payload) {
    return "Missing model or variation information. Please start over.";
  }

  if (!payload.modelId || !payload.variationId) {
    return "Invalid model or variation selection.";
  }

  if (!payload.answers || payload.answers.length === 0) {
    return "Please answer all questions before submitting.";
  }

  // Check for any missing IDs
  const hasInvalidAnswers = payload.answers.some(
    (answer) => !answer.questionId || !answer.value,
  );

  if (hasInvalidAnswers) {
    return "Some answers are incomplete. Please review your selections.";
  }

  return null;
}
