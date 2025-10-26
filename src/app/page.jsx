import { Header } from "../components/Header/Header";
import { HeroSection } from "../components/HeroSection/HeroSection";
import { FeatureSection } from "../components/FeatureSection/FeatureSection";
import { Footer } from "../components/Footer/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      <Header />
      <HeroSection />
      <FeatureSection />
      <Footer />
    </div>
  );
}
