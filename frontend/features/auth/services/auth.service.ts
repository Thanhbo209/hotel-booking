import {
  LoginFormValues,
  RegisterFormValues,
} from "@/features/auth/schemas/auth-schema";
import { fetcher } from "@/lib/fetcher";

// ========================
// User
// ========================
export const getMe = () => fetcher("/users/me");

// ========================
// Auth
// ========================
export const signUp = (payload: RegisterFormValues) => {
  return fetcher("/auth/signUp", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const signIn = (payload: LoginFormValues) => {
  return fetcher("/auth/signIn", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const signOut = () => {
  return fetcher("/auth/signOut", {
    method: "POST",
  });
};
