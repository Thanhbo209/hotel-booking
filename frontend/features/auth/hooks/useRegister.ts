import { signUp } from "../services/auth.service";
import { RegisterFormValues } from "@/features/auth/schemas/auth-schema";

export const useRegister = () => {
  const submit = async (data: RegisterFormValues) => {
    await signUp(data);
    // redirect /login hoặc show toast
  };

  return { submit };
};
