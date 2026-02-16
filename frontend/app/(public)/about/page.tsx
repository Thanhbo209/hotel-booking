import AboutHero from "@/features/main/components/about/about-hero";
import OurStory from "@/features/main/components/about/our-story";
import OurValues from "@/features/main/components/about/our-values";
import Statistics from "@/features/main/components/about/statistic";

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
