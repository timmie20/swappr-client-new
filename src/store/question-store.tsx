import { Question } from "@/types/api";
import { create } from "zustand";

// Answer structure: stores option_id for each question_id
export interface QuestionAnswer {
  questionId: string;
  optionId: string;
}

interface FormState {
  questions: Question[];
  currentStep: number;
  answers: QuestionAnswer[]; // Array of { questionId, optionId } pairs
  currentQuestion: Question | null;
  progress: number;
  direction: "forward" | "backward";

  // Actions
  initializeQuestions: (questions: Question[]) => void;
  setAnswer: (questionId: string, optionId: string) => void;
  removeAnswer: (questionId: string, optionId: string) => void;
  clearAnswersForQuestion: (questionId: string) => void;
  clearAnswers: () => void;
  getAnswers: () => QuestionAnswer[];
  getAnswersForQuestion: (questionId: string) => string[];
  hasAnswerForQuestion: (questionId: string) => boolean;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  getCurrentProgress: () => number;
}

export const useQuestionStore = create<FormState>()((set, get) => ({
  questions: [],
  currentStep: 1,
  answers: [],
  currentQuestion: null,
  progress: 0,
  direction: "forward",

  initializeQuestions: (questions: Question[]) => {
    set({
      questions,
      currentStep: 1,
      answers: [], // Clear answers when initializing new questions
      currentQuestion: questions[0] || null,
      progress:
        questions.length > 0 ? Math.round((1 / questions.length) * 100) : 0,
    });
  },

  setAnswer: (questionId: string, optionId: string) => {
    set((state) => {
      // Check if this exact answer already exists
      const exists = state.answers.some(
        (a) => a.questionId === questionId && a.optionId === optionId,
      );

      if (exists) return state;

      return {
        answers: [...state.answers, { questionId, optionId }],
      };
    });
  },

  removeAnswer: (questionId: string, optionId: string) => {
    set((state) => ({
      answers: state.answers.filter(
        (a) => !(a.questionId === questionId && a.optionId === optionId),
      ),
    }));
  },

  clearAnswersForQuestion: (questionId: string) => {
    set((state) => ({
      answers: state.answers.filter((a) => a.questionId !== questionId),
    }));
  },

  clearAnswers: () => {
    set({ answers: [] });
  },

  getAnswers: () => {
    return get().answers;
  },

  getAnswersForQuestion: (questionId: string) => {
    const { answers } = get();
    return answers
      .filter((a) => a.questionId === questionId)
      .map((a) => a.optionId);
  },

  hasAnswerForQuestion: (questionId: string) => {
    const { answers } = get();
    return answers.some((a) => a.questionId === questionId);
  },

  nextStep: () => {
    const { currentQuestion, questions, currentStep } = get();
    if (!currentQuestion || currentStep >= questions.length) return;

    const nextQuestion = questions[currentStep];
    if (!nextQuestion) return;

    set((state) => ({
      currentStep: state.currentStep + 1,
      currentQuestion: nextQuestion,
      progress: Math.round(((state.currentStep + 1) / questions.length) * 100),
      direction: "forward",
    }));
  },

  prevStep: () => {
    const { currentStep, questions } = get();
    if (currentStep <= 1) return;

    const prevQuestion = questions[currentStep - 2];
    if (!prevQuestion) return;

    set((state) => ({
      currentStep: state.currentStep - 1,
      currentQuestion: prevQuestion,
      progress: Math.round(((state.currentStep - 1) / questions.length) * 100),
      direction: "backward",
    }));
  },

  resetForm: () => {
    const { questions } = get();
    set({
      currentStep: 1,
      answers: [],
      currentQuestion: questions[0] || null,
      progress: 0,
    });
  },

  getCurrentProgress: () => {
    const { currentStep, questions } = get();
    return questions.length > 0
      ? Math.round((currentStep / questions.length) * 100)
      : 0;
  },
}));
