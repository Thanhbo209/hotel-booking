// src/stores/auth-store.ts
import { UserType } from "@/types/user";
import { create } from "zustand";

type AuthState = {
  user: UserType | null;
  isAuthenticated: boolean;
  setUser: (user: UserType) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
