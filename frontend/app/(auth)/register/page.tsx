import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

const RegisterForm = () => {
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

        <div className="flex gap-3 justify-center items-center pt-10">
          <Field>
            <FieldLabel>First Name</FieldLabel>
            <Input placeholder="First Name" />
          </Field>
          <Field>
            <FieldLabel>Last Name</FieldLabel>
            <Input placeholder="Last Name" />
          </Field>
        </div>

        <div className="flex flex-col py-5 gap-5">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input placeholder="Email" />
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input placeholder="••••••••" type="password" />
          </Field>
        </div>

        <Button className="mt-5">Create Account</Button>
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
          className="object-cover mx-auto p-3"
          width={300}
          height={300}
        />
      </div>
    </section>
  );
};

export default RegisterForm;
