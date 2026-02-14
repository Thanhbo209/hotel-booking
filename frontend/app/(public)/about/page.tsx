import AboutHero from "@/features/home/components/about/about-hero";
import OurStory from "@/features/home/components/about/our-story";
import OurValues from "@/features/home/components/about/our-values";
import Statistics from "@/features/home/components/about/statistic";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <OurStory />
      <Statistics />
      <OurValues />
    </main>
  );
}
