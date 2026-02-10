import { signIn } from "../services/auth.service";
import { LoginFormValues } from "@/features/auth/schemas/auth-schema";

export const useLogin = () => {
  const submit = async (data: LoginFormValues) => {
    await signIn(data);
    // redirect /login hoặc show toast
  };

  return { submit };
};
