import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Calendar, Sparkles, ChevronRight, Stars, Moon, Telescope, Menu, X, ArrowDown } from 'lucide-react';
import * as THREE from 'three';
import { gsap } from 'gsap';


const FlashCard = ({ fact, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power2.out'
      });
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="perspective-1000 h-64 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/40 flex flex-col items-center justify-center text-center">
          <div className="text-6xl mb-4">{fact.icon}</div>
          <h3 className="text-xl font-bold text-white mb-2">{fact.title}</h3>
          <p className="text-sm text-gray-400">Click to reveal</p>
        </div>

        
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/40 flex items-center justify-center">
          <p className="text-white text-center leading-relaxed">{fact.description}</p>
        </div>
      </div>
    </div>
  );
};


const WowFacts = () => {
  const sectionRef = useRef(null);

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

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }
  }, []);

  return (
    <section id="facts" ref={sectionRef} className="py-20 px-6 bg-gradient-to-b from-transparent to-purple-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-purple-400" />
            <h2 className="text-5xl font-bold text-white">Space WOW Facts</h2>
          </div>
          <p className="text-gray-400 text-lg">Mind-blowing facts that will expand your universe</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wowFacts.map((fact, index) => (
            <FlashCard key={index} fact={fact} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30 inline-block">
            <Moon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <p className="text-white text-xl italic">"The universe is under no obligation to make sense to you."</p>
            <p className="text-gray-400 mt-2">- Neil deGrasse Tyson</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FlashCard;