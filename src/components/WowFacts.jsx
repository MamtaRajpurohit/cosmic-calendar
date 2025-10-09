import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Calendar, Sparkles, ChevronRight, Stars, Moon, Telescope, Menu, X, ArrowDown } from 'lucide-react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import FlashCard from './FlashCard.jsx'


const WowFacts = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const wowFacts = [
    {
      icon: "🌍",
      title: "Venus Rotation",
      description: "A day on Venus is longer than its year! Venus takes 243 Earth days to rotate once but only 225 Earth days to orbit the Sun."
    },
    {
      icon: "⭐",
      title: "Neutron Stars",
      description: "Neutron stars are so dense that a teaspoon of their material would weigh about 6 billion tons on Earth - more than all of humanity combined!"
    },
    {
      icon: "🏖️",
      title: "Countless Stars",
      description: "There are more stars in the universe than grains of sand on all of Earth's beaches - approximately 10^24 stars exist in the observable universe!"
    },
    {
      icon: "👣",
      title: "Moon Footprints",
      description: "The footprints on the Moon will last for millions of years because there's no wind or water to erase them. They're eternal monuments to human achievement!"
    },
    {
      icon: "🌀",
      title: "Jupiter's Storm",
      description: "Jupiter's Great Red Spot is a storm that has been raging for at least 400 years and is so large that three Earths could fit inside it!"
    },
    {
      icon: "🔇",
      title: "Silent Space",
      description: "Space is completely silent because sound waves need molecules to travel through, and space is essentially a vacuum with very few particles."
    }
  ];

  return (
    <section
      id="facts"
      ref={sectionRef}
      className="py-24 px-6 bg-gradient-to-b from-slate-950 via-indigo-950/30 to-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
            <h2 className="text-6xl font-extralight tracking-tight text-slate-100">
              Space <span className="font-light">WOW</span> Facts
            </h2>
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
          </div>
          <p className="text-slate-400 text-lg font-light tracking-wide">
            Mind-blowing facts that will expand your universe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wowFacts.map((fact, index) => (
            <FlashCard key={index} fact={fact} index={index} />
          ))}
        </div>

        <div
          className={`mt-20 text-center transition-all duration-1000 delay-500 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-gradient-to-br from-indigo-950/40 via-purple-900/30 to-slate-900/40 backdrop-blur-md rounded-3xl p-10 border border-indigo-400/20 inline-block shadow-2xl hover:border-indigo-400/40 transition-all duration-500">
            <Moon className="w-14 h-14 text-amber-300 mx-auto mb-6 animate-pulse" />
            <p className="text-slate-200 text-2xl font-light italic leading-relaxed max-w-2xl">
              "The universe is under no obligation to make sense to you."
            </p>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent mx-auto my-4"></div>
            <p className="text-indigo-300 mt-4 text-sm tracking-widest uppercase font-light">
              Neil deGrasse Tyson
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WowFacts;
