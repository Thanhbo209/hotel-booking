import { Hero } from "@/features/home/components/hero";

const Home = () => {
  return (
    <main className="flex flex-col p-6 md:p-10 justify-center items-center min-h-[70svh] bg-gradient-orange">
      <Hero />
    </main>
  );
};

export default Home;
