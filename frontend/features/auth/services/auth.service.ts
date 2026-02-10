import {
  LoginFormValues,
  RegisterFormValues,
} from "@/features/auth/schemas/auth-schema";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!API_URL) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL is not configured");
}

export const signUp = async (payload: RegisterFormValues) => {
  const res = await fetch(`${API_URL}/auth/signUp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
};

export const signIn = async (payload: LoginFormValues) => {
  const res = await fetch(`${API_URL}/auth/signIn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
};
