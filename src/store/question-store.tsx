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
  answers: Record<string, string>; // { question_id: option_id }
  currentQuestion: Question | null;
  progress: number;
  direction: "forward" | "backward";

  // Actions
  initializeQuestions: (questions: Question[]) => void;
  setAnswer: (questionId: string, optionId: string) => void;
  clearAnswers: () => void;
  getAnswers: () => QuestionAnswer[];
  hasAnswerForQuestion: (questionId: string) => boolean;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  getCurrentProgress: () => number;
}

export const useQuestionStore = create<FormState>()((set, get) => ({
  questions: [],
  currentStep: 1,
  answers: {},
  currentQuestion: null,
  progress: 0,
  direction: "forward",

  initializeQuestions: (questions: Question[]) => {
    set({
      questions,
      currentStep: 1,
      answers: {}, // Clear answers when initializing new questions
      currentQuestion: questions[0] || null,
      progress:
        questions.length > 0 ? Math.round((1 / questions.length) * 100) : 0,
    });
  },

  setAnswer: (questionId: string, optionId: string) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: optionId,
      },
    }));
  },

  clearAnswers: () => {
    set({ answers: {} });
  },

  getAnswers: () => {
    const { answers } = get();
    return Object.entries(answers).map(([questionId, optionId]) => ({
      questionId,
      optionId,
    }));
  },

  hasAnswerForQuestion: (questionId: string) => {
    const { answers } = get();
    return !!answers[questionId];
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
