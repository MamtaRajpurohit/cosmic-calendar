import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Space Events', id: 'events' },
    { label: 'WOW Facts', id: 'facts' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-slate-950/95 backdrop-blur-xl border-b border-indigo-500/30 shadow-lg shadow-indigo-500/10' 
          : 'bg-slate-950/60 backdrop-blur-md border-b border-indigo-500/10'
      } ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection('hero')}
          >
            <div className="relative">
              <Rocket className="w-8 h-8 text-indigo-400 transition-all duration-500 group-hover:text-cyan-400 group-hover:rotate-45" />
              <div className="absolute inset-0 blur-xl bg-indigo-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <h1 className="text-2xl font-extralight tracking-[0.2em] text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">
              THE <span className="font-light">SPACE</span> STORY
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-slate-300 hover:text-cyan-400 transition-all duration-300 font-light tracking-wide group"
                style={{
                  animation: isVisible ? `fadeInDown 0.6s ease-out ${index * 0.1 + 0.3}s both` : 'none'
                }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
            <button
              onClick={() => scrollToSection('facts')}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 text-slate-100 font-light tracking-wide rounded-full hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
              style={{
                animation: isVisible ? 'fadeInDown 0.6s ease-out 0.6s both' : 'none'
              }}
            >
              Explore Facts
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-300 hover:text-cyan-400 transition-colors duration-300 p-2"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
            ) : (
              <Menu className="w-6 h-6 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-1 pb-4 border-t border-indigo-500/20 pt-4">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-indigo-500/10 rounded-lg transition-all duration-300 font-light tracking-wide"
                style={{
                  animation: isMenuOpen ? `fadeInLeft 0.4s ease-out ${index * 0.1}s both` : 'none'
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('facts')}
              className="w-full mt-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-slate-100 font-light tracking-wide rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300"
              style={{
                animation: isMenuOpen ? 'fadeInLeft 0.4s ease-out 0.3s both' : 'none'
              }}
            >
              Explore Facts
            </button>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;