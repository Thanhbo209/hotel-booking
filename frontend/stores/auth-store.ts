import { UserType } from "@/types/user";
import { create } from "zustand";

type AuthState = {
  user: UserType | null;
  accessToken: string | null;
  setAuth: (user: UserType, token: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  setAuth: (user, token) => set({ user, accessToken: token }),
  clearAuth: () => set({ user: null, accessToken: null }),
}));
