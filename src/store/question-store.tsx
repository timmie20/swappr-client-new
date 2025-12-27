import { create } from "zustand";
import { Question } from "@/lib/api/types";
import { UserAnswer } from "@/types/api";

interface FormState {
  questions: Question[];
  currentStep: number;
  answers: Record<string, UserAnswer>;
  currentQuestion: Question | null;
  progress: number;
  direction: "forward" | "backward";

  // Actions
  initializeQuestions: (questions: Question[]) => void;
  setAnswer: (questionId: string, value: string | string[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  getCurrentProgress: () => number;
}

export const useQuestionStore = create<FormState>((set, get) => ({
  questions: [],
  currentStep: 1,
  answers: {},
  currentQuestion: null,
  progress: 0,
  direction: "forward",

  initializeQuestions: (questions: Question[]) => {
    set({
      questions,
      currentQuestion: questions[0] || null,
      progress:
        questions.length > 0 ? Math.round((1 / questions.length) * 100) : 0,
    });
  },

  setAnswer: (questionId: string, value: string | string[]) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: {
          questionId,
          value,
        },
      },
    }));
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
      answers: {},
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
