import { signIn } from "../services/auth.service";
import { useState } from "react";
import { LoginFormValues } from "@/features/auth/schemas/auth-schema";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const submit = async (data: LoginFormValues) => {
    try {
      setError(null);
      await signIn(data);
      // TODO: redirect to dashboard or show success toast
      router.push("/");
      router.refresh(); // để SSR layout load user
    } catch (err: unknown) {
      // Surface error to the caller/UI
      const message =
        err instanceof Error ? err.message.toUpperCase() : "Login failed";
      setError(message);
    }
  };

  return { submit, error };
};
