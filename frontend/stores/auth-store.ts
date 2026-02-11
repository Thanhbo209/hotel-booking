import { UserType } from "@/types/user";
import { create } from "zustand";

type AuthState = {
  user: UserType | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: UserType, token: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  setAuth: (user, token) =>
    set({
      user,
      accessToken: token,
      isAuthenticated: true,
    }),

  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    }),
}));
