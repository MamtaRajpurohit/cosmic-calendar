import { Navbar } from "../components/Navbar";

import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { WowFactsSection } from "../components/WowFactsSection";
import { SpaceEventsSection } from "../components/SpaceEventsSection";





export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
     
      
     
      <StarBackground />

    
      <Navbar />
     
      <main>
        <HeroSection />
        <WowFactsSection />
        <SpaceEventsSection/>

        
      
      
      </main>

      
      
    </div>
  );
};
