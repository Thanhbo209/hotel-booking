import { signIn } from "../services/auth.service";
import { useState } from "react";
import { LoginFormValues } from "@/features/auth/schemas/auth-schema";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const submit = async (data: LoginFormValues) => {
    try {
      setError(null);
      await signIn(data);
      // TODO: redirect to dashboard or show success toast
    } catch (err: unknown) {
      // Surface error to the caller/UI
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    }
  };

  return { submit, error };
};
