import { ValuationResponse } from "@/types/api";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ResultState {
  result: ValuationResponse | null;
  setResult: (result: ValuationResponse) => void;
  clearResult: () => void;
}

export const useResultStore = create<ResultState>()(
  persist(
    (set) => ({
      result: null,
      setResult: (result) => set({ result }),
      clearResult: () => set({ result: null }),
    }),
    {
      name: "swappr-valuation-result",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
