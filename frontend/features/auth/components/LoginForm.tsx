"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/features/auth/hooks/useLogin";
import {
  LoginFormValues,
  loginSchema,
} from "@/features/auth/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

export const LoginForm = () => {
  const { submit } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 rounded-xl">
      <form className="p-1 md:p-2" onSubmit={handleSubmit(submit)}>
        <div className=" flex flex-col p-8 text-center">
          <Image
            src="/logo.png"
            alt="HotelHub logo"
            width={300}
            height={300}
            className="w-25 h-25 object-cover mx-auto"
          />
          <h2>Welcome back to HotelHub</h2>
          <span>Log in your account to get started!</span>

          <div className="flex flex-col py-5 gap-5">
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input placeholder="Email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-start text-destructive text-sm">
                  {errors.email?.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
                placeholder="••••••••"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-start text-destructive text-sm">
                  {errors.password?.message}
                </p>
              )}
            </Field>
          </div>

          <Button className="mt-5" disabled={isSubmitting}>
            Log In
          </Button>
          <div className="flex justify-center items-center gap-2 py-2">
            <span className="font-thin text-muted-foreground">
              Doesn&apos;t have an account?{" "}
            </span>
            <Link
              href="/register"
              className="font-semibold hover:text-primary underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </form>
      <div className="bg-muted flex justify-center max-md:hidden border border-border items-center">
        <Image
          src="/hotel-3d.png"
          alt=""
          className="object-cover"
          width={300}
          height={300}
        />
      </div>
    </section>
  );
};
