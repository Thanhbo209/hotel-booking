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

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Sign up failed");
  }

  return data;
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

export const signOut = async (): Promise<void> => {
  const res = await fetch(`${API_URL}/auth/signOut`, {
    method: "POST",
    credentials: "include", // để gửi refreshToken cookie
  });

  if (!res.ok) {
    let message = "Logout failed";
    try {
      const error = await res.json();
      message = error.message ?? message;
    } catch {}
    throw new Error(message);
  }
};
