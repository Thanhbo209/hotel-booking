import { useState } from "react";
import { signUp } from "../services/auth.service";
import { RegisterFormValues } from "@/features/auth/schemas/auth-schema";

export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const submit = async (data: RegisterFormValues) => {
    try {
      await signUp(data);
    } catch (err: unknown) {
      setError((err as { message?: string })?.message ?? "Registration failed");
    }
  };

  return { submit, error };
};
