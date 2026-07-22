import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  // Path (+ query string) of the page that triggered the modal, so OAuth
  // can send the user back to where they were instead of the homepage.
  redirectTo: string | null;
  open: (redirectTo?: string) => void;
  close: () => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
  isOpen: false,
  redirectTo: null,
  open: (redirectTo) => set({ isOpen: true, redirectTo: redirectTo ?? null }),
  close: () => set({ isOpen: false, redirectTo: null }),
}));
