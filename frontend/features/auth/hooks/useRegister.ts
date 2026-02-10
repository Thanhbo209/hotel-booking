import { useState } from "react";
import { signUp } from "../services/auth.service";
import { RegisterFormValues } from "@/features/auth/schemas/auth-schema";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const submit = async (data: RegisterFormValues) => {
    try {
      setError(null);
      setSuccess(null);
      const res = await signUp(data);
      setSuccess(res.message || "Account created successfully");
      router.push("/login");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Register failed";
      setError(message);
    }
  };

  return { submit, error, success };
};
