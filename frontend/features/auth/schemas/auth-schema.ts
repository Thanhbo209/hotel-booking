import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1, "You must type in your first name!"),
  lastName: z.string().min(1, "You must type in your last name!"),
  email: z.string().email("Email is not valid"),
  password: z.string().min(6, "Password must have at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.email("Email is not valid"),
  password: z.string().min(6, "Password is not valid"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
