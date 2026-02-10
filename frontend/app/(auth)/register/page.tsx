"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  firstName: z.string().min(1, "You must type in your first name!"),
  lastName: z.string().min(1, "You must type in your last name!"),
  email: z.email("Email is not valid"),
  password: z.string().min(6, "Password must have at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {};

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 rounded-xl">
      <div className=" flex flex-col p-8 text-center">
        <Image
          src="/logo.png"
          alt="HotelHub logo"
          width={300}
          height={300}
          className="w-25 h-25 object-cover mx-auto"
        />
        <h2>Create Account On HotelHub</h2>
        <span>Welcome, Sign up to get started!</span>

        <form className="p-1 md:p-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-3 justify-center items-center pt-10">
            <Field>
              <FieldLabel>First Name</FieldLabel>
              <Input
                placeholder="First Name"
                type="text"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-start text-destructive text-sm">
                  {errors.firstName?.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel>Last Name</FieldLabel>
              <Input
                placeholder="Last Name"
                type="text"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-start text-destructive text-sm">
                  {errors.lastName?.message}
                </p>
              )}
            </Field>
          </div>

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

          <Button className="mt-5 w-full" type="submit" disabled={isSubmitting}>
            Create Account
          </Button>
        </form>
        <div className="flex justify-center items-center gap-2 py-2">
          <span className="font-thin text-muted-foreground">
            Already have account?{" "}
          </span>
          <Link
            href="/login"
            className="font-semibold hover:text-primary underline"
          >
            Sign In
          </Link>
        </div>
      </div>
      <div className="bg-muted flex justify-center border max-md:hidden border-border items-center">
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

export default RegisterForm;
