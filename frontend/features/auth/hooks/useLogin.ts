import { signIn } from "../services/auth.service";
import { useState } from "react";
import { LoginFormValues } from "@/features/auth/schemas/auth-schema";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setUser);

  const submit = async (data: LoginFormValues) => {
    try {
      setError(null);

      const res = await signIn(data);

      setAuth(res.user);

      router.push("/");
      router.refresh(); // optional (để SSR layout sync)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    }
  };

  return { submit, error };
};
