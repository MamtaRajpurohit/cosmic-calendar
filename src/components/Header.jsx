import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Calendar, Sparkles, ChevronRight, Stars, Moon, Telescope, Menu, X, ArrowDown } from 'lucide-react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-cyan-500/20">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <Rocket className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-wider">THE SPACE STORY</h1>
          </div>

          
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('events')}
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
            >
              Space Events
            </button>
            <button
              onClick={() => scrollToSection('facts')}
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
            >
              WOW Facts
            </button>
            <button
              onClick={() => scrollToSection('facts')}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              Explore Facts
            </button>
          </div>

          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <button
              onClick={() => scrollToSection('hero')}
              className="block w-full text-left text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('events')}
              className="block w-full text-left text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
            >
              Space Events
            </button>
            <button
              onClick={() => scrollToSection('facts')}
              className="block w-full text-left text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
            >
              WOW Facts
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
