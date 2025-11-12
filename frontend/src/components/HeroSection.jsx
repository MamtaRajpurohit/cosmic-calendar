import React from "react";
import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="container max-w-4xl mx-auto text-center z-10 relative">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            <span className="opacity-0 animate-fade-in">Explore the</span>
            <span className="text-blue-400 opacity-0 animate-fade-in-delay-1">
              {" "}
              Universe
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 ml-2 opacity-0 animate-fade-in-delay-2">
              {" "}
              & Beyond
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            Discover amazing facts about space, planets, stars, and the cosmos.
            Journey through the wonders of the universe with our interactive space facts.
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#wow-facts" className="cosmic-button">
              Discover Wow Facts
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
        <span className="text-sm text-gray-400 mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-blue-400" />
      </div>
    </section>
  );
};