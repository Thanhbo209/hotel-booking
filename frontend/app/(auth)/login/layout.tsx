export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col p-6 md:p-10 justify-center items-center min-h-svh bg-gradient-orange">
      <div className="w-full max-w-sm md:max-w-4xl bg-gradient-orange">
        {children}
      </div>
    </div>
  );
}
