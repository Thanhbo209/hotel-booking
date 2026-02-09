import RegisterForm from "@/app/(auth)/register/page";
const layout = () => {
  return (
    <div className="flex flex-col p-6 md:p-10 justify-center items-center min-h-svh">
      <div className="w-full max-w-sm md:max-w-4xl ">
        <RegisterForm />
      </div>
    </div>
  );
};

export default layout;
