import { Hero } from "@/features/main/components/home/hero";
import { HotelList } from "@/features/main/components/home/hotel-list";

const Home = () => {
  return (
    <main className="flex flex-col p-6 md:p-10 justify-center items-center min-h-[70svh] bg-gradient-orange">
      <Hero />
      <HotelList />
    </main>
  );
};

export default Home;
