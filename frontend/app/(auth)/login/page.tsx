import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

const RegisterForm = () => {
  return (
    <section className="grid grid-cols-2 rounded-xl">
      <div className=" flex flex-col p-8 text-center">
        <img
          src="https://crystalpng.com/wp-content/uploads/2025/01/pc-pearl-continental-logo.png"
          alt=""
          className="w-25 h-25 object-cover mx-auto"
        />
        <h2>Welcome back to HotelHub</h2>
        <span>Log in your account to get started!</span>

        <div className="flex flex-col py-5 gap-5">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input placeholder="Email" />
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input placeholder="••••••••" />
          </Field>
        </div>

        <Button className="mt-5">Log In</Button>
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
      <div className="bg-muted flex justify-center border border-border items-center">
        <Image
          src="/hotel-3d.png"
          alt=""
          className="object-cover mx-auto p-3"
          width={300}
          height={300}
        />
      </div>
    </section>
  );
};

export default RegisterForm;
