import { Atmosphere } from "@/components/Atmosphere";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Hero } from "@/components/Hero";
import { PlatformsSection } from "@/components/PlatformsSection";
import { PrivacySection } from "@/components/PrivacySection";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <Atmosphere />
      <SiteHeader />
      <main className="relative z-10 flex flex-1 flex-col pt-16 sm:pt-[4.75rem]">
        <Hero />
        <FeaturesSection />
        <PlatformsSection />
        <PrivacySection />
      </main>
    </>
  );
}
