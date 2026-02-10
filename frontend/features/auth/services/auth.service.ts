import { RegisterFormValues } from "@/features/auth/schemas/auth-schema";

export const signUp = async (payload: RegisterFormValues) => {
  const res = await fetch("/api/auth/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
};

export const signIn = async (payload: { email: string; password: string }) => {
  const res = await fetch("/api/auth/signIn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw await res.json();
  }

  return res.json(); // { accessToken }
};
