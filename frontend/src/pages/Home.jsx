import { Navbar } from "../components/Navbar";
import React from "react";
import { StarBackground } from "../components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { WowFactsSection } from "../components/WowFactsSection";
import { SpaceEventsSection } from "../components/SpaceEventsSection";





const Home = () => {
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


export default Home;
