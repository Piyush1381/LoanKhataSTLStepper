import { create } from "zustand";

type OnboardingStore = {
  currentStep: number;

  completedSteps: string[];

  data: Record<string, unknown>;

  isSubmitting: boolean;

  error: string | null;

  setCurrentStep: (step: number) => void;

  setStepData: (
    stepId: string,
    data: unknown
  ) => void;

  markCompleted: (stepId: string) => void;

  setSubmitting: (value: boolean) => void;

  setError: (error: string | null) => void;

  reset: () => void;
};

const initialState = {
  currentStep: 0,
  completedSteps: [],
  data: {},
  isSubmitting: false,
  error: null,
};

export const useOnboardingStore =
  create<OnboardingStore>((set) => ({
    ...initialState,

    setCurrentStep: (step) =>
      set({
        currentStep: step,
        error: null,
      }),

    setStepData: (stepId, data) =>
      set((state) => ({
        data: {
          ...state.data,
          [stepId]: data,
        },
      })),

    markCompleted: (stepId) =>
      set((state) => ({
        completedSteps:
          state.completedSteps.includes(stepId)
            ? state.completedSteps
            : [...state.completedSteps, stepId],
      })),

    setSubmitting: (value) =>
      set({
        isSubmitting: value,
      }),

    setError: (error) =>
      set({
        error,
      }),

    reset: () =>
      set({
        ...initialState,
      }),
  }));
